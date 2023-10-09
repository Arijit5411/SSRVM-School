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
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/generic-text-pages`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            generic: data1
        }
    }
}

const GenericTextPage = ({ seodata, generic }) => {
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    const [genericTextPage, setGenericTextPage] = useState(null);

    useEffect(() => {
        // fetch(`${siteUrl}/api/generic-text-pages`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setGenericTextPage(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (generic && generic?.data && generic?.data?.length > 0) {
            setGenericTextPage(generic?.data[0]?.attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[39].attributes;
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
            const seoAttributes = seodata.data[39].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const pageTitle = `${genericTextPage?.page_title}`
    const para1 = `${genericTextPage?.paragraph_1}`
    const para2 = `${genericTextPage?.paragraph_2}`
    const para3 = `${genericTextPage?.paragraph_3}`

    // console.log("paragraph_1",para1)

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

                <div className='top-section1'>
                    <div className="container">
                        <h1 className="principal-mess">{pageTitle}</h1>
                    </div>

                    <div className='generic-text-box'>
                        <div>
                            <p>{para1}

                            </p>
                            <p>{para2}
                            </p>
                            <p> {para3}
                            </p>
                        </div>
                    </div>

                </div>
                <Footer />
            </Fragment>
        </>
    );
}

export default GenericTextPage;