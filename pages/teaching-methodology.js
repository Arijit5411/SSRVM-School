import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${GlobalSiteUrl}/api/teaching-methodologies`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            teaching: data1
        }
    }
}

const TeachingMethodology = ({ seodata, teaching }) => {
    const [teachingData, setTeachingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });


    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[0].attributes; // Use index 0 to get the first SEO entry
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
            const seoAttributes = seodata.data[1].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, [siteUrl]); // Include siteUrl as a dependency

    useEffect(() => {
        // fetch(`${GlobalSiteUrl}/api/teaching-methodologies`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         if (data && data.data && data.data.length > 0) {
        //             setTeachingData(data.data[0].attributes);
        //         }
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching teaching methodology data:", error);
        //         setLoading(false);
        //     });
        if (teaching && teaching?.data && teaching?.data?.length > 0) {
            setTeachingData(teaching?.data[0]?.attributes);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [GlobalSiteUrl]);

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

                <section className="wrap-training-item-se1">
                    <section className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <>
                                        <h1 className="wrap-training-teach">
                                            {teachingData ? teachingData.title : 'No Title Available'}
                                        </h1>
                                        <p className='teachText'>
                                            {teachingData ? teachingData.content : 'No Content Available'}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                    <Footer />
                </section>
            </Fragment>
        </>
    );
}

export default TeachingMethodology;