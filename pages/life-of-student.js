import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);


    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/a-day-in-life-of-student-pages`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data.data.attributes.Pages,
            student: data1,
            siteUrl
        }
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


const LifeOfStudent = ({ seodata, student,siteUrl }) => {
    const [suudentData, setStudentData] = useState(null);
   

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

   

    return (
        <>
               <Seo SeoData={seodata} PageSlug={"life-of-student"} />

            <NavBar siteUrl={siteUrl}/>

           

            <section className="d-none d-sm-block studentlife-new pd-bottom-90 mobilehide">
                <section className="wrap-item-principal-se1">
                  
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
            <Footer siteUrl={siteUrl}/>
        </>
    );
};

export default LifeOfStudent;
