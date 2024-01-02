import React  from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const { postID } = context.params;

    const res1 = await fetch(`${siteUrl}/api/features/${postID}?populate=*`);
    const res2 = await fetch(
      `${siteUrl}/api/features/${postID}?populate[Content][populate]=*`
    );
    const data1 = await res1.json();
    const data2 = await res2.json();

    return {
      props: {
        data1,
        data2,
        siteUrl,
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

const State_Facility = ({ data1, data2, siteUrl }) => {
  return (
    <>
      <NavBar siteUrl={siteUrl} />
      <div className="top-section1-new1 feature-inner">
        <div>
          <section>
            <div className="container ">
              <div className="wrap-state">
                <h1>{data1.data.attributes?.heading}</h1>
                <p>{data1.data.attributes?.sub_heading}</p>
              </div>
              <div className="feature-contet-list">
                {data2.data.attributes.Content &&
                  data2.data.attributes.Content?.map((content, index) => {
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
