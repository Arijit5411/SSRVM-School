import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SsrvmTrust from "../components/SsrvmTrust";
import SsrvmTrustMobile from "../components/SsrvmTrustMobile";
import Head from "next/head";


const GlobalSiteUrl = process.env.GSURL

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);
        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${GlobalSiteUrl}/api/founder-pages?populate=*`)
        const res2 = await fetch(`${GlobalSiteUrl}/api/art-of-living-foundations?populate=*`)

        const data = await res.json()
        const data1 = await res1.json()
        const data2 = await res2.json()

        return {
            props: {
                seodata: data?.data?.attributes?.Pages ?? {},
                founderprop: data1,
                foundation: data2,
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

const FounderTrust = ({ seodata, founderprop, foundation, siteUrl }) => {
    const [founder, setFounder] = useState(null);
    const [foundationData, setFoundationData] = useState(null);

    useEffect(() => {
        // fetch(`${GlobalSiteUrl}/api/founder-pages?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setFounder(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });

        // fetch(`${GlobalSiteUrl}/api/art-of-living-foundations?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setFoundationData(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (founderprop && founderprop?.data && founderprop?.data?.length > 0) {
            setFounder(founderprop?.data[0]?.attributes)
        }
        if (foundation && foundation?.data && foundation?.data?.length > 0) {
            setFoundationData(foundation?.data[0]?.attributes)
        }
    }, []);


    const logoUrl = `${GlobalSiteUrl}${foundationData?.logo_sun?.data?.attributes?.url}`;
    const videoUrl = `${foundationData?.video_link}`;
    const bottom_heading_gurudev = `${foundationData?.bottom_heading_gurudev}`;
    const short_description = `${foundationData?.short_description}`;
    const paragraph = `${foundationData?.paragraph}`;
    const tab_heading = `${foundationData?.tab_heading}`;
    const visit_website_button = `${foundationData?.visit_website_button}`;

    const tab_heading1 = `${founder?.tab_heading}`;
    const founded_heading = `${founder?.founded_heading}`;
    const gurudev_heading = `${founder?.gurudev_heading}`;
    const subheading_gurudev = `${founder?.subheading_gurudev}`;
    const short_block_name = `${founder?.short_block_name}`;
    const short_block = `${founder?.short_block}`;
    const descriptive_para1 = `${founder?.descriptive_para1}`;
    const descriptive_para3 = `${founder?.descriptive_para3}`;
    const descriptive_para2 = `${founder?.descriptive_para2}`;

    return (
        <>
            <Seo SeoData={seodata} PageSlug={"founder"} />

            <NavBar siteUrl={siteUrl} />

            {/* {seoData && (
        <Seo
          title={seoData.title}
          metaTitle={seoData.metaTitle}
          metaDescription={seoData.metaDescription}
        />
      )} */}

            <div className="top-section26-new desktophide">
                {/* service area end */}
                <div className="founder-top">
                    <div>
                        <Tabs
                            defaultActiveKey="Fonder"
                            id="uncontrolled-tab-example"
                            className="founder-tabs"
                            defaultChecked
                        >
                            <Tab eventKey="Fonder" title={tab_heading1}>
                                <div className="container">
                                    <div className="row justify-content-start">
                                        <div className="col-lg-5"></div>
                                        <div className="col-lg-6 remove-col-padding founder-main-img">
                                            <img
                                                src="assets/img/founder/1-gurudev-hero.jpg"
                                                alt="Founder img"
                                            />
                                            <div className="founder-mobile">
                                                <h4> {founded_heading}</h4>
                                                <h2>{gurudev_heading}</h2>
                                                <p>
                                                    {subheading_gurudev && (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: subheading_gurudev.replace(
                                                                    /\n/g,
                                                                    "<br />"
                                                                ),
                                                            }}
                                                        ></span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="education-card-mobile">
                                    <p>{short_block}</p>
                                    <p className="auther">{short_block_name}</p>
                                </div>

                                <div className="container margintop125">
                                    <p>{descriptive_para1}</p>
                                    <img
                                        src="assets/img/founder/3-guruji2.png"
                                        alt="Founder img"
                                    />

                                    <p className="top-found">{descriptive_para3}</p>
                                    <p>{descriptive_para2}</p>
                                </div>
                                <div></div>
                            </Tab>
                            <Tab eventKey="Trust" title="SSRVM Trust">
                                <SsrvmTrustMobile />
                            </Tab>
                            <Tab eventKey="Arts" title={tab_heading}>
                                <div className="desktophide">
                                    <section>
                                        <div>
                                            <div className="upper_section_alfSection">
                                                <div>
                                                    <img
                                                        src={logoUrl}
                                                        alt=" Description"
                                                        className="founderImg"
                                                    />
                                                </div>
                                                <div className="container">
                                                    <p>
                                                        {paragraph && (
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: paragraph.replace(/\n/g, "<br />"),
                                                                }}
                                                            ></span>
                                                        )}
                                                    </p>
                                                    <img
                                                        src="assets/img/4b-Trust/2-hero-mobile.png"
                                                        alt="flag_image"
                                                    />
                                                </div>
                                                <a href={visit_website_button} >
                                                    <button className="visit_website_alf_below">
                                                        Visit website

                                                    </button>
                                                </a>


                                            </div>
                                            {/* <div>
                      <img
                        src="assets/img/4c-AOL/2-hero-desktop.jpg"
                        alt=" Description"
                        className='className="art_of_living_foundation_imageOne"'
                      />
                    </div> */}
                                        </div>
                                    </section>

                                    <section className="container">
                                        <div className="wrap-arts">
                                            <div>
                                                <div>
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src={videoUrl}
                                                        title="YouTube video player"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowfullscreen
                                                    ></iframe>
                                                </div>
                                                <div className="text_onside_video">
                                                    <h2>{bottom_heading_gurudev}</h2>

                                                    <p>
                                                        {short_description && (
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: short_description.replace(
                                                                        /\n/g,
                                                                        "<br />"
                                                                    ),
                                                                }}
                                                            ></span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="mobilehide-founder">
                                    <section>
                                        <div>
                                            <div className="upper_section_alfSection">
                                                <div>
                                                    <img
                                                        src={logoUrl}
                                                        alt=" Description"
                                                        className='className="art_of_living_foundation_logo"'
                                                    />
                                                </div>
                                                <div className="para_with_image_art_of_living">
                                                    <p>
                                                        {paragraph && (
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: paragraph.replace(/\n/g, "<br />"),
                                                                }}
                                                            ></span>
                                                        )}
                                                    </p>
                                                </div>
                                                {/* <div className="button_visit_website_ALF">
                          <button className="visit_website_alf_below">
                            Vist website
                          </button>
                        </div> */}
                                            </div>
                                            <div>
                                                <img
                                                    src="assets/img/4c-AOL/2-hero-desktop.jpg"
                                                    alt=" Description"
                                                    className='className="art_of_living_foundation_imageOne"'
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="container">
                                        <div className="wrap-arts">
                                            <div>
                                                <div>
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src={videoUrl}
                                                        title="YouTube video player"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowfullscreen
                                                    ></iframe>
                                                </div>
                                                <div className="text_onside_video">
                                                    <h2>{bottom_heading_gurudev}</h2>

                                                    <p>
                                                        {short_description && (
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: short_description.replace(
                                                                        /\n/g,
                                                                        "<br />"
                                                                    ),
                                                                }}
                                                            ></span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <div className="top-section26 mobilehide-founder">
                {/* service area end */}
                <div className="founder-top">
                    <div>
                        <Tabs
                            defaultActiveKey="Fonder"
                            id="uncontrolled-tab-example"
                            className="founder-tabs"
                            defaultChecked
                        >
                            <Tab eventKey="Fonder" title={tab_heading1}>
                                <div className="">
                                    <div className="container">
                                        <div className="row justify-content-start">
                                            <div className="col-lg-5">
                                                <div className="founder-name">
                                                    <h4> {founded_heading}</h4>
                                                    <h2>{gurudev_heading && (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: gurudev_heading.replace(
                                                                    /\n/g,
                                                                    "<br />"
                                                                ),
                                                            }}
                                                        ></span>
                                                    )}</h2>

                                                    <p>
                                                        {subheading_gurudev && (
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: subheading_gurudev.replace(
                                                                        /\n/g,
                                                                        "<br />"
                                                                    ),
                                                                }}
                                                            ></span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 remove-col-padding founder-main-img">
                                                <img
                                                    src="assets/img/founder/1-gurudev-hero.jpg" className="founderimg"
                                                    alt="Founder img"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="education-card">
                                        <p>{short_block}</p>
                                        <p className="auther">{short_block_name}</p>
                                    </div>
                                </div>

                                <div className="container">
                                    <section className="founder-paragraph">
                                        <div className="paragraph1">
                                            <p>{descriptive_para1}</p>
                                            <p>{descriptive_para3}</p>
                                        </div>
                                        <div>
                                            <p>{descriptive_para2}</p>
                                            <div className="col-lg-12 wrap-founder-img">
                                                <img
                                                    src="assets/img/founder/3-guruji2.png"
                                                    alt="Founder img"
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </Tab>
                            <Tab eventKey="Trust" title="SSRVM Trust">
                                <SsrvmTrust />
                            </Tab>
                            <Tab eventKey="Arts" title={tab_heading}>
                                <section>
                                    <div>
                                        <div className="upper_section_alfSection">
                                            <div>
                                                <img
                                                    src={logoUrl}
                                                    alt=" Description"
                                                    className='className="art_of_living_foundation_logo"'
                                                />
                                            </div>
                                            <div className="para_with_image_art_of_living">
                                                <p>
                                                    {paragraph && (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: paragraph.replace(/\n/g, "<br />"),
                                                            }}
                                                        ></span>
                                                    )}
                                                </p>
                                                <a href={visit_website_button} className="founderbtn">Vist website</a>
                                            </div>
                                            <div className="button_visit_website_ALF">
                                                <button className="visit_website_alf_below">
                                                    Vist website545
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                src="assets/img/4c-AOL/2-hero-desktop.jpg"
                                                alt=" Description"
                                                className="deskTopImg"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="container">
                                    <div className="wrap-arts">
                                        <div>
                                            <div>
                                                <iframe
                                                    width="560"
                                                    height="315"
                                                    src={videoUrl}
                                                    title="YouTube video player"
                                                    frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowfullscreen
                                                ></iframe>
                                            </div>
                                            <div className="text_onside_video">
                                                <h2>{bottom_heading_gurudev}</h2>

                                                <p>
                                                    {short_description && (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: short_description.replace(
                                                                    /\n/g,
                                                                    "<br />"
                                                                ),
                                                            }}
                                                        ></span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer siteUrl={siteUrl} />
        </>
    );
};

export default FounderTrust;
