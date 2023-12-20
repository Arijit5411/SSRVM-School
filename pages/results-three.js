import React, { Fragment, useEffect, useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DownloadResult from "@/components/DownloadResult";
import SsaResultsAward from "@/components/SsaResultsAward";

const Results_three = () => {
    const [graph, setGraph] = useState([]);

    const isProduction = process.env.NODE_ENV === 'production';

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    useEffect(() => {
        fetch(`${siteUrl}/api/result-graphs?populate=*`)
            .then(response => response.json())
            .then(data => {
                const graphData = data.data.map(item => item.attributes);
                setGraph(graphData);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [siteUrl]);


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
        <>
            <Fragment>
                <NavBar />
                <div className="top-section1-new">
                    <section className="wrap-item-principal-se1">
                        <div className="container">
                            <div className="wrap-item-text1">
                                <h1 className="principal-mess">
                                    Results
                                </h1>
                            </div>
                        </div>

                        <div className="container">

                            <div className="row">
                                <div className='partner-slider owl-carousel'>
                                    <Slider {...settings}>
                                        {graph.map((graphItem, index) => (
                                            <div className='item' key={index}>
                                                <div className='thumb'>
                                                    <img src={`${siteUrl}${graphItem?.image?.data?.attributes?.url}`} alt='Transpro' />
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>

                                </div>

                            </div>

                        </div>
                    </section>

                    <section>
                        <div className="container">
                            <div className="wrap-item-text1">
                                <h1 className="principal-mess-res">
                                    Sri Sri Awards
                                </h1>
                                <p>
                                    Our Students excel in leadership traits, value and service. Lorem Ipsum is simply<br></br>
                                    dummy text of the printing and typesetting industry.
                                </p>
                            </div>
                        </div>

                        <div className="container image-gallery">
                            <SsaResultsAward />
                        </div>
                    </section>

                    <section className="container wrap-item-1 mb-4">
                        <DownloadResult />
                    </section>
                </div>
                <Footer />
            </Fragment>
        </>
    );
};

export default Results_three;
