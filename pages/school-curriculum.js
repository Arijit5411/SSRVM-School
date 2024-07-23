import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";


import Head from "next/head";
// import Seo from './Seo';

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(
      `${siteUrl}/api/school-curriculum-pages?populate[syllabus_pdf][populate]=*&populate[image_1]=*&populate[image_2]=*`
    );

    const data = await res.json();
    const data1 = await res1.json();

    return {
      props: {
        seodata: data?.data?.attributes?.Pages ?? {},
        schoolCurr: data1,
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

const SchoolCurriculum = ({ seodata, schoolCurr, siteUrl }) => {
  const [schoolCurriculum, setSchoolCurriculum] = useState(null);
  const [syllabus, setSyllabus] = useState([]);


  useEffect(() => {
    // fetch(`${siteUrl}/api/school-curriculum-pages?populate=*`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setSchoolCurriculum(data.data[0].attributes);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    if (schoolCurr && schoolCurr?.data && schoolCurr?.data?.length > 0) {
      setSchoolCurriculum(schoolCurr?.data[0]?.attributes);
      setSyllabus(schoolCurr?.data[0]?.attributes?.syllabus_pdf);
    }
  }, []);



  const pageTitle = `${schoolCurriculum?.page_title}`;
  const heading_1 = `${schoolCurriculum?.heading_1}`;
  const heading_2 = `${schoolCurriculum?.heading_2}`;
  const paragraph_1 = `${schoolCurriculum?.paragraph_1}`;
  const paragraph_2 = `${schoolCurriculum?.paragraph_2}`;

  const imgUrl1 = `${siteUrl}${schoolCurriculum?.image_1?.data?.attributes?.url}`;
  const imgUrl2 = `${siteUrl}${schoolCurriculum?.image_2?.data?.attributes?.url}`;

  const syllabusHeading = `${schoolCurriculum?.syllabus_heading}`;

  const class_12 = `${schoolCurriculum?.class_12}`;
  const class_11 = `${schoolCurriculum?.class_11}`;
  const class_10 = `${schoolCurriculum?.class_10}`;
  const class_9 = `${schoolCurriculum?.class_9}`;
  const class_8 = `${schoolCurriculum?.class_8}`;
  const class_7 = `${schoolCurriculum?.class_7}`;
  const class_6 = `${schoolCurriculum?.class_6}`;
  const class_5 = `${schoolCurriculum?.class_5}`;
  const class_4 = `${schoolCurriculum?.class_4}`;
  const class_3 = `${schoolCurriculum?.class_3}`;
  const class_2 = `${schoolCurriculum?.class_2}`;
  const class_1 = `${schoolCurriculum?.class_1}`;
  const class_senior_kg = `${schoolCurriculum?.class_senior_kg}`;
  const class_junior_kg = `${schoolCurriculum?.class_junior_kg}`;

  const download_pdf_XII = `${schoolCurriculum?.download_pdf_XII?.data?.attributes?.url}`;
  const download_pdf_XI = `${schoolCurriculum?.download_pdf_XI?.data?.attributes?.url}`;
  const download_pdf_X = `${schoolCurriculum?.download_pdf_X?.data?.attributes?.url}`;
  const download_pdf_9 = `${schoolCurriculum?.download_pdf_9?.data?.attributes?.url}`;
  const download_pdf_8 = `${schoolCurriculum?.download_pdf_8?.data?.attributes?.url}`;
  const download_pdf_7 = `${schoolCurriculum?.download_pdf_7?.data?.attributes?.url}`;
  const download_pdf_6 = `${schoolCurriculum?.download_pdf_6?.data?.attributes?.url}`;
  const download_pdf_5 = `${schoolCurriculum?.download_pdf_5?.data?.attributes?.url}`;
  const download_pdf_4 = `${schoolCurriculum?.download_pdf_4?.data?.attributes?.url}`;
  const download_pdf_3 = `${schoolCurriculum?.download_pdf_3?.data?.attributes?.url}`;
  const download_pdf_2 = `${schoolCurriculum?.download_pdf_2?.data?.attributes?.url}`;
  const download_pdf_1 = `${schoolCurriculum?.download_pdf_1?.data?.attributes?.url}`;
  const download_pdf_senior_kg = `${schoolCurriculum?.download_pdf_senior_kg?.data?.attributes?.url}`;
  const download_pdf_junior_kg = `${schoolCurriculum?.download_pdf_junior_kg?.data?.attributes?.url}`;

  let c12 = class_12 && download_pdf_XII !== "undefined";
  let c11 = class_11 && download_pdf_XI !== "undefined";
  let c10 = class_10 && download_pdf_X !== "undefined";
  let c9 = class_9 && download_pdf_9 !== "undefined";
  let c8 = class_8 && download_pdf_8 !== "undefined";
  let c7 = class_7 && download_pdf_7 !== "undefined";
  let c6 = class_6 && download_pdf_6 !== "undefined";
  let c5 = class_5 && download_pdf_5 !== "undefined";
  let c4 = class_4 && download_pdf_4 !== "undefined";
  let c3 = class_3 && download_pdf_3 !== "undefined";
  let c2 = class_2 && download_pdf_2 !== "undefined";
  let c1 = class_1 && download_pdf_1 !== "undefined";
  let cSenior = class_senior_kg && download_pdf_senior_kg !== "undefined";
  let cJunior = class_junior_kg && download_pdf_junior_kg !== "undefined";

  console.log(class_12, download_pdf_XII);
  console.log(class_11, download_pdf_XI);
  console.log(class_10, download_pdf_X);
  console.log(class_9, download_pdf_9);
  console.log(class_8, download_pdf_8);
  console.log(class_7, download_pdf_7);
  console.log(class_6, download_pdf_6);
  console.log(class_5, download_pdf_5);
  console.log(class_4, download_pdf_4);
  console.log(class_3, download_pdf_3);
  console.log(class_2, download_pdf_2);
  console.log(class_1, download_pdf_1);
  console.log(class_1, download_pdf_1);
  console.log(class_senior_kg, download_pdf_senior_kg);
  console.log(class_junior_kg, download_pdf_junior_kg);
  // console.log(c12, c11, c10, c9, c8, c7, c6, c5, c4, c3, c2, c1, cSenior, cJunior);

  return (
    <>
      <Seo SeoData={seodata} PageSlug={"school-curriculum"} />

      <Fragment>
        <NavBar siteUrl={siteUrl} />

        <div className="top-section1-new">
          <div className="container">
            <h1 className="principal-mess">{pageTitle}</h1>
          </div>
          <section>
            <div className="container marginTopHeader">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="title">{heading_1}</h2>
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                  >                 
                    {paragraph_1}</ReactMarkdown>
                </div>
                <div className="col-lg-6">
                  <img
                    src={imgUrl1}
                    alt="school"
                    className="image-curriculum"
                  />
                </div>
              </div>

              <div className="row wrap-curric">
                <div className="col-lg-6">
                  <img
                    src={imgUrl2}
                    alt="school"
                    className="image-curriculum"
                  />
                </div>
                <div className="col-lg-6">
                  <h2 className="title">{heading_2}</h2>
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                  >                 
                    {paragraph_2}</ReactMarkdown>
                </div>
              </div>
            </div>
          </section>
          <section className="container sec-third">
            <h4 className="title">{syllabusHeading}</h4>
            <div className="row">
              {syllabus &&
                syllabus?.length > 0 &&
                syllabus.map((syl) => {
                  if (
                    syl?.pdf_file?.data &&
                    syl?.pdf_file?.data?.attributes?.url.length > 0
                  ) {
                    return (
                      <div className="col-lg-4 wrap-syllabus">
                        <div className="syl-item">
                          <h4>{syl?.class_name}</h4>
                          <a
                            href={`${siteUrl}${syl?.pdf_file?.data?.attributes?.url}`}
                            download
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    );
                  }
                })}
              {c12 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_12}</h4>
                    <a href={`${siteUrl}${download_pdf_XII}`} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c11 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_11}</h4>
                    <a href={download_pdf_XI} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c10 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_10}</h4>
                    <a href={download_pdf_X} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c9 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_9}</h4>
                    <a href={download_pdf_9} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c8 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_8}</h4>
                    <a href={download_pdf_8} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c7 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_7}</h4>
                    <a href={download_pdf_7} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c6 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_6}</h4>
                    <a href={download_pdf_6} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c5 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_5}</h4>
                    <a href={download_pdf_5} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c4 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_4}</h4>
                    <a href={download_pdf_4} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c3 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_3}</h4>
                    <a href={download_pdf_3} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c2 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_2}</h4>
                    <a href={download_pdf_2} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {c1 && (
                <div className="col-lg-4 wrap-syllabus">
                  <div className="syl-item">
                    <h4>{class_1}</h4>
                    <a href={download_pdf_1} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {cSenior && (
                <div className="col-lg-4">
                  <div className="syl-item">
                    <h4>{class_senior_kg}</h4>
                    <a href={download_pdf_senior_kg} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
              {cJunior && (
                <div className="col-lg-4">
                  <div className="syl-item">
                    <h4>{class_junior_kg}</h4>
                    <a href={download_pdf_junior_kg} download>
                      Download
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
        <Footer siteUrl={siteUrl} />
      </Fragment>
    </>
  );
};

export default SchoolCurriculum;
