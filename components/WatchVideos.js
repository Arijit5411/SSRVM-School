import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const WatchVideo = ({ videoUrl }) => {
  const [isOpen, setOpen] = useState(false);

  const getVideoIdFromUrl = (url) => {
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([^\s&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const videoId = getVideoIdFromUrl(videoUrl);

  return (
    <>
      <div>
        <div className='btn-wrapper' onClick={() => setOpen(true)}>
          <a href='#' className='boxed-btn'>
            <span>Watch</span>
          </a>
        </div>
      </div>
      <ModalVideo
        channel='youtube'
        autoplay
        isOpen={isOpen}
        videoId={videoId} 
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default WatchVideo;
