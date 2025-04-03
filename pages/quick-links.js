import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import Head from "next/head";


import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/quick-links`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            links: data1,
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

const QuickLinks = ({ seodata, links,siteUrl }) => {
    const [quickLinks, setQuickLinks] = useState([]);
   



    useEffect(() => {
        // fetch(`${siteUrl}/api/quick-links`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setQuickLinks(data.data);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (links && links?.data) {
            setQuickLinks(links?.data)
        }
    }, []);

   

    return (
        <>
               <Seo SeoData={seodata} PageSlug={"quick-links"} />

            <Fragment>
                <NavBar siteUrl={siteUrl}/>
                

                <div className='' style={{ padding: '160px 0 60px 0' }}>
                    <div className="container">
                        <h1 className="principal-mess">Quick Links</h1>
                    </div>
                    <section className="container wrap-item-news">
                        <div className="row">
                            {quickLinks.map((link) => (
                                <div className="col-lg-6 newsletter" key={link.id}>
                                    <div className="eNews-item">
                                        <Link href={link?.attributes?.link ?? ''}>
                                            <h4>{link.attributes.title}</h4>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default QuickLinks;
