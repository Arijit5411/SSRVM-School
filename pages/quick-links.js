import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/quick-links`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            links: data1
        }
    }
}

const QuickLinks = ({ seodata, links }) => {
    const [quickLinks, setQuickLinks] = useState([]);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });



    useEffect(() => {
        // fetch(`${siteUrl}/api/quick-links`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setQuickLinks(data.data);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (links && links?.data) {
            setQuickLinks(links?.data)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[31].attributes;
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
            const seoAttributes = seodata.data[31].attributes;
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
            <Fragment>
                <NavBar />
                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <div className="top-section1-new">
                    <div className="container">
                        <h1 className="principal-mess">Quick Links</h1>
                    </div>
                    <section className="container wrap-item-news">
                        <div className="row">
                            {quickLinks.map((link) => (
                                <div className="col-lg-6 newsletter" key={link.id}>
                                    <div className="eNews-item">
                                        <Link href={link?.attributes?.link ?? ''}>
                                            <h4>{link.attributes.title}</h4>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <Footer />
            </Fragment>
        </>
    );
};

export default QuickLinks;
