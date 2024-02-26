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
    const res1 = await fetch(`${siteUrl}/api/committee-members?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data.data.attributes.Pages,
            commitee_Data: data1,
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

const CommitteeMembers = ({ seodata, commitee_Data ,siteUrl}) => {
    const [committeeMembers, setCommitteeMembers] = useState([]);
    const [loading, setLoading] = useState(true);
  

    
    useEffect(() => {
        
       
        if (commitee_Data && commitee_Data?.data?.length > 0) {
            setCommitteeMembers(commitee_Data?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, []);

    return (
        <Fragment>
               <Seo SeoData={seodata} PageSlug={"committee-members"} />

            <NavBar siteUrl={siteUrl}/>

            <div className="top-section1-new">
                <div className="container">
                    <h1 className="principal-mess">Committee Members</h1>
                </div>
                <section className="container marginTopHeader">
                    {loading ? (
                        <div className="loader">Loading...</div>
                    ) : (
                        <div className="row g-4">
                            {committeeMembers.map((member) => (
                                <div className="col-lg-6" key={member.id}>
                                    <div className="wrap-item-member">
                                        <div className="wrap-image">
                                            <img
                                                src={`${siteUrl}${member.attributes.image.data.attributes.url}`}
                                                alt="Transpro"
                                                className="member-img"
                                            />
                                        </div>
                                        <div className="wrap-text">
                                            <h6>{member.attributes.designation}</h6>
                                            <p>{member.attributes.full_name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <Footer siteUrl={siteUrl}/>
        </Fragment>
    );
};

export default CommitteeMembers;
