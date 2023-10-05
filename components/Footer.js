import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaRegEnvelopeOpen,
  FaRegPaperPlane,
} from "react-icons/fa";
import Subscribe from "./Subscribe";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    // Make the API call when the component mounts
    fetch(`${siteUrl}/api/home-footers?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setFooterData(data.data[0]); // Assuming the first object in the array is the desired data
      })
      .catch((error) => {
        console.error("Error fetching footer data:", error);
      });
  }, []);

  return (
    <>
      {/* footer area start */}
      <footer className="footer-area-3">
        <Subscribe />
        {footerData && (
          <div>
            {/* Widget Area Starts */}
            <div className="footer-widget-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 tab-margin-bottom-30">
                    <div className="footer-widget widget about_us_widget">
                      <p>{footerData.attributes.ssrvm_head}</p>
                      <div className="widget widget_contact">
                        <div className="single-contact-inner">
                          <div className="details">
                            <p className="address">
                              {footerData.attributes.address}
                            </p>
                            {/* <p className="address">45206, United States</p> */}
                          </div>
                        </div>
                        <iframe
                          src={footerData.attributes.map_link}
                          width="600"
                          height="150"
                          allowfullscreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        <div className="">
                          <ul className="socialnetwork">
                            <li>
                              <a href="#" className="facebook">
                                {" "}
                                <FaFacebookF />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="twitter">
                                <FaTwitter />
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.youtube.com/channel/UCz1tS-oRzKeElBOd6pIjgLQ"
                                className="youtube"
                              >
                                <FaYoutube />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="instagram">
                                <FaInstagram />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="single-contact-inner">
                          <div className="details">
                            <p className="address">
                              <FaPhoneAlt className="fColor marginright" />
                              {footerData.attributes.phone_no}
                            </p>
                          </div>
                        </div>
                        <div className="single-contact-inner">
                          <div className="details">
                            <p className="address">
                              <FaEnvelopeOpen className="fColor marginright" />
                              {footerData.attributes.mail_adddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 offset-lg-1 tab-margin-bottom-30">
                    <div className="footer-widget widget widget_nav_menu">
                      <ul>
                        <li>
                          <a href="#">{footerData.attributes.key1}</a>
                        </li>
                        <li>
                          <a href="./admissions">
                            {footerData.attributes.key2}
                          </a>
                        </li>
                        <li>
                          <a href="#">{footerData.attributes.key3}</a>
                        </li>
                        <li>
                          <a href="#">{footerData.attributes.key4}</a>
                        </li>
                        <li>
                          <a href="#">{footerData.attributes.key5}</a>
                        </li>
                      </ul>
                      <hr className="new1"></hr>
                      <ul className="footerTopPadding">
                        <li>
                          <a href="#">{footerData.attributes.key6}</a>
                        </li>
                        <li>
                          <a href="./admissions">
                            {footerData.attributes.key7}
                          </a>
                        </li>
                        <li>
                          <a href="#">{footerData.attributes.key8}</a>
                        </li>
                        <li>
                          <a href="#">{footerData.attributes.key9}</a>
                        </li>
                        <li>
                          <a href="#">{footerData.attributes.key10}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 tab-margin-bottom-30">
                    <div className="footer-widget widget widget_nav_menu">
                      <ul>
                        <li>
                          <a href="#">{footerData.attributes.key11}</a>
                        </li>
                        <li>
                          <a href="#">{footerData.attributes.key12}</a>
                        </li>
                        <li>
                          <a href="./blogs">{footerData.attributes.key13}</a>
                        </li>
                        <li>
                          <a href="./quick-links">
                            {footerData.attributes.key14}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Widget Area End */}
            {/* Copyright Area Starts */}
            <div className="footer-copyright-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="copyright-text">
                      <span className="fColor">
                        <a href="https://www.ssrvm.org/" target="_blank">
                          {footerData.attributes.visit_ssrvm_website}
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="footer-social">
                      <span className="fPadTop fColor">
                        {footerData.attributes.connect_with_ssrvm_trust}
                      </span>
                      <ul className="social-link">
                        <li>
                          <a
                            href="https://www.facebook.com/ssrvm.official"
                            className="facebook"
                          >
                            {" "}
                            <FaFacebookF />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://twitter.com/ssrvm"
                            className="twitter"
                          >
                            <FaTwitter />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.youtube.com/channel/UCz1tS-oRzKeElBOd6pIjgLQ"
                            className="youtube"
                          >
                            <FaYoutube />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/ssrvm.official/"
                            className="instagram"
                          >
                            <FaInstagram />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='col-lg-3 offset-lg-1 tab-margin-bottom-30'>
                <div className='footer-widget widget widget_nav_menu'>
                  <ul>
                    <li>
                      <a href='#'>Student section</a>
                    </li>
                    <li>
                      <a href='./admissions'>Admissions</a>
                    </li>
                    <li>
                      <a href='#'>Parent Login</a>
                    </li>
                    <li>
                      <a href='#'>Policies</a>
                    </li>
                    <li>
                      <a href='#'>Mandatory Disclosures</a>
                    </li>
                  </ul>
                  <hr className="new1">
                  </hr>
                  <ul className="footerTopPadding res-footer-margin">
                    <li>
                      <a href='#'>Student section</a>
                    </li>
                    <li>
                      <a href='./admissions'>Admissions</a>
                    </li>
                    <li>
                      <a href='#'>Parent Login</a>
                    </li>
                    <li>
                      <a href='#'>Policies</a>
                    </li>
                    <li>
                      <a href='#'>Mandatory Disclosures</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-lg-3 tab-margin-bottom-30'>
                <div className='footer-widget widget widget_nav_menu res-footer-margin'>
                  <ul>
                    <li>
                      <a href='#'>SSRVM Portal</a>
                    </li>
                    <li>
                      <a href='#'>Teacher Login</a>
                    </li>
                    <li>
                      <a href='./blogs'>Blog</a>
                    </li>
                    <li>
                      <a href="./quick-links">
                        Quick Links
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            {/* Copyright Area End */}
          </div>
        )}
      </footer>
    </>
  );
};

export default Footer;
