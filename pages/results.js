import React, { Fragment, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GooglePieChart from "../components/GooglePieChart";
import Slider from "react-slick";
import OurToppers from "../components/OurTopper";
import DownloadResult from "../components/DownloadResult";
import Head from "next/head";
import Image from "next/image";
// import Seo from './Seo';


import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/result-graphs?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            graphData: data1,
            siteUrl

        }
    };
} catch (error) {
  console.error("Error fetching data:", error.message);

  return {
    props: {
      data: [],
    },
  };
}
};

const Results = ({ seodata, graphData,siteUrl }) => {

    const [graph, setGraph] = useState([]);

    

    useEffect(() => {
        // fetch(`${siteUrl}/api/result-graphs?populate=*`)
        //     .then(response => response.json())
        //     .then(data => {
        //         const graphData = data.data.map(item => item.attributes);
        //         setGraph(graphData);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (graphData && graphData?.data && graphData?.data?.length > 0) {
            const graphDataAttr = graphData.data.map(item => item.attributes);
            setGraph(graphDataAttr);
        }
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
               <Seo SeoData={seodata} PageSlug={"results"} />

            <NavBar siteUrl={siteUrl}/>
           
            <Fragment>
                <div className="top-section1-results">
                    <div className="container">
                        <h1 className="principal-mess">Results</h1>
                    </div>
                    <div className="container">

                        <div className="row">
                            <div className='partner-slider owl-carousel'>
                                <Slider {...settings}>
                                    {graph.map((graphItem, index) => (
                                        <div className='item' key={index}>
                                            <div className='thumb'>
                                                <Image width={396} height={396} src={`${siteUrl}${graphItem?.image?.data?.attributes?.url}`} alt='Transpro' />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>

                            </div>

                        </div>

                    </div>
                    <section>
                        <OurToppers siteUrl={siteUrl}/>
                    </section>

                    <section className="container pd-top-75 pd-bottom-80">
                        <DownloadResult siteUrl={siteUrl}/>
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};
export default Results;
