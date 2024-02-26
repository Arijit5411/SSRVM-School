import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/srijani-enewsletters?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data.data.attributes.Pages,
            newsletter: data1,
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
const SrijaniENewsletter = ({ seodata, newsletter,siteUrl }) => {
    const [newsletters, setNewsletters] = useState([]);
   
    useEffect(() => {
       
        if (newsletter && newsletter?.data && newsletter?.data?.length > 0) {
            setNewsletters(newsletter?.data)
        }
    }, []);

  
    return (
        <>
                <Seo SeoData={seodata} PageSlug={"enewsletter"} />

            <Fragment>
                <NavBar siteUrl={siteUrl}/>
                <div className="top-section1-new">
                    <div className="container">
                        <h1 className="principal-mess">ENewsletter </h1>
                    </div>
                    <section className="container newsletter">
                        <div className="row">
                            {newsletters.map((newsletter) => (
                                <div className="col-lg-6" key={newsletter.id}>
                                    <div className="eNews-item">
                                        <a href={`${siteUrl}${newsletter.attributes.pdf?.data?.attributes?.url}`} download>
                                            {console.log("path", newsletter.attributes.pdf?.data?.attributes?.url)}
                                            <h5 className="news_mob">{newsletter.attributes.title}</h5>
                                        </a>
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

export default SrijaniENewsletter;
