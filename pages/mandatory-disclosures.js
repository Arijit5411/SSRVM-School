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
    const res1 = await fetch(`${siteUrl}/api/generic-text-pages`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data.data.attributes.Pages,
            generic: data1,
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

const Mandatory_Disclosures = ({ seodata, generic,siteUrl }) => {
    const [genericTextPage, setGenericTextPage] = useState(null);
   

    useEffect(() => {
        // fetch(`${siteUrl}/api/generic-text-pages`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setGenericTextPage(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (generic && generic?.data && generic?.data?.length > 0) {
            setGenericTextPage(generic?.data[0].attributes)
        }
    }, []);

    
    const pageTitle = `${genericTextPage?.page_title}`;
    const para1 = `${genericTextPage?.paragraph_1}`;
    const para2 = `${genericTextPage?.paragraph_2}`;
    const para3 = `${genericTextPage?.paragraph_3}`;

    // console.log("paragraph_1",para1)

    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"mandatory-disclosures"} />

                <NavBar siteUrl={siteUrl}/>

              
                <div className="top-section1">
                    <div className="container">
                        <h1 className="principal-mess">Mandatory Disclosures</h1>
                    </div>

                    <div className="generic-text-box">
                        <div>
                            <p>{para1}</p>
                            <p>{para2}</p>
                            <p> {para3}</p>
                        </div>
                    </div>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default Mandatory_Disclosures;
