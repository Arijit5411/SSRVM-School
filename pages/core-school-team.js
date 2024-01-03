import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);  
       const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/core-school-teams?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            teamData: data1,
            siteUrl
        }
    }
} catch (error) {
  console.error("Error fetching data:", error.message);

  return {
    props: {
      data: [],
    },
  };
}
};

const Core_School_Team = ({ seodata, teamData ,siteUrl}) => {
    const [coreSchoolTeam, setCoreSchoolTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/core-school-teams?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setCoreSchoolTeam(data.data);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //         setLoading(false);
        //     });
        if (teamData && teamData?.data && teamData?.data?.length > 0) {
            setCoreSchoolTeam(teamData?.data)
            setLoading(false)
        } else {
            console.log('error');
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[48].attributes;
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
            const seoAttributes = seodata.data[48].attributes;
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

                <div className="top-section1">
                    <div className="container">
                        <h1 className="principal-mess">Core School Team</h1>
                    </div>
                    <section className="container">
                        {loading ? (
                            <div className="loader">Loading...</div>
                        ) : (
                            <div className="row g-4">
                                {coreSchoolTeam.map((member) => (
                                    <div className="col-lg-6" key={member.id}>
                                        <div className="wrap-item-member">
                                            <div className="wrap-image">
                                                <img
                                                    src={`${siteUrl}${member.attributes.image.data.attributes.url}`}
                                                    alt="Transpro"
                                                    className="core-img"
                                                />
                                            </div>
                                            <div className="wrap-text">
                                                <h6>{member.attributes.designation}</h6>
                                                <p>{member.attributes.full_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default Core_School_Team;
