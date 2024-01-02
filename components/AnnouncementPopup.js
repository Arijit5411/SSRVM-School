import React, { useState } from "react";
import { Modal } from "react-bootstrap";

  const AnnouncementPopup = ({announcement,siteUrl}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);


  
  const openModal = () => {
    setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};

  
    return (
      <>
        <button type="button" className="btn-home" onClick={openModal}>
          Know more
        </button>
        <Modal show={modalIsOpen} onHide={closeModal}>
          <Modal.Header>
            <div className="displayFlex displayBlock">
              <img
                src={`${siteUrl}${announcement.attributes.image.data.attributes.url}`}
                alt="school"
                className="imgPop"
              />
              <p className="popUptext">
                <span className="popupTitle">
                  {announcement.attributes.heading}
                </span>
                <br></br>
                {announcement.attributes.description}
              </p>
            </div>
          </Modal.Header>
        </Modal>
      </>
    );
  }


export default AnnouncementPopup;
