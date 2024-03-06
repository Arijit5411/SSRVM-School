import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';


import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/annual-reports?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            annualData: data1,
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


const AnnualReports = ({ seodata, annualData,siteUrl }) => {
    const [annualReports, setAnnualReports] = useState([]);
   
    useEffect(() => {
        
        if (annualData && annualData?.data) {
            setAnnualReports(annualData?.data)
        }
    }, [siteUrl]);

   
    return (
        
        <Fragment>
              <Seo SeoData={seodata} PageSlug={"annual-reports"} />

            <NavBar siteUrl={siteUrl}/>
           

            <div className="top-section1-new">
                <div className="container">
                    <h1 className="principal-mess">Annual Reports</h1>
                </div>
                <section className="container marginTopHeader">
                    <div className="row">
                        {annualReports.map((newsletter) => (
                            <div
                                className="col-lg-6 wrap-syllabus annual"
                                key={newsletter.id}
                            >
                                <div className="syl-item reports">
                                    <h4>{newsletter.attributes.title}</h4>
                                    <a
                                        href={`${siteUrl}${newsletter.attributes.pdf?.data?.attributes?.url}`}
                                        download
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer siteUrl={siteUrl}/>
        </Fragment>
    );
};

export default AnnualReports;
