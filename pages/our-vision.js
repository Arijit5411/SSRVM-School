import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import Image from "next/image";
// import Seo from './Seo';


const GlobalSiteUrl = process.env.GSURL

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${GlobalSiteUrl}/api/vision-and-missions?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            visionMission: data1,
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
const OurVision = ({ seodata, visionMission ,siteUrl}) => {
   
    const [visionMissionData, setVisionMissionData] = useState(null);


    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[0].attributes;
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

        // Fetch vision and mission data from your API
        // fetch(`${GlobalSiteUrl}/api/vision-and-missions?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Vision and Mission API response data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             const visionMissionAttributes = data.data[0].attributes;
        //             setVisionMissionData(visionMissionAttributes);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching Vision and Mission data:', error);
        //     });

       
        if (visionMission && visionMission?.data && visionMission?.data?.length > 0) {
            const visionMissionAttributes = visionMission?.data[0]?.attributes;
            setVisionMissionData(visionMissionAttributes);
        }
    }, []);

    return (
        <>
               <Seo SeoData={seodata} PageSlug={"our-vision"} />

            <Fragment>
                <NavBar siteUrl={siteUrl}/>
                

                <div className="top-wrap-item-se1">
                    <div className="top-section21">
                        <section className="container">
                            <div className="row wrap-vision-mission">
                                <div className="col-lg-6 wrap-vision-item">
                                    <h1 className="wrap-vision">{visionMissionData?.vision}</h1>
                                    {visionMissionData?.vision_content.split('\n').map((sentence, index) => (
                                        <React.Fragment key={index}>
                                            <p>{sentence}</p>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="col-lg-6">
                                    <Image width={636} height={424}
                                        src={`${GlobalSiteUrl}${visionMissionData?.vision_img?.data?.attributes?.url}`}
                                        alt="Vision Image"
                                        className="vision-img"
                                    />

                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="section-3">
                        <div className="container">
                            <div className="row">
                                <p dangerouslySetInnerHTML={{ __html: visionMissionData?.banner_img_content.replace(/\n/g, '<br />') }} />
                            </div>
                        </div>
                    </div>

                    <section className=" pd-bottom-90">
                        <div className="container">
                            <div className="row wrap-vision-mission-sec3 align-items-center">
                                <div className="col-lg-7 wrap-vision-item">
                                    <h2 className="wrap-vision">{visionMissionData?.mission}</h2>
                                    {visionMissionData?.mission_left_content.split('\n').map((sentence, index) => (
                                        <React.Fragment key={index}>
                                            <p>{sentence}</p>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="col-lg-5">
                                    <div className="card warp-item-se3">
                                        <div className="card-body">
                                            <p className="card-text-item">
                                                {visionMissionData?.mission_right_content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default OurVision;
