import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TestimonialsForm from "../components/testiminial-form";
import TestimonialsVideo from "../components/testimonial-video";
import ReactMarkdown from "react-markdown";

import Head from "next/head";
import Slider from "react-slick";
// import Seo from './Seo';

import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seos`);
    const res1 = await fetch(`${siteUrl}/api/testimonial-pages?populate=*`);

    const data = await res.json();
    const data1 = await res1.json();

    return {
      props: {
        seodata: data,
        testimonial: data1,
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

const Testimonials = ({ seodata, testimonial, siteUrl }) => {
  const [selectedOption, setSelectedOption] = useState("Students");
  const [selectedYear, setSelectedYear] = useState("year 2023");
  const [seoData, setSeoData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });

  const handleChangeOption = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const [testimonialsData, setTestimonialsData] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);

  useEffect(() => {
    // fetch(`${siteUrl}/api/testimonial-pages?populate=*`)
    //     .then(response => response.json())
    //     .then(data => {
    //         setTestimonialsData(data.data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    if (testimonial && testimonial?.data && testimonial?.data?.length > 0) {
      setTestimonialsData(testimonial?.data);
    }
  }, []);

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('API response data:', data); // Log the API response data
    //         if (data && data.data && data.data.length > 0) {
    //             const seoAttributes = data.data[23].attributes;
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
      const seoAttributes = seodata.data[23].attributes;
      setSeoData({
        title: seoAttributes.title || "",
        metaTitle: seoAttributes.metaTitle || "",
        metaDescription: seoAttributes.metaDescription || "",
      });
    }
  }, []);

  useEffect(() => {
    const filteredData = testimonialsData.filter(
      (testimonial) =>
        testimonial.attributes.year === selectedYear &&
        testimonial.attributes.tab_option.toLowerCase() ===
          selectedOption.toLowerCase()
    );

    setFilteredTestimonials(filteredData);
  }, [selectedYear, selectedOption, testimonialsData]);

  const renderContent = (tabOption) => {
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        paginate(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < Math.ceil(arr.length / 4)) {
        paginate(currentPage + 1);
      }
    };

    const indexOfLastAward = currentPage * 4;
    const indexOfFirstAward = indexOfLastAward - 4;
    let arr = filteredTestimonials.filter(
      (testimonial) =>
        testimonial.attributes.tab_option.toLowerCase() === tabOption
    );
    const newArr = arr.slice(indexOfFirstAward, indexOfLastAward);

    return (
      <>
        {newArr.map((testimonial) => (
          <div className="col-lg-6" key={testimonial.id}>
            <div className="testimonial-mess-item">
              <div className="principal-image">
                {testimonial.attributes.image && (
                  <img
                    src={`${siteUrl}${testimonial.attributes.image.data.attributes.url}`}
                    alt={testimonial.attributes.name}
                    className="wrap-img-testimonial"
                  />
                )}
                <h6 className="wrap-principal-mess-item">
                  {testimonial.attributes.name}
                </h6>
                <p>{testimonial.attributes.sub_heading}</p>
              </div>
              <ReactMarkdown>
                {testimonial.attributes.description}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {arr.length > 4 && (
          <div className="pagination-blog">
            {currentPage > 1 && (
              <button onClick={handlePrevPage}>&larr; Prev</button>
            )}

            {Array.from({ length: Math.ceil(arr.length / 4) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

            {currentPage < Math.ceil(arr.length / 4) && (
              <button onClick={handleNextPage}>Next &rarr;</button>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Fragment>
        <NavBar siteUrl={siteUrl} />

        <div className="top-section1">
          <div className="container">
            <h1 className="principal-mess">Testimonials</h1>
            <TestimonialsVideo siteUrl={siteUrl} />
          </div>

          <section className="container marginTopExternal">
            <div className="testimonial-drop">
              <div className="dropdown">
                <p>Filter testimonials from:</p>
                <select
                  className="drop"
                  value={selectedYear}
                  onChange={handleChangeYear}
                >
                  {Array.from(
                    new Set(
                      testimonialsData.map(
                        (testimonial) => testimonial.attributes.year
                      )
                    )
                  )
                    .map((year) => parseInt(year.split(" ")[1])) // Extract and parse the year
                    .sort((yearA, yearB) => yearB - yearA) // Sort in descending order
                    .map((sortedYear) => (
                      <option key={sortedYear} value={`year ${sortedYear}`}>
                        {sortedYear}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="container">
              <div className="row">{renderContent()}</div>
            </div>
            <div className="container">
              <Tabs
                defaultActiveKey="Students"
                id="uncontrolled-tab-example"
                className="mb-3 tab-testimonial"
                activeKey={selectedOption}
                onSelect={handleChangeOption}
              >
                <Tab eventKey="Students" title="Students">
                  <div className="container">
                    <div className="row">{renderContent("students")}</div>
                  </div>
                </Tab>

                <Tab eventKey="Parents" title="Parents">
                  <div className="container">
                    <div className="row">{renderContent("parents")}</div>
                  </div>
                </Tab>

                <Tab eventKey="Teachers" title="Teachers">
                  <div className="container">
                    <div className="row">{renderContent("teachers")}</div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </section>

          <TestimonialsForm siteUrl={siteUrl} />
        </div>
        <Footer siteUrl={siteUrl} />
      </Fragment>
    </>
  );
};

export default Testimonials;
