import Link from 'next/link'
import React from 'react'

const HomeFacebook = ({FacebookUrl, FacebookIframe}) => {
    return (
        <div className='row'>
            <div className="col-lg-5">
                <div className="pe-xxl-5 h-100">
                    <div className=" d-md-flex align-items-center justify-content-between">
                        <h4 className="fs-30 fw-700 color-1">Facebook</h4>
                        <div className="btn-wrap">
                            <Link href={FacebookUrl} target="_blank" className="def-btn btn-8">Follow us on Facebook</Link>
                        </div>
                    </div>
                    <div className="facebook-timeline h-100 mt-5">
                        <iframe
                            src={FacebookIframe}
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
    )
}

export default HomeFacebook


// import Link from 'next/link';
// import React from 'react';

// const HomeFacebook = ({ FacebookUrl, FacebookIframe }) => {
//     return (
//         <div className="row">
//             <div className="col-lg-5">
//                 <div className="pe-xxl-5 h-100">
//                     <div className="d-md-flex align-items-center justify-content-between">
//                         <h4 className="fs-30 fw-700 color-1">Facebook</h4>
//                         <div className="btn-wrap">
//                             <Link href={FacebookUrl} target="_blank" className="def-btn btn-8">Follow us on Facebook</Link>
//                         </div>
//                     </div>
//                     <div className="facebook-timeline h-100 mt-5" style={{minHeight: '600px'}}>
//                         <iframe
//                             src={FacebookIframe}
//                             style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
//                             scrolling="no"
//                             frameBorder="0"
//                             allowFullScreen={true}
//                             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//                         ></iframe>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//                 .facebook-timeline iframe {
//                     width: 100%;
//                     max-width: 500px;
//                     height: 600px;
//                 }
                
//                 /* Adjust iframe size for mobile screens */
//                 @media (max-width: 767px) {
//                     .facebook-timeline iframe {
//                         width: 100%;
//                         height: 400px;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// }

// export default HomeFacebook;


