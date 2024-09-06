import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import RecentPostsSidebar from "@/components/RecentPostsSidebar";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import RecentSidebar from "@/components/RecentSidebar";

export const getServerSideProps = async (context) => {

  try {
    const siteUrl = determineStrapiUrl(context);
    const { slug } = context.params;

    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
    const res2 = await fetch(`${siteUrl}/api/blogs?filters[slug][$ne]=${slug}&populate=*`);

    const data = await res.json();
    const data1 = await res1.json();
    const data2 = await res2.json();

    return {
      props: {
        seodata: data?.data?.attributes?.Pages ?? {},
        blogdata: data1.data[0],
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
const BackToBlog = ({ seodata, blogdata, relData, siteUrl, slug }) => {
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
    <Seo SeoData={seodata} PageSlug={"blog"} InnerPageSlug={slug} />
      <NavBar siteUrl={siteUrl} />
      <div className="top-section4 desktophide">
        <section className="wrap-item-blog-se1 first-section position-relative">
          <div className="container">
            <div className="row">
              <div className="col-content">
                <a className="backto-btn" href="/blog">
                  <img
                    src={publicUrl + "/assets/img/blog/13-arrow-left.png"}
                    alt="Transpro"
                  />
                  <span>Back to Blog</span>
                </a>
              </div>
              <div className="row">
                <div className="blog-post">
                  <img
                    src={`${siteUrl}${blogdata.attributes?.image?.data?.attributes?.url}`}
                    alt={blogdata.attributes?.Title}
                  />
                  <h1 className="wrap-text-inner">
                    {blogdata.attributes?.Title}
                  </h1>
                  <div className="blog-parg-item">
                    <ReactMarkdown components={components}>
                      {blogdata.attributes?.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
              <RecentSidebar Page="Blog" PageSlug="blog" RelData={relData} Slug={slug} siteUrl={siteUrl} Title="Title" />
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
                  <a className="backto-btn" href="/blog">
                    <img
                      src={publicUrl + "/assets/img/blog/13-arrow-left.png"}
                      alt="Transpro"
                    />
                    <span>Back to Blog</span>
                  </a>

                  <RecentSidebar Page="Blog" PageSlug="blog" RelData={relData} Slug={slug} siteUrl={siteUrl} Title="Title"/>
                </div>
              </div>
              <div className="col-lg-9 col-2">
                <div className="blog-post">
                  <img
                    src={`${siteUrl}${blogdata.attributes?.image?.data?.attributes?.url}`}
                    alt={blogdata.attributes?.Title}
                  />
                  <h1 className="wrap-text-inner">
                    {blogdata.attributes?.Title}
                  </h1>
                  <div className="blog-parg-item">
                    <ReactMarkdown components={components}>
                      {blogdata.attributes?.content}
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

export default BackToBlog;
