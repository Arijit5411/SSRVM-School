import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import RecentPostsSidebar from "@/components/RecentPostsSidebar";

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const { postID } = context.params;
    const res1 = await fetch(`${siteUrl}/api/blogs/${postID}?populate=*`);
    const data1 = await res1.json();

    return {
      props: {
        data1,
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
const BackToBlog = ({ siteUrl, data1 }) => {
  const [publicUrl, setPublicUrl] = useState();
  const components = {
    img: ({ src, alt }) => {
      return <img src={`${siteUrl}${src}`} alt={alt} />;
    },
  };

  useEffect(() => {
    setPublicUrl(window.location.origin);
  }, [publicUrl]);

  console.log(data1);
  return (
    <>
      <NavBar siteUrl={siteUrl} />
      <div className="top-section4 desktophide">
        <section className="wrap-item-blog-se1 first-section position-relative">
          <div className="container">
            <div className="row">
              <div className="col-content">
                <a className="backto-btn" href="/blogs">
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
                    src={`${siteUrl}${data1.data.attributes?.image?.data?.attributes?.url}`}
                    alt={data1.data.attributes?.Title}
                  />
                  <h1 className="wrap-text-inner">
                    {data1.data.attributes?.Title}
                  </h1>
                  <p className="blog-parg-item">
                    <ReactMarkdown components={components}>
                      {data1.data.attributes?.content}
                    </ReactMarkdown>
                  </p>
                </div>
              </div>
              <RecentPostsSidebar siteUrl={siteUrl} />
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
                  <a className="backto-btn" href="/blogs">
                    <img
                      src={publicUrl + "/assets/img/blog/13-arrow-left.png"}
                      alt="Transpro"
                    />
                    <span>Back to Blog</span>
                  </a>

                  <RecentPostsSidebar siteUrl={siteUrl} />
                </div>
              </div>
              <div className="col-lg-9 col-2">
                <div className="blog-post">
                  <img
                    src={`${siteUrl}${data1.data.attributes?.image?.data?.attributes?.url}`}
                    alt={data1.data.attributes?.Title}
                  />
                  <h1 className="wrap-text-inner">
                    {data1.data.attributes?.Title}
                  </h1>
                  <p className="blog-parg-item">
                    <ReactMarkdown components={components}>
                      {data1.data.attributes?.content}
                    </ReactMarkdown>
                  </p>
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
