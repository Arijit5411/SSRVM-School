import React, { useState, useEffect } from "react";
import BannerSliderOne from "../components/BannerSliderOne";
import Footer from "../components/Footer";
import HomeAbout from "../components/HomeAbout";
import NavBar from "../components/NavBar";
import ImpAnmnt from "../components/ImpAnmnt";
import Head from "next/head";
import MandatoryDisclosure from "@/components/MandatoryDisclosure";
import { determineStrapiUrl } from "@/utils/strapiUtils";

import Script from 'next/script';

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res2 = await fetch(`${siteUrl}/api/home?populate=*`);

    const data = await res.json();
    const data2 = await res2.json();

    return {
      props: {
        seodata: data,
        homeSettings: data2.data,
        siteUrl
      }
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

const Home = ({ seodata, homeSettings, siteUrl }) => {

  const [seoData, setSeoData] = useState({
    title: '',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('API response data:', data); // Log the API response data
    //     if (data && data.data && data.data.length > 0) {
    //       const seoAttributes = data.data[36].attributes;
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
      const seoAttributes = seodata.data[36].attributes;
      setSeoData({
        title: seoAttributes.title || '',
        metaTitle: seoAttributes.metaTitle || '',
        metaDescription: seoAttributes.metaDescription || '',
      })
    }
  }, []);

  return (
    <>
      {console.log(seoData)}
      <Head>
        <title>{seoData.title}</title>
        {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
        {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
      </Head>
      {/* {seoData && (
        <Seo
          title={seoData.title}
          metaTitle={seoData.metaTitle}
          metaDescription={seoData.metaDescription}
        />
      )} */}
      {/* <Suspense fallback={<Preloader />}> */}
      {/* <ImportantAnnouncment /> */}


      <NavBar siteUrl={siteUrl} />
      <BannerSliderOne siteUrl={siteUrl} />
      <MandatoryDisclosure siteUrl={siteUrl} />
      <ImpAnmnt siteUrl={siteUrl} />
      <HomeAbout siteUrl={siteUrl} homeSettings={homeSettings} />
      <Footer siteUrl={siteUrl} />
      {/* </Suspense> */}
    </>
  );
};

export default Home;