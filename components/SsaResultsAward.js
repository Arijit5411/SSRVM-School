import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SsaResultsAward = ({siteUrl}) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        // Fetch data from the API
        fetch(`${siteUrl}/api/ssa-results-awards?populate=*`)
            .then(response => response.json())
            .then(data => {
                // Assuming data is the response from the API
                console.log("API Data:", data);
                setImages(data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return <FaArrowRight className={className} onClick={onClick} />;
    }
    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return <FaArrowLeft className={className} onClick={onClick} />;
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    arrows: false,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="partner-slider owl-carousel">
                        <Slider {...settings}>
                            {images.map((imageData, index) => (
                                <div className="row">
                                    <div key={index} className="result-three-gallery-item">
                                        {console.log("Image URL:", `${siteUrl}${imageData?.attributes?.image?.data?.attributes?.url}`)} {/* Add this line */}
                                        <img
                                            src={`${siteUrl}${imageData?.attributes?.image?.data?.attributes?.url}`}
                                            alt={imageData.attributes.name}
                                            width="400"
                                            height="300"
                                            onLoad={() => console.log("Image loaded")} // Add this line
                                        />
                                        <h4>{imageData.attributes.name}</h4>
                                        <p>{imageData.attributes.details}</p>
                                    </div>
                                </div>
                            ))}

                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SsaResultsAward;
