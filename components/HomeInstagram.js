// HomeInstagram.js
import Link from 'next/link';
import React from 'react';

const HomeInstagram = ({ InstagramUrl, InstagramIframe }) => {
  return (
    <div className="row">
      <div className="col-lg-5">
        <div className="pe-xxl-5 h-100">
          <div className="d-md-flex align-items-center justify-content-between">
            <h4 className="fs-30 fw-700 color-1">Instagram</h4>
            <div className="btn-wrap">
              <Link href={InstagramUrl} target="_blank" className="def-btn btn-8">
                Follow us on Instagram
              </Link>
            </div>
          </div>
          <div className="instagram-timeline h-100 mt-5">
            <iframe
              src={InstagramIframe}
              width="500"
              height="600"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInstagram;
