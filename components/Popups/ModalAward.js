import { useEffect, useState } from 'react';

const ModalAward = ({ showModal, setShowModal, award }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (showModal) {
            setTimeout(() => {
                setActive(true);
            }, 400);
        } else {
            setActive(false);
        }
    }, [showModal]);

    const popupClose = () => {
        setActive(false);
        setTimeout(() => {
            setShowModal(false);
        }, 400);
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    if (!showModal) return null;

    return (
        <div className={`modal-backdrop-custom ${active ? 'active' : ''}`}>
            <div className="modal-content-custom">
                <button
                    className="close-button-custom"
                    onClick={popupClose}
                >
                    &times;
                </button>
                <div className='modal-content-inner'>
                    <h2 className="font-bold mb-4">{award.award_name}</h2>
                    <img src={award.imageUrl} alt={award.award_name} className="award-image-custom" />
                    <p className="text-lg">{award.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalAward;
