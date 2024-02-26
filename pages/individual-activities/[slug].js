import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Video from "@/components/Video";
import Slider from "react-slick";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Link from "next/link";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const data = await res.json();
    const { slug } = context.params;
    const res1 = await fetch(
      `${siteUrl}/api/activities/${slug}?populate=*&populate=image_gallery.image_gal&populate=video_link`
    );
    
    const res2 = await fetch(
      `${siteUrl}/api/activities/${parseInt(slug) + 1}?populate=*`
    );
    const data1 = await res1.json();
    const data2 = await res2.json();

    return {
      props: {
        data1,
        seodata: data.data.attributes.Pages,
        data2,
        siteUrl,
        slug
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

const SportsAndArts = ({ siteUrl, data1, data2,seodata,slug }) => {
  const navigateToNextPost = () => {
    const nextPostID = parseInt(postID) + 1;

    window.location.href = `/individual-activities/${nextPostID}`;
  };



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(data1);
  return (
    <>
        <Seo SeoData={seodata} PageSlug={"individual-activities"} InnerPageSlug={slug} />
      <NavBar siteUrl={siteUrl} />
      <div className="top-section15-new">
        {(data1.data.attributes.title || data1.data.attributes.description) &&
          <div className="container">
            <h1 className="principal-mess wrap-sports-arts sport_mob lineHight">
              {data1.data.attributes.title}
            </h1>
            <p className="sportp">{data1.data.attributes.description}</p>
          </div>
        }

        <>

          {(data1.data.attributes.image_gallery.length > 0) &&
            <section className="container">
              <h4 className="heading_down_sports marginTop50">Images</h4>
              <div className="row">
                <div className="d-none d-md-flex gap-4">
                  <div className="row g-4 w-100">
                    {data1.data.attributes.image_gallery.map(
                        (imageItem, index) => (
                          <div className="col-lg-4" key={index}>
                            <img
                              src={
                                siteUrl +
                                imageItem.image_gal?.data?.attributes?.url
                              }
                              alt={`Image ${index}`}
                              className="image_box_sports h-100"
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="d-md-none px-3 mb-5">
                  <div className="row w-100">
                    <Slider {...settings}>
                      {data1.data.attributes.image_gallery.map(
                          (imageItem, index) => (
                            <div className="col" key={index}>
                              <img
                                src={
                                  siteUrl +
                                  imageItem.image_gal?.data?.attributes?.url
                                }
                                alt={`Image ${index}`}
                                className="image_box_sports mb-1"
                              />
                            </div>
                          )
                        )}
                    </Slider>
                  </div>
                </div>
              </div>
            </section>
          }

          <div className="py-lg-4"></div>

          {(data1.data.attributes.video_link.length > 0) &&
            <section className="container">
              <h4 className="heading_down_sports marginTop50">Videos</h4>
              <div className="row">
                <div className="d-none d-md-flex gap-4">
                  <div className="row w-100">
                    {data1.data.attributes.video_link.map((videoItem, index) => (
                        <div className="col-lg-4" key={index}>
                          {videoItem.video ? (
                            <Video videoUrl={videoItem.video} />
                          ) : (
                            <p>No video link available</p>
                          )}
                          <h4 className="fs-20 mt-3">Video to watch</h4>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="d-md-none px-3 mb-5">
                  <Slider {...settings}>
                    {data1.data.attributes.video_link.map((videoItem, index) => (
                        <div className="col-lg-4" key={index}>
                          {videoItem.video ? (
                            <Video videoUrl={videoItem.video} />
                          ) : (
                            <p>No video link available</p>
                          )}
                          <h4 className="fs-20 mt-3">Video to watch</h4>
                        </div>
                      ))
                    }
                  </Slider>
                </div>
              </div>
            </section>
          }

          <section className="py-5">
            <div className="container">
              <div>
                <Link href="/our-hub-of-activities" className="fs-20 fw-600">
                  &#x2190; Back to Hub of Activities{" "}
                </Link>
              </div>
              <div>
                {data2?.data?.attributes?.nextPostID && (
                  <Link href="#" onClick={navigateToNextPost}>
                    {" "}
                    Next Page &#x2192;{" "}
                  </Link>
                )}
              </div>
            </div>
            <div className="pb-3"></div>
          </section>
        </>
      </div>
      <Footer siteUrl={siteUrl} />
    </>
  );
};

export default SportsAndArts;
