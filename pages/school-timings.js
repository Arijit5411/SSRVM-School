import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';


import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/ssa-school-timing-pages`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
             data1,
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

const School_Timings = ({ seodata,timings, data1,siteUrl }) => {
    console.log('data>>>>',data1.data[0].attributes.page_title)
    const [schoolTimings, setSchoolTimings] = useState();
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/ssa-school-timing-pages`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setSchoolTimings(data.data[0].attributes);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (timings && timings?.data && timings?.data?.length > 0) {
            setSchoolTimings(timings?.data[0].attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[43].attributes;
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
            const seoAttributes = seodata.data[43].attributes;
            console.log('s', seoAttributes);
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const page_title = `${schoolTimings?.page_title}`;

    const key1 = `${schoolTimings?.key1}`;
    const key2 = `${schoolTimings?.key2}`;
    const key3 = `${schoolTimings?.key3}`;
    const key4 = `${schoolTimings?.key4}`;
    const key5 = `${schoolTimings?.key5}`;
    const key6 = `${schoolTimings?.key6}`;
    const key7 = `${schoolTimings?.key7}`;
    const key8 = `${schoolTimings?.key8}`;

    const value1 = `${schoolTimings?.value1}`;
    const value2 = `${schoolTimings?.value2}`;
    const value3 = `${schoolTimings?.value3}`;
    const value4 = `${schoolTimings?.value4}`;
    const value5 = `${schoolTimings?.value5}`;
    const value6 = `${schoolTimings?.value6}`;
    const value7 = `${schoolTimings?.value7}`;
    const value8 = `${schoolTimings?.value8}`;

    const paragraph_1 = `${schoolTimings?.paragraph_1}`;
    const paragraph_2 = `${schoolTimings?.paragraph_2}`;

    const key_head_class = `${schoolTimings?.key_head_class}`;
    const value_head_bus_timing = `${schoolTimings?.value_head_bus_timing}`;

    const below_key1 = `${schoolTimings?.below_key1}`;
    const below_key2 = `${schoolTimings?.below_key2}`;
    const below_key3 = `${schoolTimings?.below_key3}`;

    const below_value1 = `${schoolTimings?.below_value1}`;
    const below_value2 = `${schoolTimings?.below_value2}`;
    const below_value3 = `${schoolTimings?.below_value3}`;

    return (
        <>
            <Fragment>
                {console.log(schoolTimings)}
                <Head>
                    <title>{seoData.title}</title>
                    {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                    {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
                </Head>
                <NavBar siteUrl={siteUrl}/>

                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}
                <div className="container">
                    <div className='d-flex flex-column justify-content-center align-items-start' style={{ margin: '10rem 0 6rem 0' }} dangerouslySetInnerHTML={{
                        __html: schoolTimings?.page_content,
                    }}></div>
                </div>
                 <div className="top-section1-new">
                    <section className="wrap-item-timing-se1">
                        <div className="container">
                            <div className="wrap-item-timing">
                                <h2 className="wrap-heading-sch">
                                    {data1.data[0].attributes.page_title}
                                </h2>
                            </div>
                        </div>
                    </section>

                    <section className="container wrap-item-timing-sec2">
                        <div className="wrap-timing-item marginTopExternal">
                            <div className="accordion-item">
                                <div>
                                    <div className="accordion-body">
                                        <table className="table-bordered-timing">
                                            <thead></thead>
                                            <tbody>
                                                <tr>
                                                    <th>{key1}</th>
                                                    <td>
                                                        {value1}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>{key2}</th>
                                                    <td>{value2}</td>
                                                </tr>
                                                <tr>
                                                    <th>{key3}</th>
                                                    <td>{value3}</td>
                                                </tr>
                                                <tr>
                                                    <th>{key4}</th>
                                                    <td>{value4}</td>
                                                </tr>
                                                <tr>
                                                    <th>{key5}</th>
                                                    <td>{value5}</td>
                                                </tr>
                                                <tr>
                                                    <th>{key6}</th>
                                                    <td>{value6}</td>
                                                </tr>
                                                <tr>
                                                    <th>{key7}</th>
                                                    <td>{value7}</td>
                                                </tr>
                                                <tr>
                                                    <th>{key8}</th>
                                                    <td>{value8}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section se2 mb-5 mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <p className="p-para-item">
                                        {paragraph_1 && (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: paragraph_1.replace(/\n/g, "<br />"),
                                                }}
                                            ></span>
                                        )}
                                    </p>
                                    <p className="p-para-item">
                                        {paragraph_2 && (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: paragraph_2.replace(/\n/g, "<br />"),
                                                }}
                                            ></span>
                                        )}
                                    </p>
                                </div>
                                <div className="col-lg-6">
                                    <div className="wrapper-table-school">
                                        <table className="wrap-table-timing">
                                            <thead className="wrap-item-3">
                                                <tr>
                                                    <th>{key_head_class}</th>
                                                    <th className="table-wrap-item">
                                                        {value_head_bus_timing}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="timeing-wrap">
                                                <tr>
                                                    <th>{below_key1}</th>
                                                    <td>{below_value1}</td>
                                                </tr>
                                                <tr>
                                                    <th>{below_key2}</th>
                                                    <td>{below_value2}</td>
                                                </tr>
                                                <tr>
                                                    <th>{below_key3}</th>
                                                    <td>{below_value3}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div> 
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default School_Timings;
