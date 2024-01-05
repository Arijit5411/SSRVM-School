import { yellow } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";

const BannerSliderOne = ({ siteUrl }) => {
  const [state, setState] = useState({
    nav1: null,
    nav2: null,
  });

  var { slider1, slider2 } = useRef();

  useEffect(() => {
    setState({
      nav1: slider1,
      nav2: slider2,
    });
  }, []);

  // const settings = {
  //   dots: false,
  //   arrows: false,
  //   infinite: true,
  //   fade: false,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  // };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return <FaArrowLeft className={className} onClick={onClick} />;
  };

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return <FaArrowRight className={className} onClick={onClick} />;
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2600,
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

  const [banner, setBanner] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [vidUrl, setVidUrl] = useState("");

  const getBanners = () => {
    fetch(`${siteUrl}/api/home-top-banners?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setBanner(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getVideo = () => {
    fetch(`${siteUrl}/api/home-top-video?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.data?.attributes?.video_inplaceof_carosuel) {
          setIsVideo(true);
          setVidUrl(data?.data?.attributes?.video_link);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getBanners();
    getVideo();
  }, []);
  return (
    <>
      {/* header start */}
      {isVideo ? (
        <div className="videoTop w-100 d-flex flex-row justify-content-center align-items-center">
          <iframe
            // width="500"
            // height="500"
            width="100%"
            height="500"
            src={`${vidUrl}?autoplay=1&mute=1&controls=1&autoplay=0&loop=0`}
            frameborder="0"
            allowfullscreen="true"
          ></iframe>
        </div>
      ) : (
        <div className="home-area home-v2 ">
          <div className="header-slider header-slider2">
            <Slider
              {...settings}
              asNavFor={state.nav2}
              ref={(slider) => (slider1 = slider)}
            >
              {banner.map((item) => (
                <div key={item.id}>
                  <div
                    className={`home-banner-bg-image header-bg banner-${item.id}-Color `}
                    style={{ backgroundImage: `url(${siteUrl}${item.attributes.image.data.attributes.url})` }}
                  >
                    <div className="container">
                      <div className="row header-height justify-content-start">
                        <div className="col-lg-6">
                          <div className="banner-item-wrap">
                            <div className="mob-bann-img h-100 d-md-none">
                              <img
                                className="w-100 h-100 object-fit-cover"
                                src={
                                  siteUrl +
                                  item.attributes.image.data.attributes.url
                                }
                                alt=""
                              />
                            </div>

                            {(item.attributes.heading ?? null) && (item.attributes.description ?? null) && (
                              <div className="header-inner-wrap">
                                <div className="header-inner">
                                  <h1 className="title animated slideInRight">
                                    {item.attributes.heading}
                                  </h1>
                                  <p className="sub-title">
                                    {item.attributes.description}
                                  </p>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className=" home-v2"></div>

          <div className="header-bottom">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="header-sm-slider">
                    <Slider
                      asNavFor={state.nav1}
                      ref={(slider) => (slider2 = slider)}
                      slidesToShow={3}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      {banner.map((item) => (
                        <div key={item.id} className="custom-thumb">
                          <img
                            src={`${siteUrl}${item.attributes.image.data.attributes.formats.thumbnail.url}`}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* header end */}
    </>
  );
};

export default BannerSliderOne;
