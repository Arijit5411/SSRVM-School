import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeNews = () => {
  const [news, setNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // Number of news posts per page

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    fetch(`${siteUrl}/api/newspages?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error:", data.error.message);
        } else {
          const sortedNews = data.data.sort(
            (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)
          );
          setNews({ ...data, data: sortedNews });
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
  const currentPosts = news?.data?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Fragment>
      <div className="">
        {news ? (
          <section className="container ">
            <div className="feature-slider owl-carousel">
              <Slider {...sliderSettings}>
                {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                  currentPosts.map((post, index) => (
                    <div className="item" key={index}>
                      <div className="card wrap-news">
                        <img
                          src={`${siteUrl}${post.attributes.image?.data?.attributes?.url}`}
                          className="wrap-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <p className="card-text-news">
                            {post.attributes.date}
                          </p>
                          <p className="card-text-news">
                            {post.attributes.title}
                          </p>
                          <Link
                            to={`/back-to-news/${post.id}`}
                            className="text-muted-news"
                          >
                            read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No news posts available for the slider.</p>
                )}
              </Slider>
            </div>
          </section>
        ) : (
          <p>Loading news posts...</p>
        )}
      </div>
    </Fragment>
  );
};

export default HomeNews;
