import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context); 
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
  
    const res1 = await fetch(`${siteUrl}/api/co-curricular-activities-pages?populate[images][populate]=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data.data.attributes.Pages,
            activities: data1,
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

const Co_curricular_Activities = ({ seodata, activities,siteUrl }) => {
    const [cocurricularActivities, setCocurricularActivities] = useState(null);
   

    useEffect(() => {
        
        if (activities && activities?.data && activities?.data?.length > 0) {
            setCocurricularActivities(activities?.data[0].attributes)
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
            <Seo SeoData={seodata} PageSlug={"curricular-activities"} />

                <NavBar siteUrl={siteUrl}/>

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
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default Co_curricular_Activities;
