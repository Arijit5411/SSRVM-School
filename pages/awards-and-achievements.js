import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
  const res1 = await fetch(
    `${siteUrl}/api/awards-and-achievements?sort=id:desc&populate=*`
  );

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data.data.attributes.Pages,
      awardsData: data1,
      siteUrl
    },
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

const Awards_And_Achievements = ({ seodata, awardsData,siteUrl }) => {
  const [selectedOption, setSelectedOption] = useState("school award");
  const [selectedYear, setSelectedYear] = useState("year 2023");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [awardsAndAchievements, setAwardsAndAchievements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 

  const awardsPerPage = 8; // Number of awards per page

  // Declare filteredAwards here
  const filteredAwards = awardsAndAchievements.filter(
    (award) =>
      award.attributes.year === selectedYear &&
      award.attributes.award_type === selectedOption
  );

  useEffect(() => {
   
    if (awardsData && awardsData?.data && awardsData?.data?.length > 0) {
      setAwardsAndAchievements(awardsData?.data);
    }
  }, []);

  
  const renderContent = () => {
    // Use filteredAwards here
    const indexOfLastAward = currentPage * awardsPerPage;
    const indexOfFirstAward = indexOfLastAward - awardsPerPage;
    const currentAwards = filteredAwards.slice(
      indexOfFirstAward,
      indexOfLastAward
    );

    return (
      <div className="row">
        {currentAwards.map((award, index) => (
          <div
            className="col-lg-3"
            key={index}
            onClick={() =>
              handleImageClick(
                `${siteUrl}${award.attributes.image.data.attributes.url}`
              )
            }
          >
            <div className="card wrap-news">
              <img
                src={`${siteUrl}${award?.attributes?.image?.data?.attributes?.url}`}
                className="wrap-img-top1 wrap-side-award"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text-award">
                  {award.attributes.award_name}
                </p>
                <p className="">
                  {award.attributes.description}
                </p>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredAwards.length / awardsPerPage)) {
      paginate(currentPage + 1);
    }
  };

  // Function to handle clicking on an image
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  // Function to handle changing the award type
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle changing the selected year
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Fragment>
      <Seo SeoData={seodata} PageSlug={"awards-and-achievements"} />
        <NavBar siteUrl={siteUrl}/>
        <div className="desktophide">
          <section>
            <div className="container">
              <div className="wrap-item-text1 news-item">
                <h1 className="wrap-award-heading">Awards and Achievements</h1>
                <div className="award-dropdown">
                  <div>
                    <select
                      value={selectedOption}
                      onChange={handleChange}
                      className="drop"
                    >
                      <option value="school award">School Awards</option>
                      <option value="individual award">
                        Individual Awards
                      </option>
                    </select>
                  </div>

                  <div>
                    <select
                      value={selectedYear}
                      onChange={handleYearChange}
                      className="drop"
                    >
                      {Array.from(
                        new Set(
                          awardsAndAchievements.map(
                            (award) => award.attributes.year
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
              </div>
            </div>
          </section>
          <section className="container">
            {renderContent()}
            <div className="pagination-blog">
              {currentPage > 1 && (
                <button onClick={handlePrevPage}>&larr; Prev</button>
              )}

              {Array.from(
                { length: Math.ceil(filteredAwards.length / awardsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                )
              )}

              {currentPage <
                Math.ceil(filteredAwards.length / awardsPerPage) && (
                <button onClick={handleNextPage}>Next &rarr;</button>
              )}
            </div>
          </section>
        </div>
        <div className="top-section36 mobilehide">
          <section className="wrap-item-principal-se1">
            <div className="container">
              <div className="wrap-item-text1 news-item displayFlex">
                <h1 className="wrap-award-heading">Awards and Achievements</h1>
                <div className="award-dropdown">
                  <div>
                    <select
                      value={selectedOption}
                      onChange={handleChange}
                      className="drop"
                    >
                      <option value="school award">School Awards</option>
                      <option value="individual award">
                        Individual Awards
                      </option>
                    </select>
                  </div>

                  <div>
                    <select
                      value={selectedYear}
                      onChange={handleYearChange}
                      className="drop"
                    >
                      {Array.from(
                        new Set(
                          awardsAndAchievements.map(
                            (award) => award.attributes.year
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
              </div>
            </div>
          </section>
          <section className="container wrap-news-sec-award">
            {renderContent()}
            <div className="pagination-blog">
              {currentPage > 1 && (
                <button onClick={handlePrevPage}>&larr; Prev</button>
              )}

              {Array.from(
                { length: Math.ceil(filteredAwards.length / awardsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                )
              )}

              {currentPage <
                Math.ceil(filteredAwards.length / awardsPerPage) && (
                <button onClick={handleNextPage}>Next &rarr;</button>
              )}
            </div>
          </section>
        </div>
        <Footer siteUrl={siteUrl}/>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          dialogClassName="modal-fullscreen awa-img"
          onClick={handleCloseModal}
        >
          <Modal.Body>
            <div className="d-flex justify-contetn-center align-items-center">
              <img src={selectedImage} className="modal-image" alt="..." />
            </div>
          </Modal.Body>
        </Modal>
      </Fragment>
    </>
  );
};

export default Awards_And_Achievements;
