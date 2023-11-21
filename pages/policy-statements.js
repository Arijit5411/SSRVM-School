import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/policy-statements`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            policy: data1
        }
    }
}

const Policy_Statements = ({ seodata, policy }) => {
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    const [policyStatements, setPolicyStatements] = useState({
        content: "",
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/policy-statements`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Assuming the API response structure matches your state structure
        //         setPolicyStatements(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (policy && policy?.data && policy?.data?.length > 0) {
            setPolicyStatements(policy?.data[0]?.attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[30].attributes;
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
            const seoAttributes = seodata.data[30].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    return (
        <>
            <Fragment>
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

                <div className="top-section1">
                    <div className="container">
                        <h1 className="principal-mess">Policy Statements</h1>
                    </div>

                    <div className="generic-text-box">
                        <div dangerouslySetInnerHTML={{ __html: policyStatements.content }} />
                    </div>
                </div>
                <Footer />
            </Fragment>
        </>
    );
};

export default Policy_Statements;
