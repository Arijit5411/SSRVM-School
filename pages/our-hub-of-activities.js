import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
// import { Link } from "react-router-dom";
import Head from "next/head";
// import Seo from './Seo';

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);

    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/activities?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            hubdata: data1,
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

const OurHubOfActivities = ({ seodata, hubdata,siteUrl }) => {
    const [ourHubOfActivities, setOurHubOfActivities] = useState([]);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/activities?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         const activitiesData = data.data.map((item) => {
        //             console.log("item:", item);
        //             console.log("activity.id:", item.id);
        //             return {
        //                 id: item.id,
        //                 ...item.attributes,
        //             };
        //         });
        //         setOurHubOfActivities(activitiesData);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (hubdata && hubdata?.data && hubdata?.data?.length > 0) {
            const activitiesData = hubdata.data.map((item) => {
                console.log("item:", item);
                console.log("activity.id:", item.id);
                return {
                    id: item.id,
                    ...item.attributes,
                };
            });
            setOurHubOfActivities(activitiesData);
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[19].attributes;
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
            const seoAttributes = seodata.data[19].attributes;
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
            <div className="wrap-item-se1">
                <NavBar siteUrl={siteUrl}/>

                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <div className="top-section1-new">
                    <div className="container">
                        <div className=" wrap-item-text1">
                            <h1 className="principal-mess wrap-hub-act">
                                Our Hub of Activities
                            </h1>
                            <p className="hubTitle mobilehide">
                                The school curriculum leads to sound academic growth. However,
                                involvement in co-curricular<br></br>
                                activities is an essential part of schooling. Some of the
                                activities which the school provides are:
                            </p>
                            <p className="hubTitle desktophide">
                                The school curriculum leads to sound academic growth. However,
                                involvement in co-curricular
                                activities is an essential part of schooling. Some of the
                                activities which the school provides are:
                            </p>
                        </div>
                    </div>
                    <section className="container">
                        <div className="row g-4 mt-5">
                            {ourHubOfActivities.map((activity) => (
                                <div className="col-lg-6" key={activity.id}>
                                    <Link href={`/individual-activities/${activity.id}`}>
                                        {" "}
                                        <div
                                            className=" cardact wrap-hub-item"
                                            style={{
                                                backgroundColor: activity.card_color || "#b3c6ff",
                                            }}
                                        >
                                            <div className="image-container">
                                                <img
                                                    src={`${siteUrl}${activity.image?.data?.attributes?.url}`}
                                                    alt="Card"
                                                    className="card-image"
                                                />
                                            </div>
                                            <div className="card-content">
                                                <h2>{activity.title}</h2>
                                                <p>{activity.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </div>
        </>
    );
};

export default OurHubOfActivities;
