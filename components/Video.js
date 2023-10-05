import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { FaPlay } from "react-icons/fa";


const Video = ({ videoUrl }) => {
  const [isOpen, setOpen] = useState(false);

  const getVideoIdFromUrl = (url) => {
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([^\s&]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const videoId = getVideoIdFromUrl(videoUrl);

  return (
    <>
      {/* video-area start */}
      <div className='video-area pd-top-120 pd-bottom-120'>
        <div className='video-thumb-wrap '>
          <iframe
            width="635"
            height="395"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameborder="0"
            allowfullscreen
          ></iframe>
          <span
            className='video-play-btn cursor-pointer'
            data-effect='mfp-zoom-in'
            onClick={() => setOpen(true)}
          >
            <FaPlay />
          </span>
        </div>
      </div>
      {/* video-area end */}
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

export default Video;
