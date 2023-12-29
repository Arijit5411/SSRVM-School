import React, { Fragment, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import RecentEventsSidebar from "@/components/RecentEventsSidebar";
import ReactMarkdown from 'react-markdown';
import GlobalRecentEvents from "@/components/GlobalRecentEvents";
import { determineStrapiUrl } from "@/utils/strapiUtils";



const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"


const GlobalIndividualEvents = () => {
    const router = useRouter()
    const [events, setEvents] = useState(null);
    const { postID } = router.query;
    const [loading, setLoading] = useState(true);
    const [publicUrl, setPublicUrl] = useState();

    useEffect(() => {
        if (postID) {
            fetch(`${GlobalSiteUrl}/api/global-events/${postID}?populate=*`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        console.error("Error:", data.error.message);
                    } else {
                        setEvents(data.data.attributes); // Access the attributes directly
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [postID]);




    const components = {
        img: ({ src, alt }) => {
            return <img src={`${GlobalSiteUrl}${src}`} alt={alt} />;
        },
    };
    useEffect(() => {
        setPublicUrl(window.location.origin) 
      }, [publicUrl]);

      const homeUrl = router.pathname === '/' ? '/' : `/${router.pathname}`;

      const siteUrl = determineStrapiUrl(homeUrl);
    return (
        <>
            <NavBar siteUrl={siteUrl}/>
            <div className="top-section4-new desktophide">
                <section className="wrap-item-blog-se1 first-section position-relative">
                    <div className="container">
                        <div className="row gx-5 blog-inn-row">
                            <div className="col-content">
                                <a className="backto-btn" href="/global-events">
                                    <img
                                        src={
                                            publicUrl +
                                            "/assets/img/blog/13-arrow-left.png"
                                        }
                                        alt="Transpro"
                                    />
                                    <span>Back to Events</span>
                                </a>
                            </div>

                            <div className="col-lg-12">
                                {loading ? (
                                    <p>Loading Events post...</p>
                                ) : (
                                    <div className="blog-post">
                                        <img
                                            src={`${GlobalSiteUrl}${events?.image?.data?.attributes?.url}`}
                                            alt={events?.Title}
                                            className="widthEventImg"
                                        />
                                        <h1 className="wrap-text-inner">

                                            {events?.title}

                                        </h1>
                                        <p className="blog-parg-item">

                                            <ReactMarkdown components={components}>
                                                {events?.content}
                                            </ReactMarkdown></p>
                                    </div>
                                )}
                            </div>
                            <div className="container">
                                <GlobalRecentEvents siteUrl={siteUrl}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="top-section4 mobilehide">
                <section className="wrap-item-blog-se1 first-section position-relative">
                    <div className="container">
                        <div className="row gx-5 blog-inn-row">
                            <div className="col-lg-3 col-1">
                                {/* Sidebar content */}
                                <div className="col-content">
                                    <a className="backto-btn" href="/global-events">
                                        <img
                                            src={
                                                publicUrl +
                                                "/assets/img/blog/13-arrow-left.png"
                                            }
                                            alt="Transpro"
                                        />
                                        <span>Back to Events</span>
                                    </a>

                                    <GlobalRecentEvents siteUrl={siteUrl}/>
                                </div>
                            </div>
                            <div className="col-lg-9 col-2">
                                {loading ? (
                                    <p>Loading Events post...</p>
                                ) : (
                                    <div className="blog-post">
                                        <img
                                            src={`${GlobalSiteUrl}${events?.image?.data?.attributes?.url}`}
                                            alt={events?.Title}
                                            className="widthEventImg"
                                        />
                                        <h1 className="wrap-text-inner">

                                            {events?.title}

                                        </h1>
                                        <p className="blog-parg-item">
                                            <ReactMarkdown components={components}>
                                                {events?.content}
                                            </ReactMarkdown></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer siteUrl={siteUrl}/>
        </>
    );
};

export default GlobalIndividualEvents;
