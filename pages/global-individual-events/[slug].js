import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import GlobalRecentEvents from "@/components/GlobalRecentEvents";
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import RecentSidebar from "@/components/RecentSidebar";
import Image from "next/image";


const GlobalSiteUrl = process.env.GSURL

export const getServerSideProps = async (context) => {
  try {

    const siteUrl = determineStrapiUrl(context);
    const { slug } = context.query;

    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${GlobalSiteUrl}/api/global-events?filters[slug][$eq]=${slug}&sort=id:desc&populate=*`);
    const res2 = await fetch(`${GlobalSiteUrl}/api/global-events?filters[slug][$ne]=${slug}&sort=id:desc&populate=*`);

    const data = await res.json();
    const data1 = await res1.json();
    const data2 = await res2.json();


    return {
      props: {
        siteUrl,
        seodata: data?.data?.attributes?.Pages ?? {},
        events: data1?.data[0]?.attributes ?? {},
        recentEvents: data2?.data ?? {},
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
const GlobalIndividualEvents = ({ siteUrl, seodata, events, recentEvents, slug }) => {

  const [publicUrl, setPublicUrl] = useState();
  const components = {
    img: ({ src, alt }) => {
      return <img src={`${GlobalSiteUrl}${src}`} alt={alt} />;
    },
  };
  useEffect(() => {
    setPublicUrl(window.location.origin)
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
                <div className="blog-post">
                  {events?.image?.data?.attributes?.url &&
                    <Image width={366} height={244}
                      src={`${GlobalSiteUrl}${events?.image?.data?.attributes?.url}`}
                      alt={events?.Title}
                      className="widthEventImg"
                    />
                  }
                  <h1 className="wrap-text-inner">{events?.title}</h1>
                  <div className="blog-parg-item">
                    <ReactMarkdown components={components}>
                      {events?.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
              <div className="container">
                {/* <RecentSidebar Page="Events" PageSlug="global-individual-events" RelData={relData} Slug={slug} siteUrl={siteUrl} /> */}
                <RecentSidebar Page="Event" PageSlug="global-individual-events" RelData={recentEvents} Slug={slug} siteUrl={siteUrl} Title="title" />
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
                  {/* <RecentSidebar Page="Events" PageSlug="global-individual-events" RelData={relData} Slug={slug} siteUrl={siteUrl} /> */}
                  <RecentSidebar Page="Event" PageSlug="global-individual-events" RelData={recentEvents} Slug={slug} siteUrl={siteUrl} Title="title" />
                </div>
              </div>
              <div className="col-lg-9 col-2">
                <div className="blog-post">
                  <Image width={960} height={640}
                    src={`${GlobalSiteUrl}${events?.image?.data?.attributes?.url}`}
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
