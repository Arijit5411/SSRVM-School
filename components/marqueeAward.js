import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MarqueeAward = ({siteUrl}) => {
  const [awards, setAwards] = useState([]);
  useEffect(() => {
    // Make API request to fetch award data
    fetch(`${siteUrl}/api/awards-and-achievements?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        // Filter school awards and sort them based on the year
        const schoolAwards = data.data.filter(
          (award) => award.attributes.award_type === "school award"
        );
        const sortedAwards = schoolAwards.sort((a, b) => {
          const yearA = parseInt(a.attributes.year.split(" ")[1]);
          const yearB = parseInt(b.attributes.year.split(" ")[1]);
          return yearB - yearA;
        });
        setAwards(sortedAwards);
      })
      .catch((error) => console.error("Error fetching awards:", error));
  }, []);

  return (
    <>
      <marquee behavior="scroll" direction="up" className="marqueHeight">
        {awards.map((award) => (
          <div className="displayFlex" key={award.id}>
            <img
              src="assets/img/award.png"
              alt="school"
              className="imgWidthSlider"
            />
            <span className="marquetext">
              <a href="/awards-and-achievements">
                {award.attributes.description}
              </a>
            </span>
          </div>
        ))}
      </marquee>
    </>
  );
};

export default MarqueeAward;
