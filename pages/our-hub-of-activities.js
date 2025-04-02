import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import Head from "next/head";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);

        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${siteUrl}/api/activities?populate=*`)

        const data = await res.json()
        const data1 = await res1.json()

        return {
            props: {
                seodata: data?.data?.attributes?.Pages ?? {},
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

const OurHubOfActivities = ({ seodata, hubdata, siteUrl }) => {
    const [ourHubOfActivities, setOurHubOfActivities] = useState([]);
   
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

   


    return (
        <>
               <Seo SeoData={seodata} PageSlug={"our-hub-of-activities"} />

            <div className="wrap-item-se1">
                <NavBar siteUrl={siteUrl} />

               
                <div style={{ minHeight: '100vh', padding: '160px 0 60px 0' }}>
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

                                    <Link
                                        key={activity.id} // Don't forget to add a key prop
                                        href={`/individual-activities/${activity.id}`}
                                        style={{
                                            pointerEvents: (activity.image_gallery.length > 0 || activity.video_link.length > 0) ? 'auto' : 'none',
                                        }}
                                    >

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
                <Footer siteUrl={siteUrl} />
            </div>
        </>
    );
};

export default OurHubOfActivities;
