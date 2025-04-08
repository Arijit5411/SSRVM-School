import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
// import Seo from './Seo';



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);
        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${siteUrl}/api/a-day-in-life-of-teacher-pages?populate=*`)

        const data = await res.json()
        const data1 = await res1.json()

        return {
            props: {
                seodata: data?.data?.attributes?.Pages ?? {},
                teacher: data1,
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

const LifeOfTeacher = ({ seodata, teacher, siteUrl }) => {
    const [teachersData, setTeachersData] = useState(null);




    useEffect(() => {
        // fetch(`${siteUrl}/api/a-day-in-life-of-teacher-pages?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setTeachersData(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (teacher && teacher?.data && teacher?.data?.length > 0) {
            setTeachersData(teacher?.data[0]?.attributes)
        }
    }, []);



    const imageUrl1 = `${siteUrl}${teachersData?.image_1_teacher?.data?.attributes?.url}`;
    const imageUrl2 = `${siteUrl}${teachersData?.image_2_teacher?.data?.attributes?.url}`;
    const imageUrl3 = `${siteUrl}${teachersData?.image_3_teacher?.data?.attributes?.url}`;

    const teacher1 = `${teachersData?.teachersData[0]?.text_below_image}`;
    const teacher2 = `${teachersData?.teachersData[1]?.text_below_image}`;
    const teacher3 = `${teachersData?.teachersData[2]?.text_below_image}`;

    return (
        <>
            <Seo SeoData={seodata} PageSlug={"life-of-teacher"} />

            <NavBar siteUrl={siteUrl} />


            <section className="techerlife-new pd-bottom-90">
                <div className="">
                    <Image width={80} height={80}
                        src="assets/img/service/3-title-dots.png"
                        alt="Transpro"
                        className="wrap-img-dots"
                    />
                    <h1 className="wrap-teacher-item lineHight teacherHeading">
                        {teachersData?.page_title}
                    </h1>
                </div>

                <div className="container marginTop">
                    <div className="row">
                        <div className="col-sm-3">
                            <Image width={306} height={306} src={imageUrl1} alt="" className="" />
                            <div className="text-under-image-lifeofteacher">
                                <p>
                                    {teacher1 && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: teacher1.replace(/\n/g, "<br />"),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <div className="arrow_between_images">
                                <p>&#62; </p>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <Image width={306} height={306} src={imageUrl2} alt="" className="" />
                            <div className="text-under-image-lifeofteacher">
                                <p>
                                    {teacher2 && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: teacher2.replace(/\n/g, "<br />"),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <div className="arrow_between_images">
                                <p>&#62;</p>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <Image width={306} height={306} src={imageUrl3} alt="" className="" />
                            <div className="text-under-image-lifeofteacher">
                                <p>{teacher3}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer siteUrl={siteUrl} />
        </>
    );
};

export default LifeOfTeacher;
