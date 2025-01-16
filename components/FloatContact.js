import { useState, useEffect } from 'react';

const FloatContact = ({ targetRef, apiData }) => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const { current } = targetRef || {};
            const { top, bottom } = current?.getBoundingClientRect() || {};
            setShowBanner(bottom < 0); // Show when element is scrolled past
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [targetRef]);

    if (!showBanner) return null;

    const contact = apiData?.data?.[0]?.attributes;

    return (
        <div className="scroll-down-banner">
            <div className="d-flex gap-2 align-items-center col-6">
                <i className="fa-solid fa-phone"></i>
                {contact && <a className="tele-apn" href={contact.number_link}>{contact.number}</a>}
            </div>
            {contact && (
                <a
                    className="tele-apn"
                    href={`https://wa.me/${contact.number_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/whatsApp.svg" alt="WhatsApp" />
                </a>
            )}
        </div>
    );
};

export default FloatContact;
