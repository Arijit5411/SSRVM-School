// HomeInstagram.js
import Link from 'next/link';
import React, { useEffect } from 'react';

const HomeInstagram = ({ 
  InstagramUrl = '#', // Default to '#' if no URL is provided
  InstagramIframe 
}) => {
  useEffect(() => {
    if (InstagramIframe) {
      // Load Instagram embed script
      const script = document.createElement("script");
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);

      // Clean up script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [InstagramIframe]);

  return (
    <div className="row">
      <div className="col-lg-5">
        <div className="pe-xxl-5 h-100">
          <div className="d-md-flex align-items-center justify-content-between">
            <h4 className="fs-30 fw-700 color-1">Instagram</h4>
            <div className="btn-wrap">
              <Link href={InstagramUrl} target="_blank" rel="noopener noreferrer" className="def-btn btn-8">
                Follow us on Instagram
              </Link>
            </div>
          </div>
          <div className="instagram-timeline h-100 mt-5">
            {InstagramIframe ? (
              <div 
                dangerouslySetInnerHTML={{
                  __html: ` 
                    <blockquote className="instagram-media" data-instgrm-permalink="${InstagramIframe}" data-instgrm-version="12" style="width: 100%;">
                      <a href="${InstagramIframe}?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" rel="noopener noreferrer"></a>
                    </blockquote>
                  `,
                }}
              />
            ) : (
              <p>No Instagram post URL provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInstagram;
