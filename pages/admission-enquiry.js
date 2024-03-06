import AdmissionEnquiry from '@/components/AdmissionEnquiry';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Seo from '@/components/Seo';
import { determineStrapiUrl } from '@/utils/strapiUtils';
import React, { useState } from 'react'
export const getServerSideProps = async (context) => {
    try {
      const siteUrl = determineStrapiUrl(context);
      const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);

  
      const data = await res.json()
  
      return {
          props: {
              seodata: data?.data?.attributes?.Pages ?? {},
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
    const [showPopup1, setShowPopup1] = useState(true);
    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
      };
    
  return (
    <div>
                  <Seo SeoData={seodata} PageSlug={"admission-enquiry"} />

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