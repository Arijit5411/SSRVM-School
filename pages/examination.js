import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Head from 'next/head';
// import Seo from './Seo';


import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/examinations?populate[syllabus][populate]=*&populate[schedule][populate]=*&populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            optionData: data1,
            siteUrl
        }
    }
} catch (error) {
  console.error("Error fetching data:", error.message);

  return {
    props: {
      data: [],
    },
  };
}
};
const Examination = ({ seodata, optionData,siteUrl }) => {
    const [selectedOption, setSelectedOption] = useState('class0');
   

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleDownloadSyllabus = () => {
        // Map each option value to its corresponding syllabus URL
        // const syllabusUrls = {
        //     class0: '',
        //     class1: class_XII_pdf,
        //     class2: class_XI_pdf,
        //     class3: class_X_pdf,
        //     class4: class_IX_pdf,
        //     class5: class_VIII_pdf,
        //     class6: class_VII_pdf,
        //     class7: class_VI_pdf,
        //     class8: class_V_pdf,
        //     class9: class_IV_pdf,
        //     class10: class_III_pdf,
        //     class11: class_II_pdf,
        //     class12: class_I_pdf,
        // };

        // const selectedUrl = syllabusUrls[selectedOption];

        // if (selectedUrl) {
        let url
        if (selectedOption) {
            // Create a dummy link and simulate a click to download the syllabus
            examination?.syllabus.filter(opt => {
                if (opt.title === selectedOption) {
                    url = siteUrl + opt?.file?.data?.attributes?.url
                }
            })
            const link = document.createElement('a');
            // link.href = selectedUrl;
            link.href = url;
            link.target = '_blank';
            link.download = 'syllabus.pdf';
            link.click();
        }
    };

    const [examination, setExamination] = useState(null);
    const [hasFile, setHasFile] = useState(false)

    useEffect(() => {
        // fetch(`${siteUrl}/api/examinations?populate=*`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setExamination(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (optionData && optionData?.data && optionData?.data?.length > 0) {
            setExamination(optionData?.data[0]?.attributes)
        }
    }, []);

    

    useEffect(() => {
        let url
        if (selectedOption) {
            // Create a dummy link and simulate a click to download the syllabus
            examination?.syllabus.filter(opt => {
                if (opt.title === selectedOption) {
                    url = opt?.file?.data?.attributes?.url
                }
            })
        }
        console.log('url', url);
        if (url && url.length > 0) {
            setHasFile(true)
        } else {
            setHasFile(false)
        }
    }, [selectedOption])

    const page_title = `${examination?.page_title}`
    const paragraph_1 = `${examination?.paragraph_1}`
    const syllabus_heading = `${examination?.syllabus_heading}`
    const select_class = `${examination?.select_class}`
    const download_button = `${examination?.download_button}`
    const schedule_heading = `${examination?.schedule_heading}`
    const exam_midterm = `${examination?.exam_midterm}`
    const exam_unit = `${examination?.exam_unit}`
    const exam_fullterm = `${examination?.exam_fullterm}`

    const exam_midterm_pdf = `${siteUrl}${examination?.exam_midterm_pdf?.data?.attributes?.url}`;
    const exam_unit_pdf = `${siteUrl}${examination?.exam_unit_pdf?.data?.attributes?.url}`;
    const exam_fullterm_pdf = `${siteUrl}${examination?.exam_fullterm_pdf?.data?.attributes?.url}`;

    const class_XII_pdf = `${siteUrl}${examination?.class_XII_pdf?.data?.attributes?.url}`;
    const class_XI_pdf = `${siteUrl}${examination?.class_XI_pdf?.data?.attributes?.url}`;
    const class_X_pdf = `${siteUrl}${examination?.class_X_pdf?.data?.attributes?.url}`;
    const class_IX_pdf = `${siteUrl}${examination?.class_IX_pdf?.data?.attributes?.url}`;
    const class_VIII_pdf = `${siteUrl}${examination?.class_VIII_pdf?.data?.attributes?.url}`;
    const class_VII_pdf = `${siteUrl}${examination?.class_VIII_pdf?.data?.attributes?.url}`;
    const class_VI_pdf = `${siteUrl}${examination?.class_VIII_pdf?.data?.attributes?.url}`;
    const class_V_pdf = `${siteUrl}${examination?.class_VIII_pdf?.data?.attributes?.url}`;
    const class_IV_pdf = `${siteUrl}${examination?.class_IV_pdf?.data?.attributes?.url}`;
    const class_III_pdf = `${siteUrl}${examination?.class_III_pdf?.data?.attributes?.url}`;
    const class_II_pdf = `${siteUrl}${examination?.class_II_pdf?.data?.attributes?.url}`;
    const class_I_pdf = `${siteUrl}${examination?.class_I_pdf?.data?.attributes?.url}`;
    console.log('sd', seodata)

    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"examination"} />

                {/* <Head>
                    <title>{seoData.title}</title>
                    {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                    {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
                </Head> */}
                <NavBar siteUrl={siteUrl}/>
                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}
                {examination && (
                    <section className="top-section34">
                        <section className="wrap-item-timing-se1">
                            <div className="container">
                                <div className="wrap-item-timing">
                                    <h1 className="wrap-heading-sch">{page_title}
                                    </h1>
                                    <p className="wrap-proj">
                                        {paragraph_1 && <span
                                            dangerouslySetInnerHTML={{ __html: paragraph_1.replace(/\n/g) }}></span>}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container">
                                <div className="wrap-heading-sch">
                                    <h3 className="wrap-heading-sch">{syllabus_heading}
                                        {/* Syllabus */}
                                    </h3>
                                </div>
                                <div className="wrap-dropdown-examination">
                                    <select className="dropexamination" value={selectedOption} onChange={handleChange}>
                                        <option value="class0">{select_class}</option>
                                        {
                                            examination?.syllabus.length > 0 && examination?.syllabus.map(opt => {
                                                return (
                                                    <option value={opt?.title}>{opt?.title}</option>
                                                )
                                            })
                                        }
                                        {/* <option value="class1">XII</option>
                                        <option value="class2">XI</option>
                                        <option value="class3">X</option>
                                        <option value="class4">IX</option>
                                        <option value="class5">VIII</option>
                                        <option value="class6">VII</option>
                                        <option value="class7">VI</option>
                                        <option value="class8">V</option>
                                        <option value="class9">IV</option>
                                        <option value="class10">III</option>
                                        <option value="class11">II</option>
                                        <option value="class12">I</option> */}
                                    </select>

                                    <div>
                                        {
                                            selectedOption !== 'class0' && hasFile ? (
                                                <button className="footerbtn wrap-btn-examination" onClick={handleDownloadSyllabus}>
                                                    {download_button}
                                                    {/* Download Syllabus */}
                                                </button>
                                            ) : selectedOption !== 'class0' && hasFile === false ? <h6>No Syllabus available!</h6> : <h6>Select a Class!</h6>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="container sec-third">
                            <h4 className="title">{schedule_heading}
                                {/* Schedule */}
                            </h4>
                            <div className="row">
                                {
                                    examination?.schedule.length > 0 && examination?.schedule.map(exam => {
                                        return (
                                            exam?.title && exam?.file?.data?.attributes?.url && (<div key={exam?.id} className="col-lg-6 wrap-schedule">
                                                <div className="sche-item">
                                                    <a href={`${siteUrl}${exam?.file?.data?.attributes?.url}`} download>{exam?.title}
                                                    </a>
                                                </div>
                                            </div>
                                            )
                                        )
                                    })
                                }
                                {/* <div className="col-lg-6 wrap-schedule">
                                    <div className="sche-item">
                                        <a href={exam_midterm_pdf} download>{exam_midterm}
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6 wrap-schedule">
                                    <div className="sche-item">
                                        <a href={exam_unit_pdf} download>{exam_unit}
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6 wrap-schedule">
                                    <div className="sche-item">
                                        <a href={exam_fullterm_pdf} download>{exam_fullterm}
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </section>

                    </section>
                )}
                <Footer siteUrl={siteUrl}/>

            </Fragment>
        </>
    );
};

export default Examination;