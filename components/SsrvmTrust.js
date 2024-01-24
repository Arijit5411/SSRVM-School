import React, { Fragment, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const SsrvmTrust = () => {
  const [art, setArt] = useState({});
  const [institutes, setInstitutes] = useState([]);
  const [country, setCountry] = useState([]);

  const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";

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
          <div>
            <div className="heading_trustpage">
              <h2 className="trust-size">
                {art.top_heading && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: art.top_heading.replace(/\n/g, "<br />"),
                    }}
                  ></span>
                )}
              </h2>
            </div>
            <div className="paragraph_one_trustpage">
              <p>
                <ReactMarkdown>{art.top_content}</ReactMarkdown>
              </p>
            </div>
          </div>
        </div>
        <img
          className="imgwidthfull"
          src="assets/img/4b-Trust/1-hero-desktop.jpg"
          alt="Founder img"
        />
      </section>

      <section className="Our_global_footprint_section">
        <div>
          <div>
            <div>
              <h2 className="heading_OGF">{art.bottom_heading}</h2>
              <p className="paragraph_OGF">
                {art.bottom_content && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: art.bottom_content.replace(/\n/g, "<br />"),
                    }}
                  ></span>
                )}
              </p>
            </div>
          </div>
          <div>
            <div>
              <h3 className="sub_head_OGF">{art.institute_across}</h3>
            </div>

            <div className="logo_section">
              {country.map((countryItem, index) => (
                <div key={index}>
                  <img
                    className="Country_flag"
                    src={`${GlobalSiteUrl}${countryItem.country_flag?.data?.attributes?.url}`}
                    alt={`${countryItem.country_name} flag`}
                  />
                  <p className="onam_logo_heading">
                    {countryItem.country_name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text_across_image_ogf">
            <div>
              <h1 className="Student_section_trustpage">
                {art.total_student}{" "}
                <span className="studentSize">Students</span>
              </h1>
            </div>

            <div className="sub_section_text_across_image">
              <div className="institute-pair-container">
                {institutes.map((institute, index) => (
                  <div key={index} className="number_image_ssrvm">
                    <h3 className="numbers_imageside">{institute.number}</h3>
                    <span className="institutions_name_ssvrm">
                      {institute.institute_name
                        .split("\n")
                        .map((line, index) => (
                          <Fragment key={index}>
                            {line}
                            <br />
                          </Fragment>
                        ))}
                    </span>
                  </div>
                ))}
              </div>
              <div className="below_part_text_after_image">
                <img
                  className="image_side_text"
                  src={`${GlobalSiteUrl}/uploads/2_trust_pic_6a8d55d7af.png`} // You may need to adjust the image source
                  alt="flag_image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="below_section_trustpage">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="parafooter">
                  Looking for an SSRVM Institute near you?
                </div>
              </div>

              <div className="col-md-6">
                <a href={art?.find_link} target="_blank">
                  <button className="below_section_button">
                    Find Institute
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SsrvmTrust;
