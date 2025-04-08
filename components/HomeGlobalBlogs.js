import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const HomeGlobalBlogs = () => {
    const [blog, setBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8; // Number of blog posts per page

    const GlobalSiteUrl = process.env.GSURL

    useEffect(() => {
        fetch(`${GlobalSiteUrl}/api/global-blogs?sort=id:desc&populate=*`)
            // fetch(`${GlobalSiteUrl}/api/global-blogs?populate=*`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error:", data.error.message);
                } else {
                    // const sortedBlogs = data.data.sort(
                    //     (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)
                    // );
                    // setBlog({ ...data, data: sortedBlogs });
                    setBlog({ ...data, data: data.data });
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
        // initialSlide: 0,
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
    const currentPosts = blog?.data?.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <Fragment>
            <div className="">
                {blog ? (
                    <section className="container ">
                        <div className="feature-slider owl-carousel">
                            <Slider {...sliderSettings}>
                                {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                                    currentPosts.reverse().map((post, index) => (
                                        <div className="item" key={index}>
                                            <div className="card wrap-news">
                                                <Image width={400} height={300}
                                                    src={`${GlobalSiteUrl}${post.attributes.image?.data?.attributes?.url}`}
                                                    className="wrap-img-top"
                                                    alt="..."
                                                />
                                                <div className="card-body">
                                                    <p className="card-text-news">
                                                        {post.attributes.date}
                                                    </p>
                                                    <p className="card-text-news">
                                                        {post.attributes.Title}
                                                    </p>
                                                    <Link
                                                        href={`/global-individual-blogs/${post.attributes.slug}`}
                                                        className="text-muted-news"
                                                    >
                                                        read more
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No blog posts available for the slider.</p>
                                )}
                            </Slider>
                        </div>
                    </section>
                ) : (
                    <p>Loading blog posts...</p>
                )}
            </div>
        </Fragment>
    );
};

export default HomeGlobalBlogs;
