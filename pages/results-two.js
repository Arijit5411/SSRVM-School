import React, { Fragment, useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GooglePieChart from "../components/GooglePieChart";
import OurToppers from "@/components/OurTopper";
import DownloadResult from "@/components/DownloadResult";
import { determineStrapiUrl } from "@/utils/strapiUtils";
export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
  const res = await fetch(`${siteUrl}/api/result2?populate=*`);
  const data = await res.json();
  return {
    props: {
      chart: data?.data,
      siteUrl
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

const Results_two = ({ chart,siteUrl }) => {
  const [piechartData, setPiechartData] = useState([]);

  const [title, setTitle] = useState([]);

  useEffect(() => {
    if (chart && chart?.attributes?.piechart.length > 0) {
      let arrData = [];
      let titleData = [];
      chart?.attributes?.piechart.map((ch) => arrData.push(ch.chart_data));
      setPiechartData(arrData);

      chart?.attributes?.piechart.map((ch) => titleData.push(ch.title));
      setTitle(titleData);
    }
  }, []);

  const [currentPieChart, setCurrentPieChart] = useState(0);

  const goToPrevious = () => {
    setCurrentPieChart((prevChart) =>
      prevChart === 0 ? piechartData.length - 2 : prevChart - 1
    );
  };

  const goToNext = () => {
    setCurrentPieChart((prevChart) =>
      prevChart === piechartData.length - 2 ? 0 : prevChart + 1
    );
  };

  console.log("data in ", piechartData);
  return (
    <>
      <NavBar siteUrl={siteUrl}/>
      <Fragment>
        <div className="top-section1">
          <div className="container">
            <h1 className="principal-mess">Results</h1>
          </div>

          <div className="piecontainer">
            <div
              className="left-arrow arrow-result mobile-result2-letf-arrow"
              onClick={goToPrevious}
            >
              &larr;
            </div>

            <div className="result2-chart">
              {piechartData
                .slice(currentPieChart, currentPieChart + 2)
                .map((data, index) => (
                  <div key={index} className="">
                    <div className="result-box">
                      <h2 className="pie-heading">
                        {title[currentPieChart + index]}
                      </h2>
                      <GooglePieChart data={data} />
                    </div>
                  </div>
                ))}
            </div>

            <div
              className="right-arrow arrow-result mobile-result2-letf-arrow"
              onClick={goToNext}
            >
              &rarr;
            </div>
          </div>
          <section>
            <OurToppers />
          </section>

          <section className="container wrap-item-1 mb-5">
            <DownloadResult siteUrl={siteUrl}/>
          </section>
        </div>
        <Footer />
      </Fragment>
    </>
  );
};
export default Results_two;
