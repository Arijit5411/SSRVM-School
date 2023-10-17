import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${siteUrl}/api/committee-members?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            commitee_Data: data1
        }
    }
}

const CommitteeMembers = ({ seodata, commitee_Data }) => {
    const [committeeMembers, setCommitteeMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    // useEffect(() => {
    // fetch(`${siteUrl}/api/committee-members?populate=*`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setCommitteeMembers(data.data);
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //         setLoading(false);
    //     });
    // }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log('API response data:', data); // Log the API response data
        //     if (data && data.data && data.data.length > 0) {
        //       const seoAttributes = data.data[3].attributes;
        //       setSeoData({
        //         title: seoAttributes.title || '',
        //         metaTitle: seoAttributes.metaTitle || '',
        //         metaDescription: seoAttributes.metaDescription || '',
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching SEO data:', error);
        //   });
        if (seodata && seodata?.data && seodata?.data?.length > 0) {
            const seoAttributes = seodata.data[3].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
        if (commitee_Data && commitee_Data?.data?.length > 0) {
            setCommitteeMembers(commitee_Data?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, []);

    return (
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

            <div className="top-section1-new">
                <div className="container">
                    <h1 className="principal-mess">Committee Members</h1>
                </div>
                <section className="container marginTopHeader">
                    {loading ? (
                        <div className="loader">Loading...</div>
                    ) : (
                        <div className="row g-4">
                            {committeeMembers.map((member) => (
                                <div className="col-lg-6" key={member.id}>
                                    <div className="wrap-item-member">
                                        <div className="wrap-image">
                                            <img
                                                src={`${siteUrl}${member.attributes.image.data.attributes.url}`}
                                                alt="Transpro"
                                                className="member-img"
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
            <Footer />
        </Fragment>
    );
};

export default CommitteeMembers;
