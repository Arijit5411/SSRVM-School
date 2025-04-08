import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Head from 'next/head';
// import Seo from './Seo';


import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/safety-assurances`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            safety: data1,
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

const Safety_Assuarance = ({ seodata, safety ,siteUrl}) => {
   

    const [safetyAssuarance, setSafetyAssuarance] = useState({
        content: "",
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/safety-assurances`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setSafetyAssuarance(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (safety && safety?.data && safety?.data?.length > 0) {
            setSafetyAssuarance(safety?.data[0].attributes)
        }
    }, []);

   
    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"safety-assurance"} />

                <NavBar siteUrl={siteUrl}/>
               

                <div className='top-section1'>
                    <div className="container">
                        <h1 className="principal-mess">Safety Assurance</h1>
                        
                        
                    </div>

                    <div className='generic-text-box'>
                        <div dangerouslySetInnerHTML={{ __html: safetyAssuarance.content }} />
                    </div>

                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
}

export default Safety_Assuarance;