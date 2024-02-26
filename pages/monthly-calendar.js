import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import School_Calender from "./school-calendar";
import Head from "next/head";
// import Seo from './Seo';

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/monthly-calenders`);
    const res2 = await fetch(`${siteUrl}/api/calender-downloads?populate=*`);

    const data = await res.json();
    const data1 = await res1.json();
    const data2 = await res2.json();

    return {
      props: {
        seodata: data.data.attributes.Pages,
        calendar: data1,
        downloadcal: data2,
        siteUrl,
      },
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

const GoogleCalendar = ({ seodata, calendar, downloadcal, siteUrl }) => {
   
  console.log("data download", downloadcal);
  const [calendarData, setCalendarData] = useState([]);
  const [downloadCalender, setDownloadcalender] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  


  


  useEffect(() => {
    
    if (calendar && calendar?.data && calendar?.data?.length > 0) {
      setCalendarData(calendar.data);
      setIsLoading(false);
    } else {
      console.error("Error fetching data:");
      setIsLoading(false);
    }
  }, []);

  

  useEffect(() => {
    if (downloadcal && downloadcal?.data && downloadcal?.data?.length > 0) {
      console.log("download data?????", downloadcal.data.map((item)=>{
        if (item.attributes.pdf.length>10000){
          setDownloadcalender(item.attributes.pdf);
          return item.attributes.pdf
        }
       
      }));
      setIsLoading(false);
    } else {
      console.error("Error fetching data:");
      setIsLoading(false);
    }
  }, []);
  
  return (
    <>
          <Seo SeoData={seodata} PageSlug={"monthly-calendar"} />

      <Fragment>
        <NavBar siteUrl={siteUrl} />

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
        <div className="mt-5 container" >
          { downloadcal?.data.filter(i=>i?.attributes.pdf?.data).map((item) => (
            <div className="col-lg-6 mt-3" key={item.id}>
              <div className="card-wrap">
                <div className="d-flex gap-5 justify-content-between p-3">
                    <div>
                    <h6>{item.attributes.title}</h6>

                    </div>
                  <div>
                    {

                    }
                    <a
                      href={`${siteUrl}${item.attributes.pdf?.data?.attributes?.url}`}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <School_Calender />

        <Footer siteUrl={siteUrl} />
      </Fragment>
    </>
  );
};

export default GoogleCalendar;
