import React, { useState, useEffect } from "react";
import Video from "../components/Video";

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

  return (
    <>
      <h2 className="title pd-bottom-20">Parents Speak</h2>

      <div className="row justify-content-center">
        {videos.map((videoItem, index) => (
          <div className="col-lg-6 col-md-6" key={index}>
            {videoItem.attributes.video_link ? (
              <Video videoUrl={videoItem.attributes.video_link} />
            ) : (
              <p>No video link available</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ParentSpeakVideo;
