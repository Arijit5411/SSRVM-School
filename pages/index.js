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
import Seo from "@/components/Seo";
import HomeAutoPopup from "@/components/HomeAutoPopup";

export const getServerSideProps = async (context) => {
  const siteUrl = determineStrapiUrl(context);
  try {
 
    const res2 = await fetch(`${siteUrl}/api/home?populate=*`);
    const res3 = await fetch(`${siteUrl}/api/home-popup-slider?populate=*`);
    const res4 = await fetch(`${siteUrl}/api/seo?populate=deep, 10`);


    const data2 = await res2.json();
    const data3 = await res3.json();
    const data4 = await res4.json();

    return {
      props: {
        siteUrl,
        homeSettings: data2.data,
        homePopupSlider: data3.data,
        seodata: data4.data.attributes.Pages,
      }
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        data: [],
        siteUrl,
      },
    };
  }
};

const Home = ({ siteUrl, homeSettings, homePopupSlider, seodata }) => {

  console.log("data11", homePopupSlider)
  return (
    <>
      <Seo SeoData={seodata} PageSlug={"main-page"} />
      <NavBar siteUrl={siteUrl} />
      <HomeAutoPopup data={homePopupSlider} siteUrl={siteUrl} />
      <BannerSliderOne siteUrl={siteUrl} />
      <MandatoryDisclosure siteUrl={siteUrl} />
      <ImpAnmnt siteUrl={siteUrl} />
      <HomeAbout siteUrl={siteUrl} homeSettings={homeSettings} />
      <Footer siteUrl={siteUrl} />
    </>
  );
};

export default Home;
