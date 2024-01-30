import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MarqueeAward from "../components/marqueeAward";
import Slider from "react-slick";
import Link from "next/link";

const Award = ({ siteUrl }) => {
  const [awards, setAwards] = useState([]);
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/awards-and-achievements?sort=id:desc&populate=*`
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
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="heighLight">
        <div className="container service-area pd-top-75 pd-bottom-100">
          <div className="row">
            <div className="d-flex justify-content-between">
              <div>
              <h2 className="title">Awards and Recognitions</h2>

              </div>
              <div>
              <div className="d-flex gap-5 title fw-bold fs-18 ">
                <div className="fw-bold title-hide">
                  Recent Awards
                </div>
                <div>
                  <Link className="title" href="/awards-and-achievements">More Awards</Link>
                </div>
              </div>
              </div>
            </div>
            {/* <span className="d-none d-md-flex"> */}
            {awards.map((award) => (
              <div key={award.id} className="col-sm-3 d-none d-md-flex">
                <div className="single-service-wrap">
                  <a href={`${siteUrl}${award.attributes.image?.data?.attributes?.url}`}>
                  <img
                    src={`${siteUrl}${award.attributes.image?.data?.attributes?.url}`}
                    alt={award.attributes.award_name}
                    className="wrap-img-top1 wrap-side-award"
                  />
                  </a>
                 
                  <div className="textAlignCenter">
                    <h6 className="awardName">{award.attributes.award_name}</h6>
                    {/* {award.attributes.description} */}
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
                        className="wrap-img-top1 wrap-side-award"
                      />
                      <div className="textAlignCenter">
                        <h6 className="awardName">
                          {award.attributes.award_name}
                        </h6>
                        {award.attributes.description}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="col-sm-3">
             
              <MarqueeAward siteUrl={siteUrl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Award;
