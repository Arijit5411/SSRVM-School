import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";


const AnnouncementPopup = ({ announcement, siteUrl }) => {
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
            {announcement?.attributes?.image?.data?.attributes?.url &&
              <img
                src={`${siteUrl}${announcement?.attributes?.image?.data?.attributes?.url}`}
                alt="school"
                className="imgPop"
              />
            }

            <p className="popUptext">
              <span className="popupTitle">
                {announcement.attributes.heading}
              </span>
              <br></br>
              <ReactMarkdown >
                {announcement.attributes.description}
              </ReactMarkdown>
            </p>


          </div>
        </Modal.Header>
      </Modal>
    </>
  );
}


export default AnnouncementPopup;
