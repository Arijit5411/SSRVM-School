import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useRouter } from 'next/router';


const AnnouncementPopup = ({ announcement, siteUrl, currID }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (announcement.id === currID?.id) {
      setModalIsOpen(true);

      // setTimeout(() => {
      //   const backdrops = document.querySelectorAll(".fade.modal-backdrop.show ~ .fade.modal-backdrop.show, .fade.modal.show ~ .fade.modal.show");

      //   if (backdrops.length > 1) {
      //     // Remove all backdrops except the last one
      //     for (let i = 0; i < backdrops.length - 1; i++) {
      //       backdrops[i].remove();
      //     }
      //   }
      // }, 100);

    } else {
      setModalIsOpen(false);
    }
  }, [currID]);

  const openModal = () => {
    setModalIsOpen(true);
    router.push(`#${announcement.id}`, undefined, { shallow: true });
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
