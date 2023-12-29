import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from "./Seo";


const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${GlobalSiteUrl}/api/pedagogies`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
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

const Our_Pedagogy = ({ seodata, pedagogy,siteUrl }) => {
    const [activeOption, setActiveOption] = useState(null);
    const [seoData, setSeoData] = useState({
        title: "",
        metaTitle: "",
        metaDescription: "",
    });
    const [accordionData, setAccordionData] = useState([]);


    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("API response data:", data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[7].attributes;
        //             setSeoData({
        //                 title: seoAttributes.title || "",
        //                 metaTitle: seoAttributes.metaTitle || "",
        //                 metaDescription: seoAttributes.metaDescription || "",
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching SEO data:", error);
        //     });
        if (seodata && seodata?.data && seodata?.data?.length > 0) {
            const seoAttributes = seodata.data[7].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }

        // Fetch accordion data from your API
        // fetch(`${GlobalSiteUrl}/api/pedagogies`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("Accordion API response data:", data);
        //         setAccordionData(data.data || []);
        //         // Set the active option to the heading of the first item
        //         if (data.data.length > 0) {
        //             setActiveOption(data.data[0].attributes.heading);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching accordion data:", error);
        //     });

        if (pedagogy && pedagogy?.data && pedagogy?.data?.length > 0) {
            setAccordionData(pedagogy.data || []);
            setActiveOption(pedagogy.data[0].attributes.heading);
        }
    }, []);

    return (
        <>
            <Fragment>
                <Head>
                    <title>{seoData.title}</title>
                    {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                    {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
                </Head>
                <NavBar siteUrl={siteUrl}/>

                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <section className="mobilehide">
                    <div class="wrapper">
                        <section
                            class="section start-padding position-relative"
                            style={{ backgroundColor: "#F6F2F3", paddingBottom: "120px" }}
                        >
                            <div class="container">
                                <h3>Our Pedagogy</h3>
                                <div class="row g-5">
                                    <div
                                        class="col-lg-6 position-relative zi-9"
                                        style={{ height: "100vh" }}
                                    >
                                        <div class="accordion-wrap">
                                            {accordionData.map((item) => (
                                                <div
                                                    key={item.id}
                                                    class={`acc-main ${activeOption === item.attributes.heading
                                                        ? "show"
                                                        : "true"
                                                        }`}
                                                    onClick={() =>
                                                        setActiveOption(item.attributes.heading)
                                                    }
                                                >
                                                    <div class="acc-title-wrap">
                                                        <div class="acc-num-wrap">
                                                            <h4 class="acc-num">{item.attributes.number}</h4>
                                                        </div>
                                                        <h3 class="acc-title">
                                                            {item.attributes.heading}
                                                        </h3>
                                                    </div>
                                                    <div class="accordion-content">
                                                        <h5>{item.attributes.subheading}</h5>
                                                        <p>{item.attributes.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div>
                                            {activeOption && (
                                                <iframe
                                                    title="YouTube Video"
                                                    width="100%"
                                                    height="100%"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    src={accordionData.find(
                                                        (item) => item.attributes.heading === activeOption
                                                    )?.attributes.video}
                                                    frameborder="0"
                                                    allowfullscreen=""
                                                    style={{
                                                        position: "absolute",
                                                        top: "0",
                                                        right: "0",
                                                        width: "50vw",
                                                        height: "100%",
                                                    }}
                                                ></iframe>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
                <section className="desktophide">
                    <div class="wrapper">
                        <section
                            class="section position-relative"
                            style={{ backgroundColor: "#F6F2F3", paddingBottom: "120px" }}
                        >
                            <div class="container">
                                <h3>Our Pedagogy</h3>
                                <div class="row g-5">
                                    <div class="accordion-wrap">
                                        {accordionData.map((item) => (
                                            <div
                                                key={item.id}
                                                class={`acc-main ${activeOption === item.attributes.heading ? "show" : "true"
                                                    }`}
                                                onClick={() => setActiveOption(item.attributes.heading)}
                                            >
                                                <div class="acc-title-wrap">
                                                    <div class="acc-num-wrap">
                                                        <h4 class="acc-num">{item.attributes.number}</h4>
                                                    </div>
                                                    <h3 class="acc-title">{item.attributes.heading}</h3>
                                                </div>
                                                <div class="accordion-content">
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
                                            src={accordionData.find(
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
                </section>



                {/* The rest of your component */}
                <section>
                    <div className="container mt-5 mb-5">
                        <h2 className="peda-title">BROADEN THE VISION</h2>
                        <img
                            class="w-100"
                            src="assets/img/service/1-pedagogy-tree.jpg"
                            alt=""
                        />
                        <h2 className="peda-title">DEEPEN THE ROOTS</h2>
                    </div>
                </section>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default Our_Pedagogy;