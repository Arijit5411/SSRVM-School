import React, { useState, useEffect } from 'react';
import AdmissionEnquiry from './AdmissionEnquiry';

const HomeAutoPopup = ({ data, siteUrl }) => {
    const [showPopup1, setShowPopup1] = useState(false);
    useEffect(() => {
        setShowPopup1(true);
    }, [])

    const togglePopup1 = () => {
        setShowPopup1(!showPopup1);
    };

    return (
        <>
            {(data?.attributes?.Enable_Disable === true) &&
                showPopup1 && <AdmissionEnquiry siteUrl={siteUrl} onClose={togglePopup1} />
            }
        </>
    )
}

export default HomeAutoPopup