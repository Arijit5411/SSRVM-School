import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelopeOpen } from "react-icons/fa";

const ContactAddress = () => {
    const [contactData, setContactData] = useState(null);

    const isProduction = process.env.NODE_ENV === 'production';

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    useEffect(() => {
        fetch(`${siteUrl}/api/contact-us-locations?populate=*`)
            .then((response) => response.json())
            .then((data) => setContactData(data.data[0]))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleGetDirections = () => {
        if (contactData && contactData.attributes.direction_link) {
            window.open(contactData.attributes.direction_link, '_blank');
        }
    };

    return (
        <>
            <section className="first-sec-contact_us">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <h3 className="ssrvm_head_mob">
                                {contactData ? contactData.attributes.school_name : "Loading..."}
                            </h3>
                            <p>
                                {contactData ? contactData.attributes.school_address : "Loading..."}
                            </p>
                            <button className="button_class mob" onClick={handleGetDirections}>
                                Get Directions
                            </button>
                            <div>
                                <div className="single-contact-inner social-share">
                                    <div className="details">
                                        <p className="phone_no-contact">
                                            <FaPhoneAlt className="fColor marginright mob_logo" />
                                            {contactData ? contactData.attributes.contact_no : "Loading..."}
                                        </p>
                                    </div>
                                </div>
                                <div className="single-contact-inner social-share">
                                    <div className="details">
                                        <p className="phone_no-contact">
                                            <FaEnvelopeOpen className="fColor marginright mob_logo" />
                                            {contactData ? contactData.attributes.email_id : "Loading..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Social media links */}
                            <ul className="social-share social_mob">
                                <li>
                                    <a href={contactData ? contactData.attributes.fb_link : "Loading..."} target="_blank">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={contactData ? contactData.attributes.insta_link : "Loading..."} target="_blank">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={contactData ? contactData.attributes.twitter_link : "Loading..."} target="_blank">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={contactData ? contactData.attributes.linkedin_link : "Loading..."} target="_blank">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={contactData ? contactData.attributes.youtube_link : "Loading..."} target="_blank">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-7">
                            {/* Google Maps iframe */}
                            {contactData && contactData.attributes.direction_link && (
                                <div>
                                    <h3 className="how_to_reach_mob">How to reach</h3>
                                    <iframe
                                        src={contactData.attributes.direction_link}
                                        width="100%"
                                        height="300"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactAddress;
