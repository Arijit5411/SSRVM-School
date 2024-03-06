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


import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);

  const res1 = await fetch(`${siteUrl}/api/careers-pages?populate=*`);

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data?.data?.attributes?.Pages ?? {},
      careerProp: data1,
      siteUrl
    },
  }
} catch (error) {
  console.error("Error fetching data:", error.message);

  return {
    props: {
      data: [],
    },
  };
}
};

const Careers = ({ seodata, careerProp,siteUrl }) => {
  const [careers, setCareers] = useState(null);
 

  useEffect(() => {
   
    if (careerProp && careerProp?.data && careerProp?.data?.length > 0) {
      setCareers(careerProp?.data[0]?.attributes);
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
          <Seo SeoData={seodata} PageSlug={"careers"} />

      <Fragment>
        <NavBar siteUrl={siteUrl}/>
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
        <Footer siteUrl={siteUrl}/>
      </Fragment>
    </>
  );
};

export default Careers;
