import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import School_Calender from "./school-calendar";
import Head from "next/head";
// import Seo from './Seo';

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${siteUrl}/api/monthly-calenders`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            calendar: data1,
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

const GoogleCalendar = ({ seodata, calendar,siteUrl }) => {
    const [calendarData, setCalendarData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/monthly-calenders`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setCalendarData(data.data);
        //         setIsLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data:", error);
        //         setIsLoading(false);
        //     });
        if (calendar && calendar?.data && calendar?.data?.length > 0) {
            setCalendarData(calendar.data);
            setIsLoading(false);
        } else {
            console.error("Error fetching data:");
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[17].attributes;
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
            const seoAttributes = seodata.data[17].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <Fragment>
                <NavBar siteUrl={siteUrl}/>

                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <div className="top-section1-new">
                    <div className="container">
                        <h1 className="principal-mess">Monthly Calendar</h1>
                    </div>
                </div>
                <section>
                    <div className="container marginTopHeader">
                        {isLoading ? (
                            <div className="loader"> Monthly Calendar is Loading...</div>
                        ) : (
                            calendarData.map((item) => (
                                <iframe
                                    key={item.id}
                                    src={item.attributes.calendar_link}
                                    style={{ border: "0" }}
                                    width="1350"
                                    height="800"
                                    frameBorder="0"
                                    scrolling="no"
                                ></iframe>
                            ))
                        )}
                    </div>
                </section>

                <School_Calender />

                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default GoogleCalendar;
