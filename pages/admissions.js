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
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
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
        seodata: data?.data?.attributes?.Pages ?? {},
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
  const [routeActive, setRouteActive] = useState("Procedure");
  const [admissions, setAdmissions] = useState(null);


  useEffect(() => {

    if (
      (admissionsData, admissionsData?.data && admissionsData?.data?.length > 0)
    ) {
      setAdmissions(admissionsData.data[0].attributes);
      console.log(admissionsData);
    }
  }, []);



  useEffect(() => {
    if (router.asPath === "/admissions#admission_faq") {
      setRouteActive("faqs");
    } else {
      setRouteActive("Procedure");
    }
  }, []);



  const [sortedClasses, setSortedClasses] = useState([]);

  useEffect(() => {
    if (t_class) {
      const sortedData = [...t_class].sort((a, b) => {
        if (a?.attributes?.Order && !b?.attributes?.Order) return -1;
        if (!a?.attributes?.Order && b?.attributes?.Order) return 1;
        return (a?.attributes?.Order || 0) - (b?.attributes?.Order || 0);
      });
      setSortedClasses(sortedData);
    }
  }, [t_class]);

  const page_title = `${admissions?.page_title}`;
  const subheading_admission = `${admissions?.subheading_admission}`;
  const para_1 = `${admissions?.para_1}`;
  const apply_button = `${admissions?.apply_button}`;
  const admission_procedure = `${admissions?.admission_procedure}`;
  const image_1 = `${siteUrl}${admissions?.image_1?.data?.attributes?.url}`;
  // const class_pre_primary = `${admissions?.class_pre_primary}`;
  // const class_pre_primary2 = `${admissions?.class_pre_primary2}`;
  // const class_pre_primary3 = `${admissions?.class_pre_primary3}`;
  // const class1 = `${admissions?.class1}`;

  const box_content_apply = admissions?.box_content_apply;
  const apply_button_box = `${admissions?.apply_button_box}`;
  const apply_button_link = `${admissions?.apply_button_link}`;
  // const procedure_tab = `${admissions?.procedure_tab}`;
  // const faqs_tab = `${admissions?.faqs_tab}`;
  // const faq_heading = `${admissions?.faq_heading}`;
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
    t_class?.length > 0 ? t_class[0]?.attributes?.name : "Junior KG"
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

    let arr = tab_content?.length > 0 ? tab_content[0]?.attributes?.procedure_content?.filter(pc => {
      if (Array.isArray(pc?.school_total_class?.data)) {
        return pc?.school_total_class?.data?.map(d => d?.attributes?.name).includes(selectedOption)
      } else {
        return pc?.school_total_class?.data?.attributes?.name === selectedOption
      }
    }) : []
    // let arr = tab_content?.length > 0 ? tab_content[0]?.attributes?.procedure_content?.filter(pc => pc?.school_total_class?.data?.attributes?.name === selectedOption) : [];


    // let arr = [];
    // console.log("Selected Option",selectedOption);
    // console.log("Addmission DS>>>>",tab_content)

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

  return (
    <>
      {console.log("main", routeActive)}
      <Seo SeoData={seodata} PageSlug={"admissions"} />

      <Fragment>

        <NavBar siteUrl={siteUrl} />
        <div className="top-section1-new">
          <div className="container">
            <h1 className="principal-mess">{page_title}</h1>
          </div>
          <section>
            <div className="container marginTopHeader">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h2 className="title">{subheading_admission}</h2>

                  <div dangerouslySetInnerHTML={{ __html: para_1 }} />

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
                  <h2>{admission_procedure}</h2>
                </div>
                <div className="wrap-dropdown-admission">
                  <select className="dropadmission" onChange={handleChange}>
                    {sortedClasses.map((c) => (
                      <option key={c?.id} value={c?.attributes?.name}>
                        {c?.attributes?.name} {/* Only display the name */}
                      </option>
                    ))}
                  </select>
                  {/* <select className="dropadmission" value={selectedOption} onChange={handleChange}>
                    {sortedClasses.map((c) => (
                      <option key={c?.id} value={c?.attributes?.name}>
                        {c?.attributes?.Order ? `${c?.attributes?.Order}. ` : ""}
                        {c?.attributes?.name}
                      </option>
                    ))}
                  </select> */}
                </div>
              </div>
              <Tabs
                activeKey={routeActive}
                id="controlled-tab-example"
                className="mb-3"
                onSelect={(k) => setRouteActive(k)}
              >
                <Tab eventKey="Procedure" title="Procedure">
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
                <Tab eventKey="faqs" title="FAQs">
                  <h4 className="title">FAQs</h4>
                  <AdmissionFaq siteUrl={siteUrl} />
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
