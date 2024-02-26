import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import Seo from './Seo';

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);

    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);

  const res1 = await fetch(
    `${siteUrl}/api/life-at-ssas?populate[images][populate]=*`
  );

  const res2 = await fetch(
    `${siteUrl}/api/life-at-ssas?populate[videos][populate]=*`
  );

  const data = await res.json();
  const data1 = await res1.json();
  const data2 = await res2.json();


  return {
    props: {
      seodata: data.data.attributes.Pages,
      lifeatssa: data1,
      videolist: data2,
      siteUrl
    },
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

const LifeAtSriAcademy = ({ seodata, lifeatssa,videolist,siteUrl }) => {
  const [lifeAtSriAcademy, setLifeAtSriAcademy] = useState(null);
  const [videolistData, setvideolistData] = useState(null);

  

  useEffect(() => {
    // fetch(`${siteUrl}/api/life-at-ssas?populate=*`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setLifeAtSriAcademy(data.data[0].attributes);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });
    if (lifeatssa && lifeatssa?.data && lifeatssa?.data?.length > 0) {
      setLifeAtSriAcademy(lifeatssa?.data[0].attributes);
    }

    if (videolist && videolist?.data && videolist?.data?.length > 0) {
        setvideolistData(videolist?.data[0].attributes);
      }
  }, []);

  

  const page_title = `${lifeAtSriAcademy?.page_title}`;
  const paragraph_1 = `${lifeAtSriAcademy?.paragraph_1}`;

  const image_1 = `${siteUrl}${lifeAtSriAcademy?.image_1?.data?.attributes?.url}`;
  const image_2 = `${siteUrl}${lifeAtSriAcademy?.image_2?.data?.attributes?.url}`;
  const image_3 = `${siteUrl}${lifeAtSriAcademy?.image_3?.data?.attributes?.url}`;
  const image_4 = `${siteUrl}${lifeAtSriAcademy?.image_4?.data?.attributes?.url}`;

  const video_url = `${lifeAtSriAcademy?.video_url}`;

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
  const images = lifeAtSriAcademy?.images;

  const videosdata = videolistData?.videos;


  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return <FaArrowLeft className={className} onClick={onClick} />;
  };

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return <FaArrowRight className={className} onClick={onClick} />;
  };
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Fragment>
      <Seo SeoData={seodata} PageSlug={"life-at-ssa"} />

        <NavBar siteUrl={siteUrl}/>

        <div className="top-section1-new">
          <section className="wrap-state-se1">
            <div className="container">
              <div className="row wrap-top-section">
                <div className="col-lg-6">
                  <div className="wrap-state">
                    <h1>
                      {page_title && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: page_title.replace(/\n/g, "<br />"),
                          }}
                        ></span>
                      )}
                    </h1>
                    <p>
                      {paragraph_1 && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: paragraph_1.replace(/\n/g),
                          }}
                        ></span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="wrap-state-fact">
                    <Slider {...sliderSettings}>
                      {videosdata &&
                        videosdata?.length > 0 &&
                        videosdata.map((item) => {
                          return (
                            <iframe
                              width="100%"
                             
                              src={item.youtube_video_url}
                              title="YouTube video player"
                              frameborder="0"
                            //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowfullscreen
                              className="life-at-video "
                            ></iframe>
                          );
                        })}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="wrap-state-se1">
            <div className="feature-slider owl-carousel p-2 m-1">
              {console.log("gg", images)}
              <Slider {...sliderSettings}>
                {images &&
                  images?.length > 0 &&
                  images.map((img) => {
                    return (
                      <img
                        key={img?.id}
                        src={`${siteUrl}${img?.image?.data?.attributes?.url}`}
                        alt="Gallery Image"
                        className="life-at-ssa"
                      />
                    );
                  })}
              </Slider>
            </div>
          </section>
          {/* <section className="wrap-state-se1">
                        <div className="image-gallery ">
                            <div className="arrow-ssa left-arrow" onClick={goToPrevious}>
                                &larr;
                            </div>
                            {
                                images && images?.length > 0 && (
                                    <img
                                        src={`${siteUrl}${images[currentImage]?.image?.data?.attributes?.url}`}
                                        alt="Gallery Image"
                                        className="life-at-ssa"
                                    />
                                )
                            }
                            <div className="arrow-ssa right-arrow" onClick={goToNext}>
                                &rarr;
                            </div>
                        </div>
                    </section> */}
        </div>

        <Footer siteUrl={siteUrl}/>
      </Fragment>
    </>
  );
};

export default LifeAtSriAcademy;
