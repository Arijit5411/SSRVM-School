import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import RecentNewsSidebar from "@/components/RecentNewsSidebar";
import NavBar from "@/components/NavBar";
import { determineStrapiUrl } from "@/utils/strapiUtils";
export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const { postID } = context.params;

    const res1 = await fetch(`${siteUrl}/api/newspages/${postID}?populate=*`);

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
const BackToNews = ({ data1, siteUrl }) => {
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
                <img
                  src={`${siteUrl}${data1?.data?.attributes?.image?.data?.attributes?.url}`}
                  alt={data1?.data?.attributes?.Title}
                />
                <h1 className="wrap-text-inner">
                  {data1.data.attributes?.title}
                </h1>
                <div className="blog-parg-item">
                  <ReactMarkdown components={components}>
                    {data1.data.attributes?.content}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="row">
                <RecentNewsSidebar siteUrl={siteUrl} />
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

                  <RecentNewsSidebar siteUrl={siteUrl} />
                </div>
              </div>
              <div className="col-lg-9 col-2">
                <div className="blog-post">
                  <img
                    src={`${siteUrl}${data1?.data?.attributes?.image?.data?.attributes?.url}`}
                    alt={data1.data.attributes?.Title}
                  />
                  <h1 className="wrap-text-inner">
                    {data1.data.attributes?.title}
                  </h1>
                  <div className="blog-parg-item">
                    <ReactMarkdown components={components}>
                      {data1.data.attributes?.content}
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
