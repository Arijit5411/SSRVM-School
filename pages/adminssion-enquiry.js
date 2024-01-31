import AdmissionEnquiry from '@/components/AdmissionEnquiry';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { determineStrapiUrl } from '@/utils/strapiUtils';
import Head from 'next/head';
import React, { useState } from 'react'

export const getServerSideProps = async (context) => {
    try {
      const siteUrl = determineStrapiUrl(context);
      const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
  
      const data = await res.json()
  
      return {
          props: {
              seodata: data,
              siteUrl
          }
      }
  } catch (error) {
      console.error("Error fetching data:", error.message);
  
      return {
        props: {
          data: [],
        },
      };
    }
  };
  
 const AdminssionEnquiry = ({seodata, siteUrl }) => {
    console.log("Admission enq",siteUrl);
    const [showPopup1, setShowPopup1] = useState(true);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
      };
      const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    
  return (
    <div>
          <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <NavBar siteUrl={siteUrl}/>
            <div className="top-section1-new">
                <div className="container">
                    <h1 className="principal-mess">Admission Enquiry</h1>
                </div>
                <section className="container marginTopHeader">
                {showPopup1 && <AdmissionEnquiry siteUrl={siteUrl} onClose={togglePopup1} />}   
                </section>
            </div>
       
        <Footer siteUrl={siteUrl}/>
    </div>
  )
}

export default AdminssionEnquiry