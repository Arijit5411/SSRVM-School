import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Seo from './Seo';
import Head from "next/head";

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
  ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
  : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";

export const getStaticProps = async () => {
  const res = await fetch(`${siteUrl}/api/seos`);
  const res1 = await fetch(
    `${GlobalSiteUrl}/api/shraddha-trainings?populate=*`
  );

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data,
      shraddha: data1,
    },
  };
};

const ShraddhaTraining = ({ seodata, shraddha }) => {
  const [shardhaData, setShardhaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('API response data:', data); // Log the API response data
    //     if (data && data.data && data.data.length > 0) {
    //       const seoAttributes = data.data[11].attributes;
    //       setSeoData({
    //         title: seoAttributes.title || '',
    //         metaTitle: seoAttributes.metaTitle || '',
    //         metaDescription: seoAttributes.metaDescription || '',
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching SEO data:', error);
    //   });
    if (seodata && seodata?.data && seodata?.data?.length > 0) {
      const seoAttributes = seodata.data[11].attributes;
      setSeoData({
        title: seoAttributes.title || "",
        metaTitle: seoAttributes.metaTitle || "",
        metaDescription: seoAttributes.metaDescription || "",
      });
    }
  }, []);

  useEffect(() => {
    // fetch(`${GlobalSiteUrl}/api/shraddha-trainings?populate=*`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setShardhaData(data.data[0].attributes);
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //         setLoading(false);
    //     });
    if (shraddha && shraddha?.data && shraddha?.data?.length > 0) {
      setShardhaData(shraddha?.data[0]?.attributes);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
        {seoData.metaTitle && (
          <meta name="description" content={seoData.metaDescription} />
        )}
      </Head>
      <Fragment>
        <NavBar />

        {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <section>
            <div className="gap-5 shardha-training">
              <div className="w-100 mt-5">
                <div>
                   <h2 className="wrap-training-teach">
                  {shardhaData ? shardhaData.title : "No Title Available"}
                </h2>
                  <div className="fontSize22">
                    {shardhaData?.content && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: shardhaData?.content.replace(/\n/g, "<br />"),
                        }}
                      ></span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-100 mt-5">
                <div>
                 
                    <img
                      className="rounded-3 w-100"
                      src={
                        GlobalSiteUrl +
                        shardhaData.Shardha_Image.data.attributes.url
                      }
                    ></img>
                  
                </div>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </Fragment>
    </>
  );
};

export default ShraddhaTraining;
