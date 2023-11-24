import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${siteUrl}/api/a-day-in-life-of-student-pages`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            student: data1
        }
    }
}

const LifeOfStudent = ({ seodata, student }) => {
    const [suudentData, setStudentData] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/a-day-in-life-of-student-pages`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setStudentData(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (student && student?.data && student?.data?.length > 0) {
            setStudentData(student?.data[0]?.attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log('API response data:', data); // Log the API response data
        //     if (data && data.data && data.data.length > 0) {
        //       const seoAttributes = data.data[13].attributes;
        //       setSeoData({
        //         title: seoAttributes.title || '',
        //         metaTitle: seoAttributes.metaTitle || '',
        //         metaDescription: seoAttributes.metaDescription || '',
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching SEO data:', error);
        //   });
        if (seodata && seodata?.data && seodata?.data?.length > 0) {
            const seoAttributes = seodata.data[13].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <NavBar />

            {/* {seoData && (
                <Seo
                    title={seoData.title}
                    metaTitle={seoData.metaTitle}
                    metaDescription={seoData.metaDescription}
                />
            )} */}

            <section className="d-none d-sm-block studentlife-new pd-bottom-90 mobilehide">
                <section className="wrap-item-principal-se1">
                    {/* <img
            src="assets/img/service/3-title-dots.png"
            alt="Transpro"
            className="wrap-img-dots"
          /> */}
                    <div className=" wrap-item-text1">
                        <h1 className="principal-mess wrap-student-item">
                            {suudentData?.page_title}
                        </h1>
                    </div>
                </section>

                <section className="whole_body_life-of-student">
                    <div>
                        <div className="life-of-student_first_para second-par2">
                            <div>
                                <p>
                                    {suudentData?.paragraph_1 && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: suudentData?.paragraph_1.replace(
                                                    /\n/g,
                                                    "<br />"
                                                ),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <div className="side_first_para_life_of_student second-par2">
                                    <p>
                                        {suudentData?.paragraph_2 && (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: suudentData?.paragraph_2.replace(
                                                        /\n/g,
                                                        "<br />"
                                                    ),
                                                }}
                                            ></span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="life_of_student_middle_para">
                            <div className="middle_left_para_life-of-student">
                                <p>
                                    {suudentData?.paragraph_3 && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: suudentData?.paragraph_3.replace(
                                                    /\n/g,
                                                    "<br />"
                                                ),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>

                            <div className="middle_right_para_life-of-student">
                                <p>
                                    {suudentData?.paragraph_4 && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: suudentData?.paragraph_4.replace(
                                                    /\n/g,
                                                    "<br />"
                                                ),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="life-of-student_last_pars">
                            <div>
                                <p>
                                    {suudentData?.paragraph_5 && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: suudentData?.paragraph_5.replace(
                                                    /\n/g,
                                                    "<br />"
                                                ),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>

                            <div className="last-para_right_student_life">
                                <p>
                                    {suudentData?.paragraph_6 && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: suudentData?.paragraph_6.replace(
                                                    /\n/g,
                                                    "<br />"
                                                ),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="studentlifeMobile pd-bottom-240 desktophide">
                <div className=" wrap-item-text1">
                    <h1 className="principal-mess studentTitle">
                        {suudentData?.page_title}
                    </h1>
                </div>
                <section className="whole_body_life-of-student">
                    <p>{suudentData?.paragraph_1}</p>

                    <p>{suudentData?.paragraph_2}</p>
                    <p>{suudentData?.paragraph_3}</p>
                    <p>{suudentData?.paragraph_4}</p>
                    <p>{suudentData?.paragraph_5}</p>
                    <p>{suudentData?.paragraph_6}</p>
                </section>
            </section>
            <Footer />
        </>
    );
};

export default LifeOfStudent;
