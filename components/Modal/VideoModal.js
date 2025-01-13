import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const VideoModal = ({ show, onHide, videoUrl }) => {
  return (
    <Modal show={show} onHide={onHide} centered className="custom-modal">
      <Modal.Body className="p-0">
        <iframe
          width="100%"
          height="100%"
          objectfit="cover"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
