import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer";
import Video from "@/components/Video";
// import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';

const SportsAndArts = () => {
    const router = useRouter();

    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { postID } = router.query;
    const [nextPostExists, setNextPostExists] = useState(true);

    const isProduction = process.env.NODE_ENV === 'production';
    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;


    const navigateToNextPost = () => {
        const nextPostID = parseInt(postID) + 1;

        window.location.href = `/individual-activities/${nextPostID}`;
    };


    useEffect(() => {
        if (postID) {
            fetch(`${siteUrl}/api/activities/${postID}?populate=*&populate=image_gallery.image_gal&populate=video_link`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        console.error('Error:', data.error.message);
                    } else {
                        setActivityData(data.data.attributes);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });

            fetch(`${siteUrl}/api/activities/${parseInt(postID) + 1}?populate=*`)
                .then((response) => response.json())
                .then((data) => {
                    setNextPostExists(!data.error);
                })
                .catch((error) => {
                    setNextPostExists(false);
                });
        }
    }, [postID, siteUrl]);



    const { title, description, card_color, image_gallery, video_link } = activityData || {};
    return (
        <>
            <NavBar />
            <div className="top-section15-new">
                <div className="container">
                    <h1 className="principal-mess wrap-sports-arts sport_mob lineHight">{title}</h1>
                    <p className="sportp">
                        {description}
                    </p>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <section className="container">
                            <h4 className="heading_down_sports marginTop50">Images from our sports activities</h4>
                            <div className="row">
                                {image_gallery && image_gallery.map((imageItem, index) => (
                                    <div className="col-lg-4" key={index}>
                                        <img
                                            src={siteUrl + imageItem.image_gal?.data?.attributes?.url}
                                            alt={`Image ${index}`}
                                            className="image_box_sports"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="container">
                            <h4 className="heading_down_sports marginTop50">Videos Title</h4>
                            <div className="row">
                                {video_link && video_link.map((videoItem, index) => (
                                    <div className="col-lg-4" key={index}>
                                        {videoItem.video ? (
                                            <Video videoUrl={videoItem.video} />
                                        ) : (
                                            <p>No video link available</p>
                                        )}
                                        <h4>Video to watch</h4>
                                    </div>
                                ))}

                            </div>
                        </section>

                        <section>
                            <div className="back_and_art">
                                <div>
                                    <a href="/our-hub-of-activities">&#x2190;Back to Hub of Activities </a>
                                </div>
                                <div>
                                    {nextPostExists && <a href="#" onClick={navigateToNextPost}> Next Page &#x2192; </a>}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SportsAndArts;
