import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
// import Seo from './Seo';



const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);

    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${GlobalSiteUrl}/api/value-based-educations?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            value: data1,
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
const ValueBasedEducation = ({ seodata, value,siteUrl }) => {
    const [valueData, setValueData] = useState(null);
    const [loading, setLoading] = useState(true);
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
        //             const seoAttributes = data.data[10].attributes;
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
            const seoAttributes = seodata.data[10].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    useEffect(() => {
        // fetch(`${GlobalSiteUrl}/api/value-based-educations?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setValueData(data.data[0].attributes);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //         setLoading(false);
        //     });
        if (value && value?.data && value?.data?.length > 0) {
            setValueData(value?.data[0]?.attributes);
            setLoading(false);
        } else {
            setLoading(false);
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
                <NavBar siteUrl={siteUrl}/>

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

                    <section className="wrap-training-item-se3">
                        <section className="container ">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className=" valueMargin">
                                        <h1 className="principal-mess value_mob">{valueData.heading}</h1>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={`${GlobalSiteUrl}${valueData?.image?.data?.attributes?.url}`}
                                className='imgWidth' />
                        </section>

                    </section>

                )}
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
}

export default ValueBasedEducation;