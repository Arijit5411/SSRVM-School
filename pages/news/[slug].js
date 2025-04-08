import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import RecentNewsSidebar from "@/components/RecentNewsSidebar";
import NavBar from "@/components/NavBar";
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import RecentSidebar from "@/components/RecentSidebar";
import Image from "next/image";




export const getServerSideProps = async (context) => {

  try {
    const siteUrl = determineStrapiUrl(context);
    const { slug } = context.params;

    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/newspages?filters[slug][$eq]=${slug}&populate=*`);
    const res2 = await fetch(`${siteUrl}/api/newspages?filters[slug][$ne]=${slug}&populate=*`);


    const data = await res.json();
    const data1 = await res1.json();
    const data2 = await res2.json();

    return {
      props: {
        seodata: data?.data?.attributes?.Pages ?? {},
        newsdata: data1.data[0],
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
const BackToNews = ({ newsdata, siteUrl, seodata, slug, relData }) => {
  const [publicUrl, setPublicUrl] = useState();
  const components = {
    img: ({ src, alt }) => {
      return <img src={`${siteUrl}${src}`} alt={alt} />;
    },
  };
  useEffect(() => {
    setPublicUrl(window.location.origin);
  }, [publicUrl]);


  return (
    <>
      <Seo SeoData={seodata} PageSlug={"news"} InnerPageSlug={slug}/>
      <NavBar siteUrl={siteUrl} />
      <div className="top-section4-new desktophide">
        <section className="wrap-item-blog-se1 first-section position-relative">
          <div className="container">
            <div className="col-content">
              <a className="backto-btn" href="/news">
                <img
                  src={publicUrl + "/assets/img/blog/13-arrow-left.png"}
                  alt="Transpro"
                />
                <span>Back to News</span>
              </a>
            </div>
            <div className="row">
              <div className="blog-post">
                {newsdata?.attributes?.image?.data?.attributes?.url &&
                  <Image width={366} height={194}
                  src={siteUrl + newsdata?.attributes?.image?.data?.attributes?.url}
                alt={newsdata?.attributes?.Title}
                />
                }
                <h1 className="wrap-text-inner">
                  {newsdata?.attributes?.title}
                </h1>
                <div className="blog-parg-item">
                  <ReactMarkdown components={components}>
                    {newsdata?.attributes?.content}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="row">
                <RecentSidebar Page="News" PageSlug="news" RelData={relData} Slug={slug} siteUrl={siteUrl} />
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
                <div className="col-content">
                  <a className="backto-btn" href="/news">
                    <img
                      src={publicUrl + "/assets/img/blog/13-arrow-left.png"}
                      alt="Transpro"
                    />
                    <span>Back to News</span>
                  </a>
                  <RecentSidebar Page="News" PageSlug="news" RelData={relData} Slug={slug} siteUrl={siteUrl} />
                </div>
              </div>
              <div className="col-lg-9 col-2">
                <div className="blog-post">
                  <Image width={960} height={509}
                    src={`${siteUrl}${newsdata?.attributes?.image?.data?.attributes?.url}`}
                    alt={newsdata?.attributes?.title}
                  />
                  <h1 className="wrap-text-inner">
                    {newsdata?.attributes?.title}
                  </h1>
                  <div className="blog-parg-item">
                    <ReactMarkdown components={components}>
                      {newsdata?.attributes?.content}
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

export default BackToNews;
