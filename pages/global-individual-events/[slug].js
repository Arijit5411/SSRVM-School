import React, {  useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import GlobalRecentEvents from "@/components/GlobalRecentEvents";
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";
export const getServerSideProps = async (context) => {
  try {
    const { slug } = context.params;

    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const data = await res.json();

    return {
      props: {
        siteUrl,
        seodata: data.data.attributes.Pages,
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

const GlobalIndividualEvents = ({ siteUrl,seodata }) => {
  const router = useRouter();
  const [events, setEvents] = useState(null);
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [publicUrl, setPublicUrl] = useState();

  useEffect(() => {
    if (slug) {
      fetch(`${GlobalSiteUrl}/api/global-events/${slug}?populate=*`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error:", data.error.message);
          } else {
            setEvents(data.data.attributes); // Access the attributes directly
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  const components = {
    img: ({ src, alt }) => {
      return <img src={`${GlobalSiteUrl}${src}`} alt={alt} />;
    },
  };
  useEffect(() => {
    setPublicUrl(window.location.origin);
  }, [publicUrl]);

  return (
    <>
        <Seo SeoData={seodata} PageSlug={"global-individual-events"} InnerPageSlug={slug} />

      <NavBar siteUrl={siteUrl} />
      <div className="top-section4-new desktophide">
        <section className="wrap-item-blog-se1 first-section position-relative">
          <div className="container">
            <div className="row gx-5 blog-inn-row">
              <div className="col-content">
                <a className="backto-btn" href="/global-events">
                  <img
                    src={publicUrl + "/assets/img/blog/13-arrow-left.png"}
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
                      src={`${GlobalSiteUrl}${events?.image?.data?.attributes?.url}`}
                      alt={events?.Title}
                      className="widthEventImg"
                    />
                    <h1 className="wrap-text-inner">{events?.title}</h1>
                    <p className="blog-parg-item">
                      <ReactMarkdown components={components}>
                        {events?.content}
                      </ReactMarkdown>
                    </p>
                  </div>
                )}
              </div>
              <div className="container">
                <GlobalRecentEvents siteUrl={siteUrl} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="top-section4 mobilehide">
        <section className="wrap-item-blog-se1 first-section position-relative">
          <div className="container">
            <div className="row gx-5 blog-inn-row">
              <div className="col-lg-3 col-1">
                {/* Sidebar content */}
                <div className="col-content">
                  <a className="backto-btn" href="/global-events">
                    <img
                      src={publicUrl + "/assets/img/blog/13-arrow-left.png"}
                      alt="Transpro"
                    />
                    <span>Back to Events</span>
                  </a>

                  <GlobalRecentEvents siteUrl={siteUrl} />
                </div>
              </div>
              <div className="col-lg-9 col-2">
                {loading ? (
                  <p>Loading Events post...</p>
                ) : (
                  <div className="blog-post">
                    <img
                      src={`${GlobalSiteUrl}${events?.image?.data?.attributes?.url}`}
                      alt={events?.Title}
                      className="widthEventImg"
                    />
                    <h1 className="wrap-text-inner">{events?.title}</h1>
                    <p className="blog-parg-item">
                      <ReactMarkdown components={components}>
                        {events?.content}
                      </ReactMarkdown>
                    </p>
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

export default GlobalIndividualEvents;
