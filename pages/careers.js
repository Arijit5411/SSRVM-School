import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import Head from "next/head";
// import { Link } from "react-router-dom";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/careers-pages?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            careerProp: data1
        }
    }
}

const Careers = ({ seodata, careerProp }) => {
    const [careers, setCareers] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
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
            setCareers(careerProp?.data[0]?.attributes)
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
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const image_career = `${siteUrl}${careers?.image_career?.data?.attributes?.url}`;
    // console.log("image=",image_career)
    const page_title = `${careers?.page_title}`;
    const short_description = `${careers?.short_description}`;
    const paragraph_1 = `${careers?.paragraph_1}`;
    const paragraph_2 = `${careers?.paragraph_2}`;
    const paragraph_3 = `${careers?.paragraph_3}`;
    const current_opening_heading = `${careers?.current_opening_heading}`;
    const senior_teacher = `${careers?.senior_teacher}`;
    const assistant_teacher_heading = `${careers?.assistant_teacher_heading}`;
    const senior_teaching_staff = `${careers?.senior_teaching_staff}`;
    const assistant_teacher_post = `${careers?.assistant_teacher_post}`;
    const job_role_title = `${careers?.job_role[0]?.job_role_title}`;
    const job_role_para1 = `${careers?.job_role[0]?.job_role_para1}`;
    const job_role_para2 = `${careers?.job_role[0]?.job_role_para2}`;
    const exerience_heading = `${careers?.job_role[0]?.exerience_heading}`;
    const desc_experience = `${careers?.job_role[0]?.desc_experience}`;
    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
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
                                                {/* Careers */}
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

                        <section className="container wrap-item-school-sec2">
                            <div>
                                <h3 className="opening_mob">
                                    {current_opening_heading}
                                    {/* Current Openings */}
                                </h3>
                            </div>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            {senior_teacher}
                                            {/* Senior Teacher */}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <div>
                                                <h4 className="jobrole_exp">
                                                    {job_role_title}
                                                    {/* Job Role */}
                                                </h4>
                                            </div>
                                            <div className="card-body ">
                                                <p className="desc_job">{job_role_para1}</p>
                                                <p className="desc_job">{job_role_para2}</p>
                                            </div>
                                            <div>
                                                <h4 className="jobrole_exp">
                                                    {exerience_heading}
                                                    {/* Experience */}
                                                </h4>
                                            </div>
                                            <div>
                                                <p className="desc_job">{desc_experience}</p>
                                            </div>
                                            <Link href="/career-apply">
                                                <button className="footerbtn">Apply Now</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            {assistant_teacher_heading?assistant_teacher_heading:"Heading Not Available"}
                                            {/* Status of Affiliation: */}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong>{" "}
                                            It is hidden by default, until the collapse plugin adds
                                            the appropriate classNamees that we use to style each
                                            element. These classNamees control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our
                                            default variables. It's also worth noting that just about
                                            any HTML can go within the
                                            <code>.accordion-body</code>, though the transition does
                                            limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            {senior_teaching_staff?senior_teaching_staff:"Heading Not Available"}
                                            {/* List of Members of School Management Committee: */}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong>{" "}
                                            It is hidden by default, until the collapse plugin adds
                                            the appropriate classNamees that we use to style each
                                            element. These classNamees control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our
                                            default variables. It's also worth noting that just about
                                            any HTML can go within the
                                            <code>.accordion-body</code>, though the transition does
                                            limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="false"
                                            aria-controls="collapseFour"
                                        >
                                            {assistant_teacher_post?assistant_teacher_post:"Heading Not Available"}
                                            {/* Area of School Campus: */}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFour"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong>{" "}
                                            It is hidden by default, until the collapse plugin adds
                                            the appropriate classNamees that we use to style each
                                            element. These classNamees control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our
                                            default variables. It's also worth noting that just about
                                            any HTML can go within the
                                            <code>.accordion-body</code>, though the transition does
                                            limit overflow.
                                        </div>
                                    </div>
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
