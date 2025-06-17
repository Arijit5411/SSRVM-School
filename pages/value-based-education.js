import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
import Image from "next/image";
// import Seo from './Seo';



const GlobalSiteUrl = process.env.GSURL

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);

    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${GlobalSiteUrl}/api/value-based-educations?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            value: data1,
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
const ValueBasedEducation = ({ seodata, value,siteUrl }) => {
    const [valueData, setValueData] = useState(null);
    const [loading, setLoading] = useState(true);
   

   

    useEffect(() => {
        // fetch(`${GlobalSiteUrl}/api/value-based-educations?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setValueData(data.data[0].attributes);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //         setLoading(false);
        //     });
        if (value && value?.data && value?.data?.length > 0) {
            setValueData(value?.data[0]?.attributes);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <>
               <Seo SeoData={seodata} PageSlug={"value-based-education"} />

            <Fragment>
                <NavBar siteUrl={siteUrl}/>

               

                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (

                    <section className="top-section18-new">
                        <section className="container ">
                            <div className="">
                                    <div className="">
                                        <h1 className="principal-mess value_mob">{valueData.heading}</h1>
                                    </div>
                            </div>
                            <Image width={1296} height={1003}
                                src={`${GlobalSiteUrl}${valueData?.image?.data?.attributes?.url}`}
                                className='imgWidth' />
                        </section>

                    </section>

                )}
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
}

export default ValueBasedEducation;