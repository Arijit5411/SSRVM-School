import React, { useState, useEffect } from 'react';
import AdmissionEnquiry from './AdmissionEnquiry';
import ContentPopup from './Popups/ContentPopup'
import MainSlider from './Sliders/MainSlider1'
import Image from 'next/image';

const HomeAutoPopup = ({ data, siteUrl }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    // useEffect(() => {
    //     setPopupOpen(true);
    // }, [])

    // const togglePopup = () => {
    //     setPopupOpen(!popupOpen);
    // };


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setPopupOpen(true);
                window.removeEventListener("scroll", handleScroll); // Remove listener after showing popup
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const togglePopup = () => {
        setPopupOpen(!popupOpen);
    };

    return (
        <>
            {(data?.attributes?.Enable_Disable === true) &&
                <>
                    {(data?.attributes?.Image_Slider?.data) ?
                        <ContentPopup className="home-auto-popup" onOpen={popupOpen} onClose={() => setPopupOpen(false)}>
                            <MainSlider className="home-popup-slider" settings={{ slidesToShow: 1, autoplay: true }}>
                                {data?.attributes?.Image_Slider?.data.map((item) => {
                                    const Wrapper = item.url ? Link : 'div';
                                    return (
                                        <div className="slider-item" key={item.id}>
                                            <Wrapper {...(item.url ? { href: item.url, target: '_blank' } : {})} className="d-block h-100" href={item?.attributes?.caption}>
                                                <Image
                                                    src={siteUrl + item?.attributes?.url}
                                                    alt="Descriptive alt text"
                                                    width={800}
                                                    height={800}
                                                    priority={item.id === 1} // 👈 Ensures early load (critical for LCP)
                                                />
                                            </Wrapper>
                                        </div>
                                    )
                                })}
                            </MainSlider>
                        </ContentPopup> : popupOpen && <AdmissionEnquiry siteUrl={siteUrl} onClose={togglePopup} />
                    }
                </>
            }
        </>

        // 346627426_935123594415127_4622536987581362716_n.jpg
    )
}

export default HomeAutoPopup