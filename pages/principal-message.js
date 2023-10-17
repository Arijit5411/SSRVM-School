import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;


export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${siteUrl}/api/principal-s-messages?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            principal_data: data1
        }
    }
}

const PrincipalMessage = ({ seodata, principal_data }) => {
    const [principalData, setPrincipalData] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    // useEffect(() => {
    //     fetch(`${siteUrl}/api/principal-s-messages?populate=*`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setPrincipalData(data.data[0].attributes);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //             setLoading(false);
    //         });
    // }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[2].attributes;
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
            const seoAttributes = seodata.data[2].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
        if (principal_data && principal_data?.data?.length > 0) {
            setPrincipalData(principal_data.data[0].attributes);
            setLoading(false);
        } else {
            setLoading(false)
        }
    }, []);

    const imageUrl = `${siteUrl}${principalData?.principal_image?.data?.attributes?.url}`;
    const pageTitle = `${principalData?.page_title}`
    const principalName = `${principalData?.principal_name}`
    const principalMessage = `${principalData?.principal_message}`

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

                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    <div className='top-section1-new'>
                        <div className="container">
                            <h1 className="principal-mess">{pageTitle}</h1>
                        </div>
                        <section className="container">

                            <div className="principal-mess-item">
                                <div className="principal-image">
                                    <img src={imageUrl} alt="Transpro" className="wrap-img" />
                                    <h6 className="wrap-principal-mess-item">{principalName}</h6>
                                </div>
                                <p>
                                    {principalMessage && (
                                        <span
                                            dangerouslySetInnerHTML={{ __html: principalMessage.replace(/\n/g, "<br />") }}
                                        ></span>
                                    )}
                                </p>
                            </div>

                        </section>
                    </div>
                )}
                <Footer />
            </Fragment>
        </>
    );
}

export default PrincipalMessage;
