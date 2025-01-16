import HomeAutoPopup from '@/components/HomeAutoPopup';
import MainSlider from '@/components/Sliders/MainSlider1';
import React, { useEffect, useRef, useState } from 'react'
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Marquee from 'react-fast-marquee';
import MainAccordion from '@/components/Accordion/MainAccordion';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import ScrollToTop from 'react-scroll-to-top';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import VideoModal from '@/components/Modal/VideoModal';
import AddEnqForm from '@/components/Form/AddEnqForm';
import ReactMarkdown from "react-markdown";
import Link from 'next/link';
import WhatsAppButton from '@/components/FloatContact';
import FloatContact from '@/components/FloatContact';
import FooterApplyNow from '@/components/FooterApplyNow';



export const getServerSideProps = async (context) => {
    const siteUrl = determineStrapiUrl(context);
    try {
        const res = await fetch(`${siteUrl}/api/apply-now?populate=deep, 4`);

        // const res4 = await fetch(`${siteUrl}/api/seo?populate=deep, 10`);
        const data = await res.json();

        // const data4 = await res4.json();
        return {
            props: {
                siteUrl,
                applyNow: data?.data,

                // seodata: data4?.data?.attributes?.Pages ?? {},
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);

        return {
            props: {
                data: [],
                siteUrl,
            },
        };
    }
};


const ApplyNow = ({ siteUrl, homePopupSlider, applyNow }) => {



    const [schoolData, setschoolData] = useState([]);
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        fetch(`${siteUrl}/api/navbar-menu-headers?populate=*`)
            .then((response) => response.json())
            .then((data) => {
                setApiData(data);
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    }, [siteUrl]);


    useEffect(() => {
        fetch(`${siteUrl}/api/menus?filters[slug][$eq]=school-links&nested&populate=*`)
            .then((response) => response.json())
            .then((data) => {
                const items = data?.data[0]?.attributes?.items?.data;
                setschoolData(items);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [siteUrl]);



    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const videoId1 = applyNow?.attributes?.Section_02_Primary_Video_ID; // from first API endpoint
    const videoId2 = applyNow?.attributes?.Section_02_Secondary_Video_ID; // from second API endpoint

    const handleOpenModal = (videoType) => {
        let videoUrl;

        if (videoType === 'video1' && videoId1) {
            videoUrl = `https://www.youtube.com/embed/${videoId1}?rel=0&autoplay=1`;
        } else if (videoType === 'video2' && videoId2) {
            videoUrl = `https://www.youtube.com/embed/${videoId2}?rel=0&autoplay=1`;
        }

        // Ensure the video URL is valid before opening the modal
        if (videoUrl) {
            setVideoUrl(videoUrl);
            setShowModal(true);
        } else {
            // Handle case where video is not available
            alert("Video not available!");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setVideoUrl('');
    };


    const maxLength = Math.max(applyNow.attributes.Banner_Images.data.length, applyNow.attributes.Banner_Images.data.length);

    const bannerData = Array.from({ length: maxLength }, (_, index) => {
        const desktopImage = applyNow.attributes.Banner_Images.data[index] || null;
        const mobileImage = applyNow.attributes.Banner_Images.data[index] || null;

        return {
            id: index + 1,
            Mobile_url: mobileImage ? mobileImage.attributes.url : null,
            Desktop_url: desktopImage ? desktopImage.attributes.url : null,
        };
    });

    const formRef = useRef(null);

    return (
        <main className='apply-now-page'>
            {/* <NavBar siteUrl={siteUrl} /> */}

            {/* ====================================================================== s1*/}
            <header className='fixed-top bg-black z-10'>
                <div className="container">
                    <div className="d-flex justify-content-between py-2">
                        <div className='w-auto d-inline-flex align-items-center gap-3'>
                            <Link href="/">
                                {apiData && apiData.data && apiData.data.length > 0 && (
                                    <img
                                        style={{ width: '60px' }}
                                        src={`${siteUrl}${apiData.data[0].attributes.logo?.data?.attributes?.url}`}
                                        alt="Transpro"
                                    />
                                )}
                            </Link>
                            {/* <a href='#'>
                                <img style={{ width: '60px' }} src='assets/img/north-banglor/logo-top.webp' alt='' />
                            </a> */}
                            <h3 className='d-none d-lg-block fs-20 text-white text-uppercase fw-500'> {schoolData && schoolData.length > 0 && schoolData[0].attributes.title}</h3>

                        </div>
                        <div className="w-auto d-inline-flex justify-content-lg-end align-items-center gap-3">
                            <div className='d-none d-lg-flex text-white d-flex align-items-center gap-3'>
                                <i class="fa-solid fa-phone"></i>
                                {apiData && apiData.data && apiData.data.length > 0 &&
                                    <a className='tele-apn' href={apiData.data[0].attributes.number_link}>{apiData.data[0].attributes.number}</a>
                                }
                                {/* <a href="tel:9606354017">9606354017</a> */}
                            </div>

                            <button
                                onClick={() => {
                                    // Scroll to the element with the ID 'apply-form-xx1'
                                    const target = document.getElementById('apply-form-xx1');
                                    if (target) {
                                        target.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="enquire-btn rounded-pill d-flex align-items-center text-black gap-2 justify-content-center"
                            >
                                <span>Enquire Now</span>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </header>
            {/* <WhatsAppButton/> */}
            <section className='position-relative overflow-hidden'>
                <div className='position-absolute start-0 top-0 w-100 h-100'>
                    <MainSlider
                        settings={{
                            dots: false,
                            infinite: true,
                            autoplaySpeed: 1500,
                            speed: 500,
                            fade: true,
                            cssEase: "linear",
                            slidesToShow: 1,
                            autoplay: true,
                            responsive: [
                                {
                                    breakpoint: 768,
                                    settings: { slidesToShow: 2 },
                                },
                            ],
                        }}
                        className="custom-slider-nb-a1">

                        {bannerData.map((item) => (
                            <div key={item.id}>
                                <div className="image-wrap">
                                    <img
                                        className="w-100 h-100 object-fit-cover"
                                        src={siteUrl + item.Mobile_url}
                                        alt={''}
                                    />
                                </div>
                            </div>
                        ))}

                    </MainSlider>
                </div>

                <div className='position-relative py-4 px-3 px-lg-5'>
                    <div className='position-absolute start-0 top-0 w-100 h-100 overlay-black-ap-nw'></div>
                    <div className='d-lg-flex align-items-end justify-content-between position-relative'>
                        <div className='ap-nw-ban-cont-a2'>
                            <div className='text-center text-lg-start'>
                                <h2 className="fs-32 fs-md-46 fs-lg-56 fw-600 text-white" style={{ color: "#C89E01" }}>Join <span style={{ color: '#f2c006' }}>{applyNow.attributes.Banner_Title}</span> </h2>
                                <h4 className="fs-20 fs-md-22 fs-lg-24 fw-500 text-white"><i className="fa-solid fa-location-dot pe-2"></i>
                                    {applyNow.attributes.Banner_Subtitle}
                                </h4>
                            </div>
                        </div>
                        <div className="position-relative" id="apply-form-xx1">
                            <div
                                className="bg-white p-3 p-lg-4 banner-nb-from"
                                ref={formRef}
                            >
                                <AddEnqForm siteUrl={siteUrl} />
                            </div>

                            <div className='d-lg-none position-relative'>
                                <FloatContact apiData={apiData} targetRef={formRef} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ====================================================================== s2*/}
            <section className='' style={{ backgroundColor: '#F8FFEF' }}>
                <div className="bg-[#874487] py-6">
                    <div className="importantDiv cursor-pointer">
                        {/* <Marquee className="imp">
                            <span className="mx-3 impSpan">{AdmissionOpen}!!!</span>
                        </Marquee> */}
                        <div className="scrolling-container">
                            <div className="scrolling-text d-flex align-items-center gap-4">
                                <span style={{ color: "#c89e01" }}>{applyNow.attributes.Admission_Year}</span>
                                <span className="separator" style={{ color: "#c89e01" }}>♦</span>
                                <span style={{ color: "#17436d" }}>Admission Open</span>
                                <span className="separator">♦</span>
                                <span style={{ color: "#c89e01" }}>{applyNow.attributes.Admission_Year}</span>
                                <span className="separator" style={{ color: "#c89e01" }}>♦</span>
                                <span style={{ color: "#17436d" }}>Admission Open</span>
                                <span className="separator">♦</span>
                                <span style={{ color: "#c89e01" }}>{applyNow.attributes.Admission_Year}</span>
                                <span className="separator" style={{ color: "#c89e01" }}>♦</span>
                                <span style={{ color: "#17436d" }}>Admission Open</span>
                                <span className="separator">♦</span>
                                <span style={{ color: "#c89e01" }}>{applyNow.attributes.Admission_Year}</span>
                                <span className="separator" style={{ color: "#c89e01" }}>♦</span>
                                <span style={{ color: "#17436d" }}>Admission Open</span>
                                <span className="separator">♦</span>
                                {/* <span className="separator">♦</span>
                                <span>2024–2025</span>
                                <span className="separator">♦</span>
                                <span>Admission Open</span>
                                <span className="separator">♦</span>
                                <span>2024–2025</span>
                                <span className="separator">♦</span>
                                <span>Admission Open</span> */}
                            </div>
                        </div>
                    </div>
                    {/* <MainSlider
                        settings={{
                            dots: false,
                            infinite: true,
                            speed: 1200,
                            autoplaySpeed: 1200,
                            cssEase: "linear",
                            slidesToShow: 3,
                            rtl: true,
                            autoplay: true,

                            responsive: [
                                {
                                    breakpoint: 768,
                                    settings: { slidesToShow: 2 },
                                },
                            ],
                        }}
                    >
                        {AdmissionOpen.map((item, id) => (
                            <div key={id} className='d-flex justify-content-center w-25'>
                                {item}
                            </div>
                        ))}

                    </MainSlider> */}
                    {/* <div className="d-flex justify-content-between">
                        <div>
                            <h4>Admission Open</h4>
                        </div>
                        <div>
                            <h4>2024-2025</h4>
                        </div>
                        <div>
                            <h4>Admission Open</h4>
                        </div>
                        <div>
                            <h4>2024-2025</h4>
                        </div>
                    </div> */}
                </div>
            </section>
            {/* ================================================================ s3*/}
            <section className="section">
                <div className='container'>
                    <h2 className="fs-32 fs-md-40 fs-lg-48 mb-5 text-center" style={{ color: '#17436D' }}>{applyNow?.attributes?.Section_01_Title}<span style={{ color: '#C89E01' }}> Overview</span> </h2>

                    <div className="row text-center Overview-s3-a1 mx-auto">
                        {applyNow.attributes.Comm_Overview && applyNow.attributes.Comm_Overview.map((stat, index) => (
                            <div className="col-4 px-2" key={index}>
                                <h4
                                    className="fs-20 fs-md-34 fs-lg-40 fw-600 lh-1">
                                    {stat.Title}
                                    <br />
                                    <span className="fs-14 fs-md-16 fs-lg-20 fw-400 text-black">{stat.Sub_Title}</span>
                                </h4>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
            {/* ================================================================ s4*/}
            <section className="section" style={{ backgroundColor: '#F7FEEE' }}>
                <div className='container'>
                    <div className='section-title mb-5'>
                        <h2 className="fs-32 fs-md-40 fs-lg-48 mb-3 text-center" style={{ color: '#17436D' }}>{applyNow?.attributes?.Section_02_Title}<span style={{ color: '#C89E01' }}> Campus</span> </h2>
                        <div className='col-8 mx-auto'>
                            <p className='fs-16 fs-md-18 fs-lg-20 fw-500 text-black text-center'>{applyNow?.attributes?.Section_02_Content}</p>

                        </div>
                    </div>
                    <div className='campus-s4-a1 mx-auto'>
                        <div className='d-flex flex-column flex-lg-row gap-lg-5'>
                            <div className='col-12 col-lg-5 position-relative item-wrap'>

                                <div className={`img-wrap position-relative w-100 h-100 object-fit-cover ${isHovered ? 'hovered' : ''}`}>
                                    <img className={`img-1 rounded-4 w-100 h-100 object-fit-cover p-2 bg-white ${isHovered ? 'hovered-img-1' : ''}`} src={siteUrl + (applyNow?.attributes?.Sec_02_images?.data?.[0]?.attributes?.url || '')} alt='' />
                                </div>
                                <div className={`position-absolute bottom-0 left-0 img-wrap w-100 h-100 object-fit-cover ${isHovered ? 'hovered' : ''}`}>
                                    <img className={`img-2 rounded-4 w-100 h-100 object-fit-cover p-2 bg-white ${isHovered ? 'hovered-img-2' : ''}`} src={siteUrl + (applyNow?.attributes?.Sec_02_images?.data?.[1]?.attributes?.url || '')} alt='' />
                                </div>
                            </div>
                            <div className='col-12 col-lg-7'>
                                <article>
                                    <div className='px-4'>
                                        <ReactMarkdown>
                                            {applyNow?.attributes?.Section_02_Right_Side_Content}
                                        </ReactMarkdown>
                                        <button
                                            className='text-uppercase view-f-btn-a2 fs-16 fw-600 text-decoration-underline mt-4'
                                            style={{ color: '#707861' }}
                                            onMouseEnter={() => setIsHovered(true)} // When button is hovered
                                            onMouseLeave={() => setIsHovered(false)} // When button is unhovered
                                        >
                                            View Facilities
                                        </button>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row mt-4 gap-4">
                                        {videoId1 && (
                                            <button
                                                className="enquire-btn rounded-pill"
                                                onClick={() => handleOpenModal('video1')}
                                            >
                                                <span>Pre-Primary Tour</span>
                                                <i className="fa-regular fa-circle-play"></i>
                                            </button>
                                        )}

                                        {videoId2 && (
                                            <button
                                                className="enquire-btn rounded-pill"
                                                onClick={() => handleOpenModal('video2')}
                                            >
                                                <span>Senior Secondary Tour</span>
                                                <i className="fa-regular fa-circle-play"></i>
                                            </button>
                                        )}
                                    </div>

                                    <div>
                                        {videoUrl && (
                                            <VideoModal
                                                show={showModal}
                                                onHide={handleCloseModal}
                                                videoUrl={videoUrl}
                                            />
                                        )}
                                    </div>

                                    {/* <VideoModal
                                        show={showModal}
                                        onHide={handleCloseModal}
                                        videoUrl={videoUrl}
                                    /> */}
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ================================================================ s5 */}
            <section className="section">
                <div className='container'>
                    <div className='section-title mb-5'>
                        <h4 className='fs-20 text-center mb-2 text-uppercase' style={{ color: '#343434' }}>{applyNow?.attributes?.Section_03_Sub_Title}</h4>
                        <h2 className="fs-md-40 fs-lg-48 mb-5 text-center" style={{ color: '#17436D' }}>{applyNow?.attributes?.Section_03_Title} <span style={{ color: '#C89E01' }}>Landscape</span> </h2>
                    </div>

                    <div className="d-flex flex-column flex-lg-row justify-content-center align-item-center landscape-s5-a1">
                        {applyNow?.attributes?.Section_03_Components.map((item, index) => (
                            <div className="position-relative" key={index}>
                                {item?.image?.data?.attributes?.url && <img
                                    className="position-absolute top-0 left-0 z-0"
                                    src={siteUrl + item?.image?.data?.attributes?.url}
                                    alt="" style={{ filter: "brightness(70%)" }}
                                />
                                }
                                <article className="position-relative d-flex flex-column justify-content-end align-items-center pb-3 ">
                                    <h4 className="fs-24 fw-600 text-white">{item.Text_01}</h4>
                                    <h5 className='fs-16 fw-400 text-white'>{item.Text_02}</h5>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ================================================================ s6*/}
            <section className="section">
                <div className='container'>
                    <div className='section-title mb-3 mb-lg-5'>
                        <h4 className='fs-20 text-center mb-2 text-uppercase' style={{ color: '#343434' }}>{applyNow?.attributes?.Section_04_Sub_Title}</h4>
                        <h2 className="fs-md-40 fs-lg-48 mb-5 text-center" style={{ color: '#17436D' }}>{applyNow?.attributes?.Section_04_Title} <span style={{ color: '#C89E01' }}>Books</span> </h2>
                    </div>
                    <div className="row education-s6-a1 row-gap-3">
                        {applyNow?.attributes?.Beyond_Books_Contents &&
                            applyNow?.attributes?.Beyond_Books_Contents.map((item, id) => {
                                return (
                                    <div className="col-lg-3 mx-auto" key={id}>
                                        <div className="item-wrap">
                                            <img src={siteUrl + item?.image?.data?.attributes?.url} alt="image" />
                                            <div className='d-flex gap-2 justify-content-center py-2'>
                                                <span style={{ color: '#C89E01' }}>{item.Text_01}</span>
                                                <span >{item.Text_02}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                    </div>
                </div>
            </section>
            <section className='py-5'>
                <div className='container'>
                    <div className=''>
                        <h3 className='text-uppercase text-center fs-14 fs-md-22 fs-lg-24 fw-500'>Things to note</h3>
                        <h2 className='fs-32 fs-md-40 fs-lg-56 fw-600 text-center'>FAQs</h2>
                        <MainAccordion accordionData={applyNow?.attributes?.FAQs} />
                    </div>
                </div>
            </section>
            {/* <Footer siteUrl={siteUrl} /> */}
            <FooterApplyNow siteUrl={siteUrl} />

        </main >
    )
}

export default ApplyNow