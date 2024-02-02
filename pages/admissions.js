import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdmissionFaq from "../components/admissionFaq";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(
      `${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`
    );
    const res1 = await fetch(`${siteUrl}/api/admission-pages?populate=*`);
    const res2 = await fetch(`${siteUrl}/api/school-total-classes?populate=*`);
    const res3 = await fetch(
      `${siteUrl}/api/admission-pages?fields[0]=procedure_content&populate[procedure_content][populate]=*`
    );

    const data = await res.json();
    const data1 = await res1.json();
    const data2 = await res2.json();
    const data3 = await res3.json();

    return {
      props: {
        seodata: data,
        admissionsData: data1,
        t_class: data2?.data,
        tab_content: data3?.data,
        siteUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        data: [],
      },
    };
  }
};

const Admissions = ({
  seodata,
  admissionsData,
  t_class,
  tab_content,
  siteUrl,
}) => {
  const router = useRouter();
  console.log(
    "main data ===>",
    admissionsData.data[0].attributes.box_content_apply === null
  );
  const [routeActive, setRouteActive] = useState("Procedure");
  const [admissions, setAdmissions] = useState(null);
  const [seoData, setSeoData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    // fetch(`${siteUrl}/api/admission-pages?populate=*`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setAdmissions(data.data[0].attributes);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    if (
      (admissionsData, admissionsData?.data && admissionsData?.data?.length > 0)
    ) {
      setAdmissions(admissionsData.data[0].attributes);
      console.log(admissionsData);
    }
  }, []);

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('API response data:', data); // Log the API response data
    //         if (data && data.data && data.data.length > 0) {
    //             const seoAttributes = data.data[12].attributes;
    //             setSeoData({
    //                 title: seoAttributes.title || '',
    //                 metaTitle: seoAttributes.metaTitle || '',
    //                 metaDescription: seoAttributes.metaDescription || '',
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching SEO data:', error);
    //     });
    if (seodata && seodata?.data && seodata?.data?.length > 0) {
      const seoAttributes = seodata.data[12].attributes;
      setSeoData({
        title: seoAttributes.title || "",
        metaTitle: seoAttributes.metaTitle || "",
        metaDescription: seoAttributes.metaDescription || "",
      });
    }
  }, []);

  useEffect(() => {
    if (router.asPath === "/admissions#admission_faq") {
      setRouteActive("faqs");
    } else {
      setRouteActive("Procedure");
    }
  }, []);

  const page_title = `${admissions?.page_title}`;
  const subheading_admission = `${admissions?.subheading_admission}`;
  const para_1 = `${admissions?.para_1}`;
  const apply_button = `${admissions?.apply_button}`;
  const admission_procedure = `${admissions?.admission_procedure}`;
  const image_1 = `${siteUrl}${admissions?.image_1?.data?.attributes?.url}`;
  const class_pre_primary = `${admissions?.class_pre_primary}`;
  const class_pre_primary2 = `${admissions?.class_pre_primary2}`;
  const class_pre_primary3 = `${admissions?.class_pre_primary3}`;
  const class1 = `${admissions?.class1}`;

  const box_content_apply = admissions?.box_content_apply;
  const apply_button_box = `${admissions?.apply_button_box}`;
  const apply_button_link = `${admissions?.apply_button_link}`;
  const procedure_tab = `${admissions?.procedure_tab}`;
  const faqs_tab = `${admissions?.faqs_tab}`;
  const faq_heading = `${admissions?.faq_heading}`;
  const document_eq_heading = `${admissions?.document_eq_heading}`;
  const point_1 = `${admissions?.point_1}`;
  const point_2 = `${admissions?.point_2}`;
  const point_3 = `${admissions?.point_3}`;
  const point_4 = `${admissions?.point_4}`;
  const point_5 = `${admissions?.point_5}`;
  const age_criteria_heading = `${admissions?.age_criteria_heading}`;
  const class_key_head = `${admissions?.class_key_head}`;
  const age_criteria_key_head = `${admissions?.age_criteria_key_head}`;
  const age_criteria_pp2 = `${admissions?.age_criteria_pp2}`;
  const age_criteria_pp3 = `${admissions?.age_criteria_pp3}`;
  const age_criteria1 = `${admissions?.age_criteria1}`;

  console.log("age_criteria_pp2", age_criteria_pp2);
  console.log("age_criteria_pp3", age_criteria_pp3);

  const key1 = `${admissions?.key1}`;
  const key2 = `${admissions?.key2}`;
  const key3 = `${admissions?.key3}`;
  const key4 = `${admissions?.key4}`;
  const value1 = `${admissions?.value1}`;
  const value2 = `${admissions?.value2}`;
  const value3 = `${admissions?.value3}`;
  const value4 = `${admissions?.value4}`;

  const [selectedOption, setSelectedOption] = useState(
    t_class[0]?.attributes?.name ?? "Junior KG"
  );

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderContent = () => {
    if (selectedOption === "class1") {
      return (
        <section>
          <div className="wrap-mid-admission">
            <ReactMarkdown>
              <div className="left-item-admission">
                <h6> {document_eq_heading}</h6>
                <p> {point_1}</p>
                <p> {point_2}</p>
                <p> {point_3}</p>
                <p> {point_4}</p>
                <p> {point_5}</p>
              </div>
            </ReactMarkdown>
            <div className="right-item-admission">
              <h6>{age_criteria_heading}</h6>
              <div className="wrapper-table-admission">
                <table className="wrap-table-admission">
                  <thead>
                    <tr>
                      <th className="table-header">{class_key_head}</th>
                      <th className="table-header">{age_criteria_key_head}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{key1}</td>
                      <td>{value1}</td>
                    </tr>
                    <tr>
                      <td>{key2}</td>
                      <td>{value2}</td>
                    </tr>
                    <tr>
                      <td>{key3}</td>
                      <td>{value3}</td>
                    </tr>
                    <tr>
                      <td>{key4}</td>
                      <td>{value4}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      );
    } else if (selectedOption === "class2") {
      return (
        <section>
          <div className="wrap-mid-admission">
            <ReactMarkdown>
              <div className="left-item-admission">
                <h6> {document_eq_heading}</h6>
                <p> {point_1}</p>
                <p> {point_2}</p>
                <p> {point_3}</p>
                <p> {point_4}</p>
                <p> {point_5}</p>
              </div>
            </ReactMarkdown>
            <div className="right-item-admission">
              <h6>{age_criteria_pp2}</h6>
              <div className="wrapper-table-admission">
                <table className="wrap-table-admission">
                  <thead>
                    <th className="table-header">{class_key_head}</th>
                    <th className="table-header">{age_criteria_key_head}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{key1}</td>
                      <td>{value1}</td>
                    </tr>
                    <tr>
                      <td>{key2}</td>
                      <td>{value2}</td>
                    </tr>
                    <tr>
                      <td>{key3}</td>
                      <td>{value3}</td>
                    </tr>
                    <tr>
                      <td>{key4}</td>
                      <td>{value4}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      );
    } else if (selectedOption === "class3") {
      return (
        <section>
          <div className="wrap-mid-admission">
            <ReactMarkdown>
              <div className="left-item-admission">
                <h6> {document_eq_heading}</h6>
                <p> {point_1}</p>
                <p> {point_2}</p>
                <p> {point_3}</p>
                <p> {point_4}</p>
                <p> {point_5}</p>
              </div>
            </ReactMarkdown>
            <div className="right-item-admission">
              <h6>{age_criteria_pp3}</h6>
              <div className="wrapper-table-admission">
                <table className="wrap-table-admission">
                  <thead>
                    <th className="table-header">{class_key_head}</th>
                    <th className="table-header">{age_criteria_key_head}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{key1}</td>
                      <td>{value1}</td>
                    </tr>
                    <tr>
                      <td>{key2}</td>
                      <td>{value2}</td>
                    </tr>
                    <tr>
                      <td>{key3}</td>
                      <td>{value3}</td>
                    </tr>
                    <tr>
                      <td>{key4}</td>
                      <td>{value4}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      );
    } else if (selectedOption === "class4") {
      return (
        <section>
          <div className="wrap-mid-admission">
            <ReactMarkdown>
              <div className="left-item-admission">
                <h6> {document_eq_heading}</h6>
                <p> {point_1}</p>
                <p> {point_2}</p>
                <p> {point_3}</p>
                <p> {point_4}</p>
                <p> {point_5}</p>
              </div>
            </ReactMarkdown>
            <div className="right-item-admission">
              <h6>{age_criteria1}</h6>
              <div className="wrapper-table-admission">
                <table className="wrap-table-admission">
                  <thead>
                    <th className="table-header">{class_key_head}</th>
                    <th className="table-header">{age_criteria_key_head}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{key1}</td>
                      <td>{value1}</td>
                    </tr>
                    <tr>
                      <td>{key2}</td>
                      <td>{value2}</td>
                    </tr>
                    <tr>
                      <td>{key3}</td>
                      <td>{value3}</td>
                    </tr>
                    <tr>
                      <td>{key4}</td>
                      <td>{value4}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  const Render = ({ selectedOption }) => {
    let arr = tab_content[0]?.attributes?.procedure_content.filter((t) => {
      if (t?.school_total_class?.data?.attributes?.name === selectedOption) {
        return t;
      }
    });

    return (
      arr?.length > 0 &&
      arr.map((cont) => {
        return (
          <section>
            <div className="wrap-mid-admission">
              <div
                className="left-item-admission"
                dangerouslySetInnerHTML={{ __html: cont?.procedure }}
              ></div>
              <div
                className="right-item-admission"
                dangerouslySetInnerHTML={{ __html: cont?.content }}
              ></div>
            </div>
          </section>
        );
      })
    );
  };
  // console.log("Addmission DS>>>>",typeof admissions.box_content_apply)
  return (
    <>
      {console.log("main", routeActive)}
      <Fragment>
        <Head>
          <title>{seoData.title}</title>
          {seoData.metaTitle && (
            <meta name="title" content={seoData.metaTitle} />
          )}
          {seoData.metaTitle && (
            <meta name="description" content={seoData.metaDescription} />
          )}
        </Head>
        <NavBar siteUrl={siteUrl} />

        {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}
        <div className="top-section1-new">
          <div className="container">
            <h1 className="principal-mess">{page_title}</h1>
          </div>
          <section>
            <div className="container marginTopHeader">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h4 className="title">{subheading_admission}</h4>

                  <p>
                    {para_1}
                    {/* <span
                                        dangerouslySetInnerHTML={{ __html: para_1.replace(/\n/g) }}>
                                            </span> */}
                  </p>

                  <div>
                    <button
                      className="footerbtn wrap-btn"
                      onClick={() =>
                        window.open(`${apply_button_link}`, "_blank")
                      }
                    >
                      {apply_button}
                    </button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img
                    src={image_1}
                    alt="Admissions"
                    className="image-curriculum"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container wrapper-mid-admission">
              <div className="wrap-tag-admission">
                <div id="admission_procedure">
                  <h5>{admission_procedure}</h5>
                </div>
                <div className="wrap-dropdown-admission">
                  <select
                    className="dropadmission"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    {t_class?.length > 0 &&
                      t_class?.map((c) => {
                        return (
                          <option key={c?.id} value={c?.attributes?.name}>
                            {c?.attributes?.name}
                          </option>
                        );
                      })}
                    {/* <option value="class1">{class_pre_primary}</option>
                                        <option value="class2">{class_pre_primary2}</option>
                                        <option value="class3">{class_pre_primary3}</option>
                                        <option value="class4">{class1}</option> */}
                  </select>
                </div>
              </div>

              <Tabs
                activeKey={routeActive}
                id="controlled-tab-example"
                className="mb-3"
                onSelect={(k) => setRouteActive(k)}
              >
                <Tab eventKey="Procedure" title={procedure_tab}>
                  {/* {renderContent()} */}
                  <Render selectedOption={selectedOption} />

                  <div className="container wrap-sec-admission">
                    <div>
                      <h6 className="width-content">
                        {box_content_apply === null
                          ? " "
                          : box_content_apply}
                      </h6>
                    </div>
                    <div className="wrapbtn-admission">
                      <button
                        className="footerbtn wrap-btn"
                        onClick={() =>
                          window.open(`${apply_button_link}`, "_blank")
                        }
                      >
                        {apply_button_box}
                      </button>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="faqs" title={faqs_tab}>
                  <h4 className="title">{faq_heading}</h4>
                  <AdmissionFaq siteUrl={siteUrl} />
                  {/* <section className="container wrap-accord-faq-admission">
                                        <div className="row g-4 ">

                                            <div className='col-lg-6'>
                                                <div className="row g-4 accordion" id="accordionExample1">
                                                    <div className=" col-lg-12 accordion-item">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                                aria-expanded="true" aria-controls="collapseOne">
                                                                {question_1}
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" className="accordion-collapse collapse show"
                                                            aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {answer_1}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 accordion-item">
                                                        <h2 className="accordion-header" id="headingTwo">
                                                            <button className="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                                aria-expanded="false" aria-controls="collapseTwo">
                                                                {question_2}
                                                            </button>
                                                        </h2>
                                                        <div id="collapseTwo" className="accordion-collapse collapse"
                                                            aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {answer_2}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 accordion-item">
                                                        <h2 className="accordion-header" id="headingThree">
                                                            <button className="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                                aria-expanded="false" aria-controls="collapseThree">
                                                                {question_3}
                                                            </button>
                                                        </h2>
                                                        <div id="collapseThree" className="accordion-collapse collapse"
                                                            aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {answer_3}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 accordion-item">
                                                        <h2 className="accordion-header" id="headingFour">
                                                            <button className="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                                                aria-expanded="false" aria-controls="collapseFour">
                                                                {question_4}
                                                            </button>
                                                        </h2>
                                                        <div id="collapseFour" className="accordion-collapse collapse"
                                                            aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {answer_4}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-lg-6'>
                                                <div className="row g-4 accordion" id="accordionExample2">
                                                    <div className="col-lg-12 accordion-item">
                                                        <h2 className="accordion-header" id="headingFive">
                                                            <button className="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseFive"
                                                                aria-expanded="false" aria-controls="collapseFive">
                                                                {question_5}
                                                            </button>
                                                        </h2>
                                                        <div id="collapseFive" className="accordion-collapse collapse"
                                                            aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {answer_5}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 accordion-item">
                                                        <h2 className="accordion-header" id="headingSix">
                                                            <button className="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseSix"
                                                                aria-expanded="false" aria-controls="collapseSix">
                                                                {question_6}
                                                            </button>
                                                        </h2>
                                                        <div id="collapseSix" className="accordion-collapse collapse"
                                                            aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {answer_6}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 accordion-item">
                                                        <h2 className="accordion-header" id="headingSeven">
                                                            <button className="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#collapseSeven"
                                                                aria-expanded="false" aria-controls="collapseSeven">
                                                                {question_7}
                                                            </button>
                                                        </h2>
                                                        <div id="collapseSeven" className="accordion-collapse collapse"
                                                            aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                {answer_7}

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </section> */}
                </Tab>
              </Tabs>
            </div>
            <div id="admission_faq"></div>
          </section>
        </div>
        <Footer siteUrl={siteUrl} />
      </Fragment>
    </>
  );
};
export default Admissions;
