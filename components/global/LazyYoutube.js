import { useState } from "react";

export default function LazyYoutube({ videoURL }) {
    const [loadVideo, setLoadVideo] = useState(false);

    function extractVideoId(url) {
        if (!url || typeof url !== "string") return null;

        const regExp =
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = url.match(regExp);
        return match ? match[1] : null;
    }


    const videoId = extractVideoId(videoURL);


    if (!videoId) return null; // prevent rendering if videoId is invalid
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div
            className="youtube-container"
            onClick={() => setLoadVideo(true)}
        >
            {loadVideo ? (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-iframe"
                    title="YouTube Video"
                ></iframe>
            ) : (
                <>
                    <img
                        src={thumbnail}
                        alt="YouTube Thumbnail"
                        className="youtube-thumbnail"
                    />
                    <div className="youtube-overlay">
                        <div className="youtube-play-button">▶</div>
                    </div>
                </>
            )}
        </div>
  );
}