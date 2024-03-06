import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RequestTransferCertificate from "../components/RequestTransferCertificate";
import DownloadTransferCertificate from "../components/DownloadTransferCertificate";
import Head from "next/head";
// import Seo from './Seo';



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

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

const TransferCertificate = ({ seodata ,siteUrl}) => {
    

   

    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"transfer-certificate"} />
                <NavBar siteUrl={siteUrl}/>
                <div className="top-section1">
                    <div className="container">
                        <h1 className="principal-mess">Transfer Certificate</h1>
                    </div>
                </div>
                <section>
                    <div className="container mb-60 marginTopHeader">
                        <Tabs defaultActiveKey="Downloadnow" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="Downloadnow" title="Download Now">
                                <DownloadTransferCertificate siteUrl={siteUrl}/>
                            </Tab>

                            <Tab eventKey="RequestCertificate" title="Request Certificate">
                                <RequestTransferCertificate siteUrl={siteUrl}/>
                            </Tab>
                        </Tabs>
                    </div>
                </section>

                {/*
    </div> */}

                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default TransferCertificate;