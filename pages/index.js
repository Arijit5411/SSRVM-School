import React, { Fragment, Suspense, useState, useEffect } from "react";
import Preloader from "../elements/Preloader";
import BannerSliderOne from "../components/BannerSliderOne";
import Seo from "@/components/Seo";
// import Seo from './Seo';
const BannerSlider = React.lazy(() => import("../components/BannerSlider"));
const Footer = React.lazy(() => import("../components/Footer"));
const HomeAbout = React.lazy(() => import("../components/HomeAbout"));
const NavBar = React.lazy(() => import("../components/NavBar"));
const ImpAnmnt = React.lazy(() => import("../components/ImpAnmnt"));
const VideoAreaOne = React.lazy(() => import("../components/Video"));


const Home = () => {

  const [seoData, setSeoData] = useState({
    title: '',
    metaTitle: '',
    metaDescription: '',
  });

  const isProduction = process.env.NODE_ENV === 'production';

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    // Fetch SEO data from your API
    fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log('API response data:', data); // Log the API response data
        if (data && data.data && data.data.length > 0) {
          const seoAttributes = data.data[36].attributes;
          setSeoData({
            title: seoAttributes.title || '',
            metaTitle: seoAttributes.metaTitle || '',
            metaDescription: seoAttributes.metaDescription || '',
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching SEO data:', error);
      });
  }, []);

  return (
    <>
        {/* {seoData && (
          <Seo
            title={seoData.title}
            metaTitle={seoData.metaTitle}
            metaDescription={seoData.metaDescription}
          />
        )} */}
        <Suspense fallback={<Preloader />}>
          <NavBar />

          <BannerSliderOne />
          <ImpAnmnt />
          <HomeAbout />
          <Footer />
        </Suspense>
    </>
  );
};

export default Home;