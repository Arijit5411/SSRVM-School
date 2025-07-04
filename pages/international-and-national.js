import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';
import Image from "next/image";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/ssa-collaboration-pages?pagination[pageSize]=100&populate[school_name_and_title][populate]=*&populate[school_name_and_title2][populate]=*`)
    const res2 = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const data = await res.json()
    const data2 = await res2.json();

    return {
        props: {
            intandnat: data,
            seodata: data2?.data?.attributes?.Pages ?? {},
            siteUrl
        }
    };
} catch (error) {
  console.error("Error fetching data:", error.message);

  return {
    props: {
      data: [],
    },
  };
}
};

const International_and_National = ({ intandnat, siteUrl, seodata }) => {

    const [internationalAndNational, setInternationalAndNational] = useState(null);


    useEffect(() => {
        // fetch(`${siteUrl}/api/ssa-collaboration-pages?populate=*`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setInternationalAndNational(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (intandnat && intandnat?.data && intandnat?.data?.length > 0) {
            setInternationalAndNational(intandnat?.data[0]?.attributes)
        }
    }, []);

    const page_title = `${internationalAndNational?.page_title}`
    const descriptive_para = `${internationalAndNational?.descriptive_para}`
    const partnership_heading = `${internationalAndNational?.partnership_heading}`
    const kolkata_events = `${internationalAndNational?.events_heading}`

    const international = internationalAndNational?.school_name_and_title
    const local = internationalAndNational?.school_name_and_title2

    const image_1 = `${siteUrl}${internationalAndNational?.image_1?.data?.attributes?.url}`;
    const image_2 = `${siteUrl}${internationalAndNational?.image_2?.data?.attributes?.url}`;
    const image_3 = `${siteUrl}${internationalAndNational?.image_3?.data?.attributes?.url}`;
    const image_4 = `${siteUrl}${internationalAndNational?.image_4?.data?.attributes?.url}`;
    const image_5 = `${siteUrl}${internationalAndNational?.image_5?.data?.attributes?.url}`;
    const image_6 = `${siteUrl}${internationalAndNational?.image_6?.data?.attributes?.url}`;
    const image_7 = `${siteUrl}${internationalAndNational?.image_7?.data?.attributes?.url}`;
    const image_8 = `${siteUrl}${internationalAndNational?.image_8?.data?.attributes?.url}`;

    const title = `${internationalAndNational?.school_name_and_title[0]?.title}`
    const title1 = `${internationalAndNational?.school_name_and_title[1]?.title}`
    const title2 = `${internationalAndNational?.school_name_and_title[2]?.title}`
    const title3 = `${internationalAndNational?.school_name_and_title[3]?.title}`
    const title4 = `${internationalAndNational?.school_name_and_title[4]?.title}`
    const title5 = `${internationalAndNational?.school_name_and_title[5]?.title}`
    const title6 = `${internationalAndNational?.school_name_and_title2[0]?.title}`
    const title7 = `${internationalAndNational?.school_name_and_title2[1]?.title}`


    return (
        <>
            <Seo SeoData={seodata} PageSlug={"international-and-national"} />
            <Fragment>
                <NavBar siteUrl={siteUrl}/>
                <div className='top-pl-css'>
                    <section className="internationalpadding pri-item">
                        <div className="container">
                            <div className="wrap-item-text1 mobilehide-international">
                                <h1 className="principal-mess nationalfont">{page_title && <span dangerouslySetInnerHTML={{ __html: page_title.replace(/\n/g, "<br />") }}></span>}
                                </h1>
                                <p className="wrap-features">{descriptive_para && <span dangerouslySetInnerHTML={{ __html: descriptive_para.replace(/\n/g, "<br />") }}></span>}
                                </p>
                            </div>
                            <div className="wrap-item-text1 desktophide">
                                <h1 className="principal-mess nationalfont">{page_title && <span dangerouslySetInnerHTML={{ __html: page_title.replace(/\n/g, "") }}></span>}
                                </h1>
                                <p className="wrap-features">{descriptive_para && <span dangerouslySetInnerHTML={{ __html: descriptive_para.replace(/\n/g) }}></span>}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="container">
                        <h3>{partnership_heading}
                            {/* School Partnerships */}
                        </h3>
                        <div className="row">
                            {
                                international && international.length > 0 && international.map(school => {
                                    return (
                                        <>
                                            <div key={school?.id} className="col-lg-4">
                                                <div className="card wrap-inter">
                                                    <Image width={183} height={152} src={`${siteUrl}${school?.logo?.data?.attributes?.url}`} className="wrap-img-partners" alt={school?.title} />
                                                    <div className="card-body">
                                                        <p className="card-text-partners">{school?.title && <span dangerouslySetInnerHTML={{ __html: school?.title.replace(/\n/g, "<br />") }}></span>}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {/*                             
                            <div className="col-lg-4">
                                <div className="card wrap-inter">
                                    <img src={image_1} className="wrap-img-partners" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text-partners">{title && <span dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}></span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card wrap-inter">
                                    <img src={image_2} className="wrap-img-partners" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text-partners">{title1 && <span dangerouslySetInnerHTML={{ __html: title1.replace(/\n/g, "<br />") }}></span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card wrap-inter">
                                    <img src={image_3} className="wrap-img-partners" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text-partners">{title2 && <span dangerouslySetInnerHTML={{ __html: title2.replace(/\n/g, "<br />") }}></span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card wrap-inter">
                                    <img src={image_4} className="wrap-img-partners" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text-partners">{title3 && <span dangerouslySetInnerHTML={{ __html: title3.replace(/\n/g, "<br />") }}></span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card wrap-inter">
                                    <img src={image_5} className="wrap-img-partners" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text-partners">{title4 && <span dangerouslySetInnerHTML={{ __html: title4.replace(/\n/g, "<br />") }}></span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card wrap-inter">
                                    <img src={image_6} className="wrap-img-partners" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text-partners">{title5 && <span dangerouslySetInnerHTML={{ __html: title5.replace(/\n/g, "<br />") }}></span>}
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <h3 className="international-heading">{kolkata_events && <span dangerouslySetInnerHTML={{ __html: kolkata_events.replace(/\n/g, "<br />") }}></span>}
                            {/* Pan India Collaborative Events<br></br>conducted by SSA, Kolkata: */}
                        </h3>
                        <div className="row mb-5">
                            {
                                local && local.length > 0 && local.map(school => {
                                    return (
                                        <>
                                            <div key={school?.id} className="col-lg-6">
                                                <div className="card wrap-inter-pan">
                                                    <div className="wrap-last-ssa">
                                                        <Image width={183} height={152} src={`${siteUrl}${school?.logo?.data?.attributes?.url}`} className="wrap-img-pan" alt={school?.title} />
                                                        <div className="card-body">
                                                            <p className="card-text-partn">{school?.title && <span dangerouslySetInnerHTML={{ __html: school?.title.replace(/\n/g, "<br />") }}></span>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {/* <div className="col-lg-6">
                                <div className="card wrap-inter-pan">
                                    <div className="wrap-last-ssa">
                                        <img src={image_7} className="wrap-img-pan" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text-partn">{title6 && <span dangerouslySetInnerHTML={{ __html: title6.replace(/\n/g, "<br />") }}></span>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card wrap-inter-pan">
                                    <div className="wrap-last-ssa">
                                        <img src={image_8} className="wrap-img-pan" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text-partn">{title7 && <span dangerouslySetInnerHTML={{ __html: title7.replace(/\n/g, "<br />") }}></span>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
}

export default International_and_National;