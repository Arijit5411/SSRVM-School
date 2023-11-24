import React, { useState, useEffect } from "react";
import Video from "../components/Video";
import Slider from "react-slick";

const ParentSpeakVideo = () => {
  const [videos, setVideos] = useState([]);
  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    fetch(`${siteUrl}/api/testimonial-videos`)
      .then((response) => response.json())
      .then((data) => {
        // Sort videos by createdAt in descending order
        const sortedVideos = data.data.sort((a, b) => {
          return (
            new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
          );
        });

        // Get the two latest videos
        const latestVideos = sortedVideos.slice(0, 2);

        setVideos(latestVideos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [siteUrl]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <>
      <h2 className="title pd-bottom-20">Parents Speak</h2>

      <div className="row justify-content-center">
        {/* <div className="d-none d-md-block"> */}
        {videos.map((videoItem, index) => (
          <div className="col-lg-6 col-md-6 d-none d-md-block" key={index}>
            {videoItem.attributes.video_link ? (
              <Video videoUrl={videoItem.attributes.video_link} />
            ) : (
              <p>No video link available</p>
            )}
          </div>
        ))}
        {/* </div> */}
        <div className="d-md-none px-3 mb-5">
          <Slider {...settings}>
            {videos.map((videoItem, index) => (
              <div className="col-lg-6 col-md-6" key={index}>
                {videoItem.attributes.video_link ? (
                  <Video videoUrl={videoItem.attributes.video_link} />
                ) : (
                  <p>No video link available</p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ParentSpeakVideo;
