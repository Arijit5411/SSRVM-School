import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MarqueeAward from "../components/marqueeAward";
import Slider from "react-slick";

const Award = () => {
  const [awards, setAwards] = useState([]);

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/awards-and-achievements?populate=*`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const schoolAwards = data.data
          .filter((award) => award.attributes.award_type === "school award") //change according to the award you want to display individual or school
          .sort((a, b) => {
            const yearA = parseInt(a.attributes.year.split(" ")[1]); // Get the year from the field
            const yearB = parseInt(b.attributes.year.split(" ")[1]); // Get the year from the field
            return yearB - yearA;
          })
          .slice(0, 3);

        setAwards(schoolAwards);
      } catch (error) {
        console.error("Error fetching awards:", error);
      }
    };

    fetchAwards();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <>
      <div className="heighLight">
        <div className="container service-area pd-top-75 pd-bottom-100">
          <div className="row">
            <h2 className="title">Award and Recognition</h2>
            {/* <span className="d-none d-md-flex"> */}
            {awards.map((award) => (
              <div key={award.id} className="col-sm-3 d-none d-md-flex">
                <div className="single-service-wrap">
                  <img
                    src={`${siteUrl}${award.attributes.image?.data?.attributes?.url}`}
                    alt={award.attributes.award_name}
                    className="image-Banner-Round awardImg"
                  />
                  <div className="textAlignCenter">
                    <h6 className="awardName">{award.attributes.award_name}</h6>
                    {award.attributes.description}
                  </div>
                </div>
              </div>
            ))}
            {/* </span> */}

            <div className="d-md-none px-3 mb-5">
              <Slider {...settings}>
                {awards.map((award) => (
                  <div key={award.id} className="col-sm-3">
                    <div className="single-service-wrap">
                      <img
                        src={`${siteUrl}${award.attributes.image?.data?.attributes?.url}`}
                        alt={award.attributes.award_name}
                        className="image-Banner-Round awardImg"
                      />
                      <div className="textAlignCenter">
                        <h6 className="awardName">{award.attributes.award_name}</h6>
                        {award.attributes.description}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="col-sm-3">
              <h2 className="title pd-bottom-20 marginTop72 ">Recent Awards</h2>
              <MarqueeAward />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Award;
