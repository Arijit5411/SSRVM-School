import React, { useState, useEffect } from "react";

const TestimonialsVideo = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [videos, setVideos] = useState([]);

    const isProduction = process.env.NODE_ENV === 'production';

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    useEffect(() => {
        fetch(`${siteUrl}/api/testimonial-videos`)
            .then(response => response.json())
            .then(data => {
                const videosData = data.data.map(item => item.attributes);
                setVideos(videosData);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [siteUrl]);

    const goToPrevious = () => {
        setCurrentVideo(prevVideo =>
            prevVideo === 0 ? videos.length - 2 : prevVideo - 1
        );
    };

    const goToNext = () => {
        setCurrentVideo(prevVideo =>
            prevVideo === videos.length - 2 ? 0 : prevVideo + 1
        );
    };

    return (
        <>
            <div className="video-gallery marginTopHeader">
                <div className="arrow-ssa left-arrow" onClick={goToPrevious}>
                    &larr;
                </div>
                <div className="video-row">
                    {videos
                        .slice(currentVideo, currentVideo + 2)
                        .map((video, index) => (
                            <div key={index} className="video-container">
                                <iframe
                                    width="550"
                                    height="300"
                                    src={video.video_link}
                                    controls
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                                <h5>{video.name}</h5>
                                <p>{video.description}</p>
                            </div>
                        ))}
                </div>
                <div className="arrow-ssa right-arrow" onClick={goToNext}>
                    &rarr;
                </div>
            </div>
        </>
    );
};

export default TestimonialsVideo;
