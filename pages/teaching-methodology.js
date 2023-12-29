import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';




const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
  const res = await fetch(`${siteUrl}/api/seos`);
  const res1 = await fetch(
    `${GlobalSiteUrl}/api/teaching-methodologies?populate=*`
  );

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data,
      teaching: data1,
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


const TeachingMethodology = ({ seodata, teaching ,siteUrl}) => {
  const [teachingData, setTeachingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('API response data:', data); // Log the API response data
    //         if (data && data.data && data.data.length > 0) {
    //             const seoAttributes = data.data[0].attributes; // Use index 0 to get the first SEO entry
    //             setSeoData({
    //                 title: seoAttributes.title || '',
    //                 metaTitle: seoAttributes.metaTitle || '',
    //                 metaDescription: seoAttributes.metaDescription || '',
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching SEO data:', error);
    //     });
    if (seodata && seodata?.data && seodata?.data?.length > 0) {
      const seoAttributes = seodata.data[1].attributes;
      setSeoData({
        title: seoAttributes.title || "",
        metaTitle: seoAttributes.metaTitle || "",
        metaDescription: seoAttributes.metaDescription || "",
      });
    }
  }, [siteUrl]); // Include siteUrl as a dependency

  useEffect(() => {
    // fetch(`${GlobalSiteUrl}/api/teaching-methodologies`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         if (data && data.data && data.data.length > 0) {
    //             setTeachingData(data.data[0].attributes);
    //         }
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching teaching methodology data:", error);
    //         setLoading(false);
    //     });
    if (teaching && teaching?.data && teaching?.data?.length > 0) {
      setTeachingData(teaching?.data[0]?.attributes);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [GlobalSiteUrl]);
  console.log("data", teachingData);

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
        <div className="gap-5 shardha-training">
          <div className="w-100 mt-5">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <h2 className="wrap-training-teach">
                  {teachingData ? teachingData.title : "No Title Available"}
                </h2>
                <p className="fs-4">
                  {teachingData ? teachingData.content : "No Content Available"}
                </p>
              </>
            )}
          </div>
          <div className="w-100 mt-5">
            <div>
                <img
                  className="rounded-3"
                  src={
                    GlobalSiteUrl +
                    teachingData?.Content_Image?.data?.attributes?.url
                  }
                ></img>
            </div>
          </div>
        </div>

        <Footer siteUrl={siteUrl}/>
      </Fragment>
    </>
  );
};

export default TeachingMethodology;
