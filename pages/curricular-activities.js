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
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/co-curricular-activities-pages?populate[images][populate]=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            activities: data1
        }
    }
}

const Co_curricular_Activities = ({ seodata, activities }) => {
    const [cocurricularActivities, setCocurricularActivities] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/co-curricular-activities-pages?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setCocurricularActivities(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (activities && activities?.data && activities?.data?.length > 0) {
            setCocurricularActivities(activities?.data[0].attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[22].attributes;
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
            const seoAttributes = seodata.data[22].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);


    const page_title = `${cocurricularActivities?.page_title}`;
    const paragraph = `${cocurricularActivities?.paragraph}`;

    const image_1 = `${siteUrl}${cocurricularActivities?.image_1?.data?.attributes?.url}`;
    const image_2 = `${siteUrl}${cocurricularActivities?.image_2?.data?.attributes?.url}`;
    const image_3 = `${siteUrl}${cocurricularActivities?.image_3?.data?.attributes?.url}`;
    const image_4 = `${siteUrl}${cocurricularActivities?.image_4?.data?.attributes?.url}`;

    const [currentImage, setCurrentImage] = useState(0);

    const goToPrevious = () => {
        setCurrentImage((prevImage) =>
            prevImage === 0 ? images.length - 1 : prevImage - 1
        );
    };

    const goToNext = () => {
        setCurrentImage((prevImage) =>
            prevImage === images.length - 1 ? 0 : prevImage + 1
        );
    };

    // const images = [image_1, image_2, image_3, image_4];
    const images = cocurricularActivities?.images?.slice(4);

    return (
        <>
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

                <div className="top-section40-new">
                    <section className="wrap-item-timing-se1">
                        <div className="container">
                            <div className="wrap-item-timing">
                                <h1 className="wrap-heading-sch">{page_title}</h1>
                                <p className="wrap-proj desktophide">
                                    {paragraph && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: paragraph.replace(/\n/g),
                                            }}
                                        ></span>
                                    )}
                                </p>
                                <p className="wrap-proj mobilehide">
                                    {paragraph && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: paragraph.replace(/\n/g, "<br />"),
                                            }}
                                        ></span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="container wrap-news-sec-2">
                        <div className="row grid-data-mobile">
                            {
                                cocurricularActivities?.images && cocurricularActivities?.images.length > 0 && cocurricularActivities?.images.slice(0, 4).map(img => {
                                    return (
                                        <div key={img?.id} className="col-lg-6 mobile-overlap">
                                            <div className="card wrap-sust-proj">
                                                <img src={`${siteUrl}${img?.image?.data?.attributes?.url}`} className="wrap-img-proj" alt="..." />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className="col-lg-6">
                                <div className="card wrap-sust-proj">
                                    <img src={image_1} className="wrap-img-proj" alt="..." />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card wrap-sust-proj">
                                    <img src={image_2} className="wrap-img-proj" alt="..." />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card wrap-sust-proj">
                                    <img src={image_3} className="wrap-img-proj" alt="..." />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card wrap-sust-proj">
                                    <img src={image_4} className="wrap-img-proj" alt="..." />
                                </div>
                            </div> */}
                        </div>
                    </section>
                    {console.log('gg', images, cocurricularActivities?.images)}
                    {console.log('ggg', images)}
                    {
                        images && images?.length > 0 && (
                            <section className="wrap-state-se1">
                                <div className="image-gallery">
                                    {
                                        images?.length > 1 && (
                                            <div className="arrow-ssa left-arrow" onClick={goToPrevious}>
                                                &larr;
                                            </div>
                                        )
                                    }
                                    <img
                                        src={`${siteUrl}${images[currentImage]?.image?.data?.attributes?.url}`}
                                        alt="Gallery Image"
                                        className="life-at-ssa"
                                    />
                                    {
                                        images.length > 1 && (
                                            <div className="arrow-ssa right-arrow" onClick={goToNext}>
                                                &rarr;
                                            </div>
                                        )
                                    }
                                </div>
                            </section>
                        )
                    }
                </div>
                <Footer />
            </Fragment>
        </>
    );
};

export default Co_curricular_Activities;
