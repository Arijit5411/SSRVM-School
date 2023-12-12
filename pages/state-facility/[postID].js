import React, { Fragment, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";

// import { useParams } from 'react-router-dom';
import { useRouter } from "next/router";

const State_Facility = () => {
  const router = useRouter();
  const [stateFacility, setStateFacility] = useState(null);
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { postID } = useParams();
  const { postID } = router.query;

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

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
        <NavBar />
        <div className="top-section1-new1" style={{marginTop:'160px'}}>
          {loading ? (
            <p>Loading post...</p>
          ) : (
            <div>
              {/* <section className="wrap-state-se1">
                <div className="container">
                  <div className="row wrap-top-section">
                    <div className="col-lg-6">
                      <div className="wrap-state">
                        <h1>{stateFacility?.heading}</h1>
                        <p>{stateFacility?.sub_heading}</p>
                      </div>
                      <p>
                        {stateFacility?.left_content && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: stateFacility?.left_content.replace(
                                /\n/g,
                                "<br />"
                              ),
                            }}
                          ></span>
                        )}
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <div className="wrap-state-fact">
                        <img
                          src={`${siteUrl}${stateFacility?.image_top?.data?.attributes?.url}`}
                          alt={stateFacility?.Title}
                          className="wrap-fact-item"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}

              {/* <section className="wrap-state-se3">
                <div className="container">
                  <div className="row mt-3 mb-5">
                    <div className="col-lg-6">
                      <div className="wrap-state-fact1">
                        <img
                          src={`${siteUrl}${stateFacility?.image_bottom?.data?.attributes?.url}`}
                          alt={stateFacility?.Title}
                          className="wrap-fact-item1"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <p>
                        {stateFacility?.right_content && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                stateFacility?.right_content.replace(/\n/g),
                            }}
                          ></span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </section> */}

              <section>
                <div className="container ">
                  <div className="feature-contet-list">
                    {contentData &&
                      contentData.map((content, index) => {
                        const dataImage =
                          content.Content_Image?.data?.attributes?.url;

                        return (
                          <div className="row g-3 mt-5 " key={index}>
                            {content.Content && (
                              <div
                                className={dataImage ? "col-lg-6 mt-5 p-3" : "col-lg-12 mt-5 p-3"}
                              >
                                <ReactMarkdown>{content.Content}</ReactMarkdown>
                              </div>
                            )}
                            {dataImage && (
                              <div
                                className={
                                  content.Content ? "col-lg-6 mt-5 p-3"  : "col-lg-12 mt-5 p-3"
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
        <Footer />
      </Fragment>
    </>
  );
};

export default State_Facility;
