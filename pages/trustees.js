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

    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${GlobalSiteUrl}/api/trustees?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            trusteeData: data1,
            
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

const Trustees = ({ seodata, trusteeData, }) => {
    const [expandedStates, setExpandedStates] = useState({});
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });
    const [trusteesData, setTrusteesData] = useState([]);
    const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[8].attributes;
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

        // Fetch trustees' data from your API
        // fetch(`${GlobalSiteUrl}/api/trustees?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Trustees data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             setTrusteesData(data.data);
        //             // Initialize the expanded states for all trustees to false
        //             const initialExpandedStates = {};
        //             data.data.forEach((trustee, index) => {
        //                 initialExpandedStates[`isExpanded${index}`] = false;
        //             });
        //             setExpandedStates(initialExpandedStates);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching Trustees data:', error);
        //     });

        if (seodata && seodata?.data && seodata?.data?.length > 0) {
            const seoAttributes = seodata.data[8].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
        if (trusteeData && trusteeData?.data && trusteeData?.data?.length > 0) {
            setTrusteesData(trusteeData?.data);
            // Initialize the expanded states for all trustees to false
            const initialExpandedStates = {};
            trusteeData?.data.forEach((trustee, index) => {
                initialExpandedStates[`isExpanded${index}`] = false;
            });
            setExpandedStates(initialExpandedStates);
        }
    }, []);

    const toggleExpand = (key) => {
        setExpandedStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

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

                <div className='top-section1-new'>
                    <div className="container">
                        <h1 className="principal-mess">Trustees</h1>
                    </div>
                    <section className="container">
                        <div className="row g-4 mt-5">
                            {trusteesData.map((trustee, index) => (
                                <div className="col-lg-6" key={index}>
                                    <div className="wrap-item-member1">
                                        <div className="wrap-image-trustees">
                                            <img src={`${GlobalSiteUrl}${trustee.attributes.image?.data?.attributes?.url}`} alt={trustee.attributes.name} className="trustees-img" />
                                        </div>
                                        <div className="wrap-text-trustees">
                                            <h5 className="wrap-trustees-item">{trustee.attributes.name}</h5>
                                            <p className="trust-designation">{trustee.attributes.designation}</p>
                                            <p>
                                                {expandedStates[`isExpanded${index}`] ? (
                                                    <>
                                                        {trustee.attributes.content}
                                                    </>
                                                ) : (
                                                    <>
                                                        {trustee.attributes.content.substring(0, 420)}...
                                                    </>
                                                )}
                                            </p>
                                            <div onClick={() => toggleExpand(`isExpanded${index}`)}>
                                                {expandedStates[`isExpanded${index}`] ? (
                                                    <h5 className="wrap-trustees-item1">Read less</h5>
                                                ) : (
                                                    <h5 className="wrap-trustees-item1">Read more</h5>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
}

export default Trustees;