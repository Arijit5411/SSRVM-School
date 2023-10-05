import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const BannerSlider = () => {
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

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <>
      {/* header start */}
      <div className="home-area home-v3 ">
        <div className="header-slider header-slider2">
          <Slider
            {...settings}
            asNavFor={state.nav2}
            ref={(slider) => (slider1 = slider)}
          >
            <div>
              <div className="header-bg banner-one-Color">
                <div className="container">
                  <div className="row header-height justify-content-start">
                    <div className="col-lg-6">
                      <div className="header-inner-wrap">
                        <div className="header-inner">
                          {/* header inner */}
                          <h1 className="title animated slideInRight">
                            Always<br></br>
                            aiming for Excellence{" "}
                          </h1>
                          <p className="sub-title">
                            Welcome to Sri Sri Ravi Shankar Vidya Mandir -
                            Bangalore South
                          </p>
                          {/* <div className='btn-wrapper style-02 aanimated fadeInUpBig'>
                        <a href='#' className='boxed-btn'>
                          <span>Know more</span>
                        </a>
                      </div> */}
                        </div>
                        {/* //.header inner */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-wrapper">
                        <img
                          src="assets/img/banner/hero-1.jpg"
                          alt="school"
                          className="image-Banner-Round"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="header-bg banner-two-Color">
                <div className="container">
                  <div className="row header-height justify-content-start">
                    <div className="col-lg-6">
                      <div className="header-inner-wrap">
                        <div className="header-inner">
                          {/* header inner */}
                          <h1 className="title animated slideInRight">
                            Always<br></br>
                            aiming for Excellence{" "}
                          </h1>
                          <p className="sub-title">
                            Welcome to Sri Sri Ravi Shankar Vidya Mandir -
                            Bangalore South
                          </p>
                          {/* <div className='btn-wrapper style-02 aanimated fadeInUpBig'>
                        <a href='#' className='boxed-btn'>
                          <span>Know more</span>
                        </a>
                      </div> */}
                        </div>
                        {/* //.header inner */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-wrapper">
                        <img
                          src="assets/img/banner/hero-1.jpg"
                          alt="school"
                          className="image-Banner-Round"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="header-bg banner-three-Color">
                <div className="container">
                  <div className="row header-height justify-content-start">
                    <div className="col-lg-6">
                      <div className="header-inner-wrap">
                        <div className="header-inner">
                          {/* header inner */}
                          <h1 className="title animated slideInRight">
                            Always<br></br>
                            aiming for Excellence{" "}
                          </h1>
                          <p className="sub-title">
                            Welcome to Sri Sri Ravi Shankar Vidya Mandir -
                            Bangalore South
                          </p>
                          {/* <div className='btn-wrapper style-02 aanimated fadeInUpBig'>
                        <a href='#' className='boxed-btn'>
                          <span>Know more</span>
                        </a>
                      </div> */}
                        </div>
                        {/* //.header inner */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-wrapper">
                        <img
                          src="assets/img/banner/hero-1.jpg"
                          alt="school"
                          className="image-Banner-Round"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="header-bg banner-four-Color">
                <div className="container">
                  <div className="row header-height justify-content-start">
                    <div className="col-lg-6">
                      <div className="header-inner-wrap">
                        <div className="header-inner">
                          {/* header inner */}
                          <h1 className="title animated slideInRight">
                            Always<br></br>
                            aiming for Excellence{" "}
                          </h1>
                          <p className="sub-title">
                            Welcome to Sri Sri Ravi Shankar Vidya Mandir -
                            Bangalore South
                          </p>
                          {/* <div className='btn-wrapper style-02 aanimated fadeInUpBig'>
                        <a href='#' className='boxed-btn'>
                          <span>Know more</span>
                        </a>
                      </div> */}
                        </div>
                        {/* //.header inner */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-wrapper">
                        <img
                          src="assets/img/banner/hero-1.jpg"
                          alt="school"
                          className="image-Banner-Round"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* header end */}
    </>
  );
};

export default BannerSlider;
