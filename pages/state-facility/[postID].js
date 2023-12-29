import React, { Fragment, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import { determineStrapiUrl } from "@/utils/strapiUtils";

// import { useParams } from 'react-router-dom';
import { useRouter } from "next/router";

const State_Facility = () => {
  const router = useRouter();
  const [stateFacility, setStateFacility] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { postID } = useParams();
  const { postID } = router.query;
  const homeUrl = router.pathname === '/' ? '/' : `/${router.pathname}`;
  const siteUrl = determineStrapiUrl(homeUrl);
 
  useEffect(() => {
    if (postID) {
      fetch(`${siteUrl}/api/features/${postID}?populate=*`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error:", data.error.message);
          } else {
            setStateFacility(data.data.attributes);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [postID]);

  useEffect(() => {
    if (postID) {
      fetch(`${siteUrl}/api/features/${postID}?populate[Content][populate]=*`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error:", data.error.message);
          } else {
            setContentData(data.data.attributes.Content);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [postID]);

  return (
    <>
      <Fragment>
        <NavBar siteUrl={siteUrl}/>
        <div className="top-section1-new1 feature-inner">
          {loading ? (
            <p>Loading post...</p>
          ) : (
            <div>
              <section>
                <div className="container ">
                  <div className="wrap-state">
                    <h1>{stateFacility?.heading}</h1>
                    <p>{stateFacility?.sub_heading}</p>
                  </div>
                  <div className="feature-contet-list">
                    {contentData &&
                      contentData.map((content, index) => {
                        const dataImage =
                          content.Content_Image?.data?.attributes?.url;

                        return (
                          <div className="row gy-4 gy-md-5 mb-3 mb-md-5" key={index}>
                            {content.Content && (
                              <div
                                className={dataImage ? "col-lg-6" : "col-lg-12"}
                              >
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
          )}
        </div>
        <Footer siteUrl={siteUrl}/>
      </Fragment>
    </>
  );
};

export default State_Facility;
