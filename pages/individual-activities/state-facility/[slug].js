import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const { slug } = context.params;
    const res1 = await fetch(`${siteUrl}/api/features?filters[$and][0][id][$eq]=${slug}&populate[Content][populate]=*`)
    const data1 = await res1.json();
    const data = await res.json();
    return {
      props: {
        data1: data1.data,
        seodata: data?.data?.attributes?.Pages ?? {},
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

const State_Facility = ({ data1, siteUrl, seodata, slug }) => {
  console.log('slug', slug)
  console.log('data1', data1)

  console.log('Final DATA', data1.filter(facility => facility.id==slug))
  console.log('seodata', seodata)


  return (
    <>
      <Seo SeoData={seodata} PageSlug={"state-facility"} InnerPageSlug={slug} />
      <NavBar siteUrl={siteUrl} />
      <div className="top-section1-new1 feature-inner">
        <div>
          <section>
            <div className="container ">
              <div className="wrap-state">
                <h1>{data1[0]?.attributes?.heading}</h1>
                <p>{data1[0]?.attributes?.sub_heading}</p>
              </div>


              <div className="feature-contet-list">
                {data1[0].attributes?.Content &&
                  data1[0]?.attributes?.Content?.map((content, index) => {
                    const dataImage =
                      content.Content_Image?.data?.attributes?.url;

                    return (
                      <div
                        className="row gy-4 gy-md-5 mb-3 mb-md-5"
                        key={index}
                      >
                        {content.Content && (
                          <div className={dataImage ? "col-lg-6" : "col-lg-12"}>
                            <ReactMarkdown>{content.Content}</ReactMarkdown>
                          </div>
                        )}

                        {dataImage && (
                          <div
                            className={
                              content.Content ? "col-lg-6" : "col-lg-12"
                            }
                          >
                            <img
                              className="w-100 rounded-3"
                              src={siteUrl + dataImage}
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer siteUrl={siteUrl} />
    </>
  );
};

export default State_Facility;
