import React, { Fragment, useState, useEffect } from "react";
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
    const res1 = await fetch(`${siteUrl}/api/career-guidance-pages?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            careerGuide: data1
        }
    }
}


const CareerGuidance = ({ seodata, careerGuide }) => {
    const [careerGuidance, setCareerGuidance] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });



    useEffect(() => {
        // fetch(`${siteUrl}/api/career-guidance-pages?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setCareerGuidance(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (careerGuide && careerGuide?.data) {
            setCareerGuidance(careerGuide?.data[0]?.attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[21].attributes;
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
            const seoAttributes = seodata.data[21].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const imageUrl = `${siteUrl}${careerGuidance?.image?.data?.attributes?.url}`;
    const page_title = `${careerGuidance?.page_title}`;
    const paragraph_1 = `${careerGuidance?.paragraph_1}`;
    const paragraph_2 = `${careerGuidance?.paragraph_2}`;
    const paragraph_3 = `${careerGuidance?.paragraph_3}`;
    const paragraph_4 = `${careerGuidance?.paragraph_4}`;

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <Fragment>
                <NavBar />
                <div className="top-section-new mobiletoppadding">
                    <div className="container">
                        <h1 className="principal-mess mob_head linehightdesktop">{page_title}</h1>
                    </div>
                    <section>
                        <div className="container">
                            <div className="upper_section_career">
                                <p className="para_career_mob">
                                    {paragraph_1}
                                    <br></br>
                                    <br></br>
                                    {paragraph_2}
                                </p>
                                <img src={imageUrl} className="career_image" alt="career_img" />
                            </div>
                            <div className="bottom_para_career">
                                <p className="para_career_mob">{paragraph_3}</p>
                                <p className="para_career_mob"> {paragraph_4}</p>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </Fragment>
        </>
    );
};

export default CareerGuidance;
