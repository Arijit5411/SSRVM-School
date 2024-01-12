import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Seo from './Seo';
import Head from "next/head";



import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);   
     const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/school-infos?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            schoolInfo_data: data1,
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

const SchoolInfo = ({ seodata, schoolInfo_data,siteUrl }) => {
    const [schoolInfoList, setSchoolInfoList] = useState([]);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    // useEffect(() => {
    //     fetch(`${siteUrl}/api/school-infos?populate=*`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.data && data.data.length > 0) {
    //                 const schoolInfos = data.data.map(item => item.attributes);
    //                 setSchoolInfoList(schoolInfos);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[4].attributes;
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
            const seoAttributes = seodata.data[36].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
        if (schoolInfo_data.data && schoolInfo_data?.data?.length > 0) {
            const schoolInfos = schoolInfo_data?.data?.map(item => item.attributes);
            setSchoolInfoList(schoolInfos);
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

                <div className="top-section1-new">
                    <div className="container">
                        <h1 className="principal-mess">School Info</h1>
                    </div>
                    <div className="marginTopHeader">
                        {schoolInfoList.map((schoolInfo, index) => (
                            <section key={index} className="container pd-bottom-20">
                                <div className="accordion" id={`accordionExample${index}`}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id={`heading${index}`}>
                                            <button
                                                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}  //"collapsed" class conditionally
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${index}`}
                                                aria-expanded={index === 0 ? 'true' : 'false'}  // Set "true" for the first section, "false" for the rest
                                                aria-controls={`collapse${index}`}
                                            >
                                                {schoolInfo?.heading}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${index}`}
                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}  //"show" class conditionally
                                            aria-labelledby={`heading${index}`}
                                            data-bs-parent={`#accordionExample${index}`}
                                        >
                                            <div className="accordion-body">
                                                <div dangerouslySetInnerHTML={{ __html: schoolInfo?.details }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default SchoolInfo;
