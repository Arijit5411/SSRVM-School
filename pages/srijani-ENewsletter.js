import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Seo from './Seo';
import Head from "next/head";

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/srijani-enewsletters?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            newsletter: data1
        }
    }
}

const SrijaniENewsletter = ({ seodata, newsletter }) => {
    const [newsletters, setNewsletters] = useState([]);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/srijani-enewsletters?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setNewsletters(data.data);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (newsletter && newsletter?.data && newsletter?.data?.length > 0) {
            setNewsletters(newsletter?.data)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[37].attributes;
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
            const seoAttributes = seodata.data[37].attributes;
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
                        <h1 className="principal-mess">SRIJANI e-Newsletter</h1>
                    </div>
                    <section className="container newsletter">
                        <div className="row">
                            {newsletters.map((newsletter) => (
                                <div className="col-lg-6" key={newsletter.id}>
                                    <div className="eNews-item">
                                        <a href={`${siteUrl}${newsletter.attributes.pdf?.data?.attributes?.url}`} download>
                                            {console.log("path", newsletter.attributes.pdf?.data?.attributes?.url)}
                                            <h5 className="news_mob">{newsletter.attributes.title}</h5>
                                        </a>
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

export default SrijaniENewsletter;
