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
    const res1 = await fetch(`${siteUrl}/api/a-day-in-life-of-teacher-pages?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            teacher: data1
        }
    }
}

const LifeOfTeacher = ({ seodata, teacher }) => {
    const [teachersData, setTeachersData] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });



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

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[14].attributes;
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
        if (seodata && seodata?.data && seoData?.data?.length > 0) {
            const seoAttributes = seodata.data[14].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
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

            <section className="techerlife-new pd-bottom-90">
                <div className="">
                    <img
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
                            <img src={imageUrl1} alt="" className="" />
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
                            <img src={imageUrl2} alt="" className="" />
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
                            <img src={imageUrl3} alt="" className="" />
                            <div className="text-under-image-lifeofteacher">
                                <p>{teacher3}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default LifeOfTeacher;
