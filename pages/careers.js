import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import Head from "next/head";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";

// import { Link } from "react-router-dom";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
  ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
  : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
  const res = await fetch(
    `${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`
  );
  const res1 = await fetch(`${siteUrl}/api/careers-pages?populate=*`);

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data,
      careerProp: data1,
    },
  };
};

const Careers = ({ seodata, careerProp }) => {
  const [careers, setCareers] = useState(null);
  const [seoData, setSeoData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    // fetch(`${siteUrl}/api/careers-pages?populate=*`)
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         setCareers(data.data[0].attributes);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //         // You can set an error state here or handle the error in another way.
    //     });
    if (careerProp && careerProp?.data && careerProp?.data?.length > 0) {
      setCareers(careerProp?.data[0]?.attributes);
    }
  }, []);

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('API response data:', data); // Log the API response data
    //         if (data && data.data && data.data.length > 0) {
    //             const seoAttributes = data.data[26].attributes;
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
      const seoAttributes = seodata.data[26].attributes;
      setSeoData({
        title: seoAttributes.title || "",
        metaTitle: seoAttributes.metaTitle || "",
        metaDescription: seoAttributes.metaDescription || "",
      });
    }
  }, []);

  const image_career = `${siteUrl}${careers?.image_career?.data?.attributes?.url}`;
  // console.log("image=",image_career)
  const page_title = `${careers?.page_title}`;
  const short_description = `${careers?.short_description}`;
  const paragraph_1 = `${careers?.paragraph_1}`;
  const paragraph_2 = `${careers?.paragraph_2}`;
  const paragraph_3 = `${careers?.paragraph_3}`;
  //   const current_opening_heading = `${careers?.current_opening_heading}`;
  //   const senior_teacher = `${careers?.senior_teacher}`;
  //   const assistant_teacher_heading = `${careers?.assistant_teacher_heading}`;
  //   const senior_teaching_staff = `${careers?.senior_teaching_staff}`;
  //   const assistant_teacher_post = `${careers?.assistant_teacher_post}`;
  //   const job_role_title = `${careers?.job_role[0]?.job_role_title}`;
  //   const job_role_para1 = `${careers?.job_role[0]?.job_role_para1}`;
  //   const job_role_para2 = `${careers?.job_role[0]?.job_role_para2}`;
  //   const exerience_heading = `${careers?.job_role[0]?.exerience_heading}`;
  //   const desc_experience = `${careers?.job_role[0]?.desc_experience}`;

  console.log(careers?.Job_Role);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
        {seoData.metaTitle && (
          <meta name="description" content={seoData.metaDescription} />
        )}
      </Head>
      <Fragment>
        <NavBar />
        {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

        {careers && (
          <div className="top-section18-new mobiletoppadding">
            <section className="upper_content_careers">
              <div className="container">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="wrap-item-text1">
                      <h1 className="principal-mess mob_heading_car lineHight">
                        {page_title}
                      </h1>
                    </div>
                    <div className="first_para-careers">
                      <p>{short_description}</p>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <img
                      src={image_career}
                      alt=""
                      className="career_side_img careers_para_side"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="bottom_section-careers">
              <div className="bottom_para-careers">
                <div>
                  <p className="fontSize bot_mob_para">{paragraph_1}</p>
                  <p className="fontSize bot_mob_para">{paragraph_3}</p>
                </div>
                <div>
                  <p className="fontSize bot_mob_para">{paragraph_2}</p>
                </div>
              </div>
            </section>

            <section className="py-5">
              <div className="container">
                {careers?.Job_Role && (
                  <div className="section-title">
                    <h2 className="fs-36 fw-600">Current Opening</h2>
                  </div>
                )}
                <div className="job-opening-list">
                  {(careers?.Job_Role) &&
                    careers?.Job_Role.map((data, index) => {
                      if(data.Job_Role !== null){
                        return (
                            <Accordion
                              expanded={expanded === data.id}
                              onChange={handleChange(data.id)}
                              key={data.id}
                            >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <h4 className="fs-20 fw-600">{`${index + 1}. ${data.Job_Role}`}</h4>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="job-details">
                                    <ReactMarkdown>{data.Job_Details}</ReactMarkdown>
                                    <Link className="def-btn btn-1 mt-3" href={`/career-apply`} >Apply Now</Link>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          );
                        }
                    })}
                </div>
              </div>
            </section>
          </div>
        )}
        <Footer />
      </Fragment>
    </>
  );
};

export default Careers;
