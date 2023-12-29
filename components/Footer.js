import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelopeOpen,
} from "react-icons/fa";
import Subscribe from "./Subscribe";
const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";

const Footer = ({siteUrl}) => {
  const [footerData, setFooterData] = useState(null);
  const [globalsocial, setGlobalSocial] = useState();

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

  useEffect(() => {
    fetch(`${GlobalSiteUrl}/api/global-trust-data?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setGlobalSocial(data.data.attributes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      {/* footer area start */}
      <footer className="footer-area-3">
        <Subscribe siteUrl={siteUrl}/>
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
                          allowFullScreen=""
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
                              <a className="text-white" href={`tel:${footerData.attributes.phone_no}`}>
                                <FaPhoneAlt className="fColor marginright" />
                                {footerData.attributes.phone_no}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="single-contact-inner">
                          <div className="details">
                            <p className="address">
                              <a className="text-white" href={`mailto:${footerData.attributes.mail_adddress}`}>
                                <FaEnvelopeOpen className="fColor marginright" />
                                {footerData.attributes.mail_adddress}
                              </a>
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
                          <a href={footerData.attributes.key1_link}>{footerData.attributes.key1}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key2_link}>
                            {footerData.attributes.key2}
                          </a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key3_link}>{footerData.attributes.key3}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key4_link}>{footerData.attributes.key4}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key5_link}>{footerData.attributes.key5}</a>
                        </li>
                      </ul>
                      <hr className="new1"></hr>
                      <ul className="footerTopPadding">
                        <h4 className="text-light">{footerData.attributes.key6}</h4>
                        {/* <li>
                          <a href={footerData.attributes.key6_link}>{footerData.attributes.key6}</a>
                        </li> */}
                        <li>
                          <a href={footerData.attributes.key7_link}>
                            {footerData.attributes.key7}
                          </a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key8_link}>{footerData.attributes.key8}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key9_link}>{footerData.attributes.key9}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key10_link}>{footerData.attributes.key10}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 tab-margin-bottom-30">
                    <div className="footer-widget widget widget_nav_menu">
                      <ul>
                        <li>
                          <a href={footerData.attributes.key11_link}>{footerData.attributes.key11}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key12_link}>{footerData.attributes.key12}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key13_link}>{footerData.attributes.key13}</a>
                        </li>
                        <li>
                          <a href={footerData.attributes.key14_link}>
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
                    <div className="copyright-text ">
                      <span className="fColor">
                       
                          <a  target="_blank" href={globalsocial?.Website_Link} className="text-white">Visit the SSRVM Trust Website</a>

                      
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="footer-social">
                      <span className="fPadTop fColor">
                      Connect with SSRVM Trust:{" "}
                      </span>
                      <ul className="social-link">
                        <li>
                          <a
                            href={globalsocial?.Facebook}
                            className="facebook"
                          >
                            {" "}
                            <FaFacebookF />
                          </a>
                        </li>
                        <li>
                          <a
                            href={globalsocial?.Twitter}
                            className="twitter"
                          >
                            <FaTwitter />
                          </a>
                        </li>
                        <li>
                          <a
                            href={globalsocial?.Youtube}
                            className="youtube"
                          >
                            <FaYoutube />
                          </a>
                        </li>
                        <li>
                          <a
                            href={globalsocial?.Instagram}
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
