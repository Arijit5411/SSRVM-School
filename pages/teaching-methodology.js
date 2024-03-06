import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';




const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
  const res1 = await fetch(
    `${GlobalSiteUrl}/api/teaching-methodologies?populate=*`
  );

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data?.data?.attributes?.Pages ?? {},
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
          <Seo SeoData={seodata} PageSlug={"teaching-methodology"} />

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
