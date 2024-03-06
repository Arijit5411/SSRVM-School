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
    const res1 = await fetch(`${siteUrl}/api/policy-statements`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            policy: data1,
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

const Policy_Statements = ({ seodata, policy ,siteUrl}) => {
   
    const [policyStatements, setPolicyStatements] = useState({
        content: "",
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/policy-statements`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Assuming the API response structure matches your state structure
        //         setPolicyStatements(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (policy && policy?.data && policy?.data?.length > 0) {
            setPolicyStatements(policy?.data[0]?.attributes)
        }
    }, []);

   
    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"policy-statements"} />

                <NavBar siteUrl={siteUrl}/>
              
                <div className="top-section1 top-policy">
                    <div className="container">
                        <h1 className="principal-mess">Policy Statements</h1>
                    </div>

                    <div className="generic-text-box">
                        <span dangerouslySetInnerHTML={{ __html: policyStatements.content }} />
                    </div>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default Policy_Statements;
