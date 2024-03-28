import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from "./Seo";


const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);
        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${GlobalSiteUrl}/api/pedagogies`)

        const data = await res.json()
        const data1 = await res1.json()

        return {
            props: {
                seodata: data?.data?.attributes?.Pages ?? {},
                pedagogy: data1,
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



const Our_Pedagogy = ({ seodata, pedagogy, siteUrl }) => {
    const [activeOption, setActiveOption] = useState();

    // const [accordionData, setAccordionData] = useState([]);

    useEffect(() => {

        if (pedagogy.data.length > 0 && !activeOption) {
            setActiveOption(pedagogy.data[0].attributes.heading);
        }
    }, [pedagogy, activeOption]);

    return (
        <>
            <Fragment>
                <Seo SeoData={seodata} PageSlug={"our-pedagogy"} />

                <NavBar siteUrl={siteUrl} />


                <div className="mobilehide-pedalogy">
                    <div className="wrapper">
                        <section className="section p-0 position-relative">
                            <div className="container position-relative zi-9">
                                <div className="row g-0">
                                    <div className="col-lg-6 position-relative zi-9 pe-5" style={{ minHeight: '100vh', padding: '120px 0 60px 0' }}>
                                        <div className="position-absolute h-100 end-0 top-0 bg-white" style={{ width: '50vw', backgroundColor: "#F6F2F3" }}></div>
                                        <h3 className="mb-5 position-relative zi-9">Our Pedagogy</h3>
                                        <div className="accordion-wrap position-relative zi-9">
                                            {pedagogy.data.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`acc-main ${activeOption === item.attributes.heading
                                                        ? "show"
                                                        : "true"
                                                        }`}
                                                    onClick={() =>
                                                        setActiveOption(item.attributes.heading)
                                                    }
                                                >
                                                    <div className="acc-title-wrap">
                                                        <div className="acc-num-wrap">
                                                            <h4 className="acc-num">{item.attributes.number}</h4>
                                                        </div>
                                                        <h3 className="acc-title">
                                                            {item.attributes.heading}
                                                        </h3>
                                                    </div>
                                                    <div className="accordion-content">
                                                        <h5>{item.attributes.subheading}</h5>
                                                        <p>{item.attributes.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">

                                    </div>
                                </div>
                            </div>


                            <div>
                                {activeOption && (
                                    <iframe
                                        title="YouTube Video"
                                        width="100%"
                                        height="100%"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        src={pedagogy.data.find(
                                            (item) => item.attributes.heading === activeOption
                                        )?.attributes.video}
                                        frameborder="0"
                                        allowfullscreen=""
                                        className="position-absolute top-0"
                                        style={{
                                            right: "-150px",
                                            width: "100vw",
                                        }}
                                    ></iframe>
                                )}
                            </div>

                        </section>
                    </div>
                </div>
                <div className="desktophide">
                    <div className="wrapper">
                        <section
                            className="section position-relative"
                            style={{ backgroundColor: "#F6F2F3", paddingBottom: "120px" }}
                        >
                            <div className="container">
                                <h3>Our Pedagogy</h3>
                                <div className="row g-5">
                                    <div className="accordion-wrap">
                                        {pedagogy.data.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`acc-main ${activeOption === item.attributes.heading ? "show" : "true"
                                                    }`}
                                                onClick={() => setActiveOption(item.attributes.heading)}
                                            >
                                                <div className="acc-title-wrap">
                                                    <div className="acc-num-wrap">
                                                        <h4 className="acc-num">{item.attributes.number}</h4>
                                                    </div>
                                                    <h3 className="acc-title">{item.attributes.heading}</h3>
                                                </div>
                                                <div className="accordion-content">
                                                    <h5>{item.attributes.subheading}</h5>
                                                    <p>{item.attributes.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    {activeOption && (
                                        <iframe
                                            title="YouTube Video"
                                            width="100%"
                                            height="100%"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            src={pedagogy.data.find(
                                                (item) => item.attributes.heading === activeOption
                                            )?.attributes.video}
                                            frameborder="0"
                                            allowfullscreen=""
                                            style={{
                                                top: "0",
                                                right: "0",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        ></iframe>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>



                {/* The rest of your component */}
                <section>
                    <div className="container mt-5 mb-5">
                        <h2 className="peda-title">BROADEN THE VISION</h2>
                        <img
                            className="w-100"
                            src="assets/img/service/1-pedagogy-tree.jpg"
                            alt=""
                        />
                        <h2 className="peda-title">DEEPEN THE ROOTS</h2>
                    </div>
                </section>
                <Footer siteUrl={siteUrl} />
            </Fragment>
        </>
    );
};

export default Our_Pedagogy;