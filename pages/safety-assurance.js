import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Head from 'next/head';
// import Seo from './Seo';


import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/safety-assurances`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            safety: data1,
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

const Safety_Assuarance = ({ seodata, safety ,siteUrl}) => {
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    const [safetyAssuarance, setSafetyAssuarance] = useState({
        content: "",
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/safety-assurances`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setSafetyAssuarance(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (safety && safety?.data && safety?.data?.length > 0) {
            setSafetyAssuarance(safety?.data[0].attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[29].attributes;
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
            const seoAttributes = seodata.data[29].attributes;
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
                <NavBar siteUrl={siteUrl}/>
                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <div className='top-section1'>
                    <div className="container">
                        <h1 className="principal-mess">Safety Assurance</h1>
                        
                        
                    </div>

                    <div className='generic-text-box'>
                        <div dangerouslySetInnerHTML={{ __html: safetyAssuarance.content }} />
                    </div>

                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
}

export default Safety_Assuarance;