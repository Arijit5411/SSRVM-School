import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${siteUrl}/api/school-curriculum-pages?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            schoolCurr: data1
        }
    }
}

const SchoolCurriculum = ({ seodata, schoolCurr }) => {
    const [schoolCurriculum, setSchoolCurriculum] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/school-curriculum-pages?populate=*`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setSchoolCurriculum(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (schoolCurr && schoolCurr?.data && schoolCurr?.data?.length > 0) {
            setSchoolCurriculum(schoolCurr?.data[0]?.attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[15].attributes;
        //             setSeoData({
        //                 title: seoAttributes.title || '',
        //                 metaTitle: seoAttributes.metaTitle || '',
        //                 metaDescription: seoAttributes.metaDescription || '',
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching SEO data:', error);
        //     });
        if (seodata && seodata?.data && seodata?.data?.length > 0) {
            const seoAttributes = seodata.data[15].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const pageTitle = `${schoolCurriculum?.page_title}`
    const heading_1 = `${schoolCurriculum?.heading_1}`
    const heading_2 = `${schoolCurriculum?.heading_2}`
    const paragraph_1 = `${schoolCurriculum?.paragraph_1}`
    const paragraph_2 = `${schoolCurriculum?.paragraph_2}`

    const imgUrl1 = `${siteUrl}${schoolCurriculum?.image_1?.data?.attributes?.url}`;
    const imgUrl2 = `${siteUrl}${schoolCurriculum?.image_2?.data?.attributes?.url}`;

    const syllabusHeading = `${schoolCurriculum?.syllabus_heading}`

    const class_12 = `${schoolCurriculum?.class_12}`
    const class_11 = `${schoolCurriculum?.class_11}`
    const class_10 = `${schoolCurriculum?.class_10}`
    const class_9 = `${schoolCurriculum?.class_9}`
    const class_8 = `${schoolCurriculum?.class_8}`
    const class_7 = `${schoolCurriculum?.class_7}`
    const class_6 = `${schoolCurriculum?.class_6}`
    const class_5 = `${schoolCurriculum?.class_5}`
    const class_4 = `${schoolCurriculum?.class_4}`
    const class_3 = `${schoolCurriculum?.class_3}`
    const class_2 = `${schoolCurriculum?.class_2}`
    const class_1 = `${schoolCurriculum?.class_1}`
    const class_senior_kg = `${schoolCurriculum?.class_senior_kg}`
    const class_junior_kg = `${schoolCurriculum?.class_junior_kg}`

    const download_pdf_XII = `${siteUrl}${schoolCurriculum?.download_pdf_XII?.data?.attributes?.url}`;
    const download_pdf_XI = `${siteUrl}${schoolCurriculum?.download_pdf_XI?.data?.attributes?.url}`;
    const download_pdf_X = `${siteUrl}${schoolCurriculum?.download_pdf_X?.data?.attributes?.url}`;
    const download_pdf_9 = `${siteUrl}${schoolCurriculum?.download_pdf_9?.data?.attributes?.url}`;
    const download_pdf_8 = `${siteUrl}${schoolCurriculum?.download_pdf_8?.data?.attributes?.url}`;
    const download_pdf_7 = `${siteUrl}${schoolCurriculum?.download_pdf_7?.data?.attributes?.url}`;
    const download_pdf_6 = `${siteUrl}${schoolCurriculum?.download_pdf_6?.data?.attributes?.url}`;
    const download_pdf_5 = `${siteUrl}${schoolCurriculum?.download_pdf_5?.data?.attributes?.url}`;
    const download_pdf_4 = `${siteUrl}${schoolCurriculum?.download_pdf_4?.data?.attributes?.url}`;
    const download_pdf_3 = `${siteUrl}${schoolCurriculum?.download_pdf_3?.data?.attributes?.url}`;
    const download_pdf_2 = `${siteUrl}${schoolCurriculum?.download_pdf_2?.data?.attributes?.url}`;
    const download_pdf_1 = `${siteUrl}${schoolCurriculum?.download_pdf_1?.data?.attributes?.url}`;
    const download_pdf_senior_kg = `${siteUrl}${schoolCurriculum?.download_pdf_senior_kg?.data?.attributes?.url}`;
    const download_pdf_junior_kg = `${siteUrl}${schoolCurriculum?.download_pdf_junior_kg?.data?.attributes?.url}`;

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <Fragment>
                <NavBar />
                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <div className='top-section1-new'>
                    <div className="container">
                        <h1 className="principal-mess">{pageTitle}</h1>
                    </div>
                    <section>
                        <div className="container marginTopHeader">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className='title'>{heading_1}</h2>
                                    <p>
                                        {paragraph_1}
                                    </p>
                                </div>
                                <div className="col-lg-6">
                                    <img src={imgUrl1} alt='school' className="image-curriculum" />
                                </div>
                            </div>

                            <div className="row wrap-curric">
                                <div className="col-lg-6">
                                    <img src={imgUrl2} alt='school' className="image-curriculum" />
                                </div>
                                <div className="col-lg-6">
                                    <h2 className='title'>{heading_2}</h2>
                                    <p>
                                        {paragraph_2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="container sec-third">
                        <h4 className='title'>{syllabusHeading}</h4>
                        <div className='row'>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_12}</h4>
                                    <a href={download_pdf_XII} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_11}</h4>
                                    <a href={download_pdf_XI} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_10}</h4>
                                    <a href={download_pdf_X} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_9}</h4>
                                    <a href={download_pdf_9} download>Download</a>
                                </div>
                            </div>

                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_8}</h4>
                                    <a href={download_pdf_8} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_7}</h4>
                                    <a href={download_pdf_7} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_6}</h4>
                                    <a href={download_pdf_6} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_5}</h4>
                                    <a href={download_pdf_5} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_4}</h4>
                                    <a href={download_pdf_4} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_3}</h4>
                                    <a href={download_pdf_3} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_2}</h4>
                                    <a href={download_pdf_2} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4 wrap-syllabus'>
                                <div className='syl-item'>
                                    <h4>{class_1}</h4>
                                    <a href={download_pdf_1} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='syl-item'>
                                    <h4>{class_senior_kg}</h4>
                                    <a href={download_pdf_senior_kg} download>Download</a>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='syl-item'>
                                    <h4>{class_junior_kg}</h4>
                                    <a href={download_pdf_junior_kg} download>Download</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </Fragment>
        </>
    );
}

export default SchoolCurriculum;
