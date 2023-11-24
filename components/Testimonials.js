import React, { Fragment, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";

const Testimonial = () => {
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaArrowLeft className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaArrowRight className={className} onClick={onClick} />;
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  const [parentTestimonials, setParentTestimonials] = useState([]);
  const [filteredParentTestimonials, setFilteredParentTestimonials] = useState([]);

  const isProduction = process.env.NODE_ENV === 'production';

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/testimonial-pages?populate=*&tab_option=parents`
        );
        const data = await response.json();
        setParentTestimonials(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredTestimonials = parentTestimonials.filter(
      (testimonial) => testimonial.attributes.tab_option === "parents"
    );
    setFilteredParentTestimonials(filteredTestimonials);
  }, [parentTestimonials]);

  return (
    <>

      <div className="mobilehide testimonial">
        <div className="container">
          <div className="">
            <div className="row">
              <div className="align-self-center">
                <div className="section-title">
                  <div className="feature-slider owl-carousel">
                    <Slider className="slideTestimo" {...settings}>
                      {filteredParentTestimonials.map((testimonial, index) => (
                        <div className="item" key={index}>
                          <div className="testimonalBox">
                            <div className="imgbox">
                              <img
                                src={`${siteUrl}${testimonial.attributes.image?.data?.attributes?.url}`}
                                alt="school"
                                className="image-Banner-Round"
                              />
                            </div>
                            <div className="box-text">
                              <h3>{testimonial.attributes.name}</h3>
                              <h5>{testimonial.attributes.sub_heading}</h5>
                              <p>{testimonial.attributes.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Services area */}

      <div className="desktophide">
        <div className="container">
          <div className="row">
            <div className="align-self-center">
              <div className="section-title">
                <div className="feature-slider owl-carousel">
                  <Slider {...settings}>
                    {filteredParentTestimonials.map((testimonial, index) => (
                      <div className="item" key={index}>
                        <div className="">
                          <div className="imgboxMobile">
                            <img
                              src={`${siteUrl}${testimonial.attributes.image?.data?.attributes?.url}`}
                              alt="school"
                              className="image-Banner-Round"
                            />
                          </div>
                          <div className="box-text">
                            <h3>{testimonial.attributes.name}</h3>
                            <h5>{testimonial.attributes.sub_heading}</h5>
                            <p>{testimonial.attributes.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;