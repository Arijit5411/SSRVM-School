import React, { useState, useEffect } from 'react';
import ContentPopup from './Popups/ContentPopup'
import MainSlider from './Sliders/MainSlider'

const HomeAutoPopup = ({ data, siteUrl }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    useEffect(() => {
        setPopupOpen(true);
    }, [])

    console.log("is", data)

    return (
        <>
            {(data?.attributes?.Enable_Disable === true) &&
                <ContentPopup className="home-auto-popup" onOpen={popupOpen} onClose={() => setPopupOpen(false)}>
                    <MainSlider className="home-popup-slider" settings={{ slidesToShow: 1, autoplay: true }}>
                        {data?.attributes?.Image_Slider?.data && data?.attributes?.Image_Slider?.data.map((item) => {
                            return (
                                <div className="slider-item">
                                    {item?.attributes?.caption ? 
                                        <a className="d-block h-100" href={item?.attributes?.caption}>
                                            <img src={siteUrl + item?.attributes?.url} alt="" />
                                        </a>
                                    : 
                                        <img src={siteUrl + item?.attributes?.url} alt="" />
                                    }
                                </div>
                            )
                        })}
                    </MainSlider>
                </ContentPopup>
            }
        </>
    )
}

export default HomeAutoPopup