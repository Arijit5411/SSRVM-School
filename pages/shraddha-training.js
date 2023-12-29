import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Seo from './Seo';
import Head from "next/head";


const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);

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
      siteUrl
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

const ShraddhaTraining = ({ seodata, shraddha,siteUrl }) => {
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
        <NavBar siteUrl={siteUrl}/>

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

        <Footer siteUrl={siteUrl}/>
      </Fragment>
    </>
  );
};

export default ShraddhaTraining;
