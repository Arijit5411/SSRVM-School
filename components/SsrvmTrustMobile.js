import Image from "next/image";
import React, { Fragment, useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

const SsrvmTrustMobile = () => {
    const [art, setArt] = useState({});
    const [institutes, setInstitutes] = useState([]);
    const [country, setCountry] = useState([]);

    const GlobalSiteUrl = process.env.GSURL

    useEffect(() => {
        fetch(`${GlobalSiteUrl}/api/ssrvm-trusts?populate=*`)
            .then((response) => response.json())
            .then((data) => {
                setArt(data.data[0]?.attributes || {});
                setInstitutes(data.data[0]?.attributes.institute || []);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        fetch(`${GlobalSiteUrl}/api/ssrvm-trusts?populate=country.country_flag`)
            .then((response) => response.json())
            .then((data) => {
                setCountry(data.data[0]?.attributes.country || []);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <section className="">
                <div>
                    <div className="founderPadding">
                        <div className="">
                            <h2 className="trust-size">
                                {art.top_heading && (
                                    <span
                                        dangerouslySetInnerHTML={{ __html: art.top_heading.replace(/\n/g, "<br />") }}
                                    ></span>
                                )}
                            </h2>
                        </div>
                        <div className="">
                            <p>
                                <ReactMarkdown>
                                    {art.top_content}
                                </ReactMarkdown>
                            </p>
                        </div>
                    </div>
                </div>
                <Image width={390} height={215}
                    className="imgwidthfull"
                    src="/assets/img/4b-Trust/1-hero-desktop.jpg"
                    alt="Founder img"
                />
            </section>

            <section className="mobilepadding">
                <div className="founderPa">
                    <h2 className="textcolr">{art.bottom_heading}</h2>
                    <p className="founderWhite">
                        {art.bottom_content}
                    </p>
                    <div>
                        <div>
                            <h3 className="textcolr">{art.institute_across}</h3>
                        </div>

                        <div className="displayFlex">
                            {country.map((countryItem, index) => (
                                <div key={index}>
                                    <div className="mob-country-flag">
                                        <img
                                            className="Country_flag"
                                            src={`${GlobalSiteUrl}${countryItem.country_flag?.data?.attributes?.url}`}
                                            alt={`${countryItem.country_name} flag`}
                                        />
                                        
                                    </div>
                                    <p className="onam_logo_heading">{countryItem.country_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="">
                        <div>
                            <h2 className="textcolr">
                                {art.total_student} <span className="studentSize">Students</span>
                            </h2>
                        </div>

                        <div className="">
                            <div className="institute-pair-container">
                                {institutes.map((institute, index) => (
                                    <div key={index} className="number_image_ssrvm">
                                        <h3 className="numbers_imageside">{institute.number}</h3>
                                        <span className="institutions_name_ssvrm">
                                            {institute.institute_name.split('\n').map((line, index) => (
                                                <Fragment key={index}>
                                                    {line}
                                                    <br />
                                                </Fragment>
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <img
                                    src="assets/img/4b-Trust/2-trust-pic.png"
                                    alt="flag_image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="below_section_trustpage_mobile">
                    <div className="footertext">
                        <h4 className="">
                            Looking for an SSRVM Institute near you?
                        </h4>
                        <span className="">
                            <button className="below_section_button">
                                Find Institute
                            </button>
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SsrvmTrustMobile;
