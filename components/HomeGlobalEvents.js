import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeGlobalEvents = ({siteUrl}) => {
    const [events, setEvents] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8; // Number of events posts per page
    const GlobalSiteUrl = process.env.GSURL
    useEffect(() => {
        fetch(`${GlobalSiteUrl}/api/global-events?sort=id:desc&populate=*`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error:", data.error.message);
                } else {
                    // const sortedEvents = data.data.sort(
                    //     (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)
                    // );
                    // setEvents({ ...data, data: sortedEvents });
                    setEvents({ ...data, data: data.data });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const SampleNextArrow = (props) => {
        const { className, onClick } = props;
        return <FaArrowLeft className={className} onClick={onClick} />;
    };

    const SamplePrevArrow = (props) => {
        const { className, onClick } = props;
        return <FaArrowRight className={className} onClick={onClick} />;
    };

    const sliderSettings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = events?.data?.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <Fragment>
            <div className="">
                {events ? (
                    <section className="container ">
                        <div className="feature-slider owl-carousel">
                            <Slider {...sliderSettings}>
                                {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                                    currentPosts.map((post, index) => (
                                        <div className="item" key={index}>
                                            <div className="card wrap-news">
                                                <img
                                                    src={`${GlobalSiteUrl}${post.attributes.image?.data?.attributes?.url}`}
                                                    className="wrap-img-top"
                                                    alt="blog image"
                                                />
                                                <div className="card-body">
                                                    <p className="card-text-news">
                                                        {post.attributes.date}
                                                    </p>
                                                    <p className="card-text-news">
                                                        {post.attributes.title}
                                                    </p>
                                                    <Link
                                                        href={`/global-individual-events/${post.id}`}
                                                        className="text-muted-news"
                                                    >
                                                        read more
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No event posts available for the slider.</p>
                                )}
                            </Slider>
                        </div>
                    </section>
                ) : (
                    <p>Loading event posts...</p>
                )}
            </div>
        </Fragment>
    );
};

export default HomeGlobalEvents;
