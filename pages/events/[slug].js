import React, { Fragment, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RecentEventsSidebar from "@/components/RecentEventsSidebar";
import ReactMarkdown from "react-markdown";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import RecentSidebar from "@/components/RecentSidebar";


export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const { slug } = context.params;

    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/event-pages?filters[slug][$eq]=${slug}&populate=*`);
    const res2 = await fetch(`${siteUrl}/api/event-pages?filters[slug][$ne]=${slug}&populate=*`);

    const data = await res.json();
    const data1 = await res1.json();
    const data2 = await res2.json();

    return {
      props: {
        seodata: data?.data?.attributes?.Pages ?? {},
        eventData: data1.data[0].attributes,
        relData: data2.data,
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
const IndividualEventPage = ({ seodata, eventData, relData, siteUrl, slug }) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState();
  const [publicUrl, setPublicUrl] = useState();

  useEffect(() => {
    if (eventData) {
      setEvents(eventData);
    }
  }, [eventData]);

  useEffect(() => {
    setPublicUrl(window.location.origin)
  }, [publicUrl]);

  // setLoading(false);

  // const router = useRouter();
  // const { postID } = router.query;

  // const isProduction = process.env.NODE_ENV === "production";

  // const siteUrl = isProduction
  //     ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
  //     : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  // useEffect(() => {
  //     if (postID) {
  //         fetch(`${siteUrl}/api/event-pages/${postID}?populate=*`)
  //             .then((response) => response.json())
  //             .then((data) => {
  //                 if (data.error) {
  //                     console.error("Error:", data.error.message);
  //                 } else {
  //                     setEvents(data.data.attributes); // Access the attributes directly
  //                 }
  //             })
  //             .catch((error) => {
  //                 console.error("Error:", error);
  //             })
  //             .finally(() => {
  //                 setLoading(false);
  //             });
  //     }
  // }, [postID]);

  const components = {
    img: ({ src, alt }) => {
      return <img src={`${siteUrl}${src}`} alt={alt} />;
    },
  };

  return (
    <>
      <Seo SeoData={seodata} PageSlug={"events"} InnerPageSlug={slug} />

      <NavBar siteUrl={siteUrl} />
      <div className="top-section4-new desktophide">
        <section className="wrap-item-blog-se1 first-section position-relative">
          <div className="container">
            <div className="row gx-5 blog-inn-row">
              <div className="col-content">
                <a className="backto-btn" href="/events">
                  <img
                    src={
                      publicUrl +
                      "/assets/img/blog/13-arrow-left.png"
                    }
                    alt="Transpro"
                  />
                  <span>Back to Events</span>
                </a>
              </div>

              <div className="col-lg-12">
                {loading ? (
                  <p>Loading Events post...</p>
                ) : (
                  <div className="blog-post">
                    <img
                      src={`${siteUrl}${events?.image?.data?.attributes?.url}`}
                      alt={events?.title}
                      className="widthEventImg"
                    />
                    <h1 className="wrap-text-inner">{events?.title}</h1>
                    <div className="blog-parg-item">
                      <ReactMarkdown components={components}>
                        {events?.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
              <div className="container">
                <RecentSidebar Page="Event" PageSlug="events" RelData={relData} Slug={slug} siteUrl={siteUrl} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="top-section4 mobilehide d-none d-sm-block">
        <section className="wrap-item-blog-se1 first-section position-relative">
          <div className="container">
            <div className="row gx-5 blog-inn-row">
              <div className="col-lg-3 col-1">
                {/* Sidebar content */}
                <div className="col-content">
                  <a className="backto-btn" href="/events">
                    <img
                      src={
                        publicUrl +
                        "/assets/img/blog/13-arrow-left.png"
                      }
                      alt="Transpro"
                    />
                    <span>Back to Events</span>
                  </a>

                  <RecentSidebar Page="Event" PageSlug="events" RelData={relData} Slug={slug} siteUrl={siteUrl} />
                </div>
              </div>
              <div className="col-lg-9 col-2">
                {loading ? (
                  <p>Loading Events post...</p>
                ) : (
                  <div className="blog-post">
                    <img
                      src={`${siteUrl}${events?.image?.data?.attributes?.url}`}
                      alt={events?.Title}
                      className="widthEventImg"
                    />
                    <h1 className="wrap-text-inner">{events?.title}</h1>
                    <div className="blog-parg-item">
                      <ReactMarkdown components={components}>
                        {events?.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer siteUrl={siteUrl} />
    </>
  );
};

export default IndividualEventPage;
