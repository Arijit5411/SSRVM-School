import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RequestTransferCertificate from "../components/RequestTransferCertificate";
import DownloadTransferCertificate from "../components/DownloadTransferCertificate";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos`)

    const data = await res.json()

    return {
        props: {
            seodata: data
        }
    }
}

const TransferCertificate = ({ seodata }) => {
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[18].attributes;
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
            const seoAttributes = seodata.data[18].attributes;
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
                {/* <div className='top-section1'> */}

                <div className="top-section1">
                    <div className="container">
                        <h1 className="principal-mess">Transfer Certificate</h1>
                    </div>
                </div>
                <section>
                    <div className="container mb-60 marginTopHeader">
                        <Tabs defaultActiveKey="Downloadnow" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="Downloadnow" title="Download Now">
                                <DownloadTransferCertificate />
                            </Tab>

                            <Tab eventKey="RequestCertificate" title="Request Certificate">
                                <RequestTransferCertificate />
                            </Tab>
                        </Tabs>
                    </div>
                </section>

                {/*
    </div> */}

                <Footer />
            </Fragment>
        </>
    );
};

export default TransferCertificate;