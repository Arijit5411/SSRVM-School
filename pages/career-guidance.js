import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import Image from "next/image";

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);
        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${siteUrl}/api/career-guidance-pages?populate=*`)

        const data = await res.json()
        const data1 = await res1.json()

        return {
            props: {
                seodata: data?.data?.attributes?.Pages ?? {},
                careerGuide: data1,
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


const CareerGuidance = ({ seodata, careerGuide, siteUrl }) => {
    const [careerGuidance, setCareerGuidance] = useState(null);



    useEffect(() => {

        if (careerGuide && careerGuide?.data) {
            setCareerGuidance(careerGuide?.data[0]?.attributes)
        }
    }, []);



    const imageUrl = `${siteUrl}${careerGuidance?.image?.data?.attributes?.url}`;
    const page_title = `${careerGuidance?.page_title}`;
    const paragraph_1 = `${careerGuidance?.paragraph_1}`;
    const paragraph_2 = `${careerGuidance?.paragraph_2}`;
    const paragraph_3 = `${careerGuidance?.paragraph_3}`;
    const paragraph_4 = `${careerGuidance?.paragraph_4}`;

    return (
        <>
            <Seo SeoData={seodata} PageSlug={"career-guidance"} />
            <Fragment>
                <NavBar siteUrl={siteUrl}/>
                <div className='top-pl-css'>
                    <div className="container">
                        <h1 className="principal-mess mob_head linehightdesktop">{page_title}</h1>
                    </div>
                    <section>
                        <div className="container">
                            <div className="upper_section_career">
                                <p className="para_career_mob">
                                    {paragraph_1}
                                    <br></br>
                                    <br></br>
                                    {paragraph_2}
                                </p>
                                <Image width={679} height={416} src={imageUrl} className="career_image" alt="career_img" />
                            </div>
                            <div className="bottom_para_career">
                                <p className="para_career_mob">{paragraph_3}</p>
                                <p className="para_career_mob"> {paragraph_4}</p>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer siteUrl={siteUrl} />
            </Fragment>
        </>
    );
};

export default CareerGuidance;
