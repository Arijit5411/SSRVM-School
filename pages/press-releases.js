import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Modal from "react-bootstrap/Modal";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)

    const data = await res.json()

    return {
        props: {
            seodata: data
        }
    }
}

const PressReleases = ({ seodata }) => {
    const [selectedYear, setSelectedYear] = useState("year 2023");
    const [pressReleases, setPressReleases] = useState([]);
    const [filteredPressReleases, setFilteredPressReleases] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    // Pagination state for press releases
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8); // Number of press releases per page

    // Function to handle year change
    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);

        // Filter the press releases based on the selected year
        const filteredReleases = pressReleases.filter(
            (release) => release.attributes.year === selectedYear
        );
        setFilteredPressReleases(filteredReleases);

        // Reset to the first page when changing the filter
        setCurrentPage(1);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        // Fetch the press releases data
        fetch(`${siteUrl}/api/press-releases?sort=id:desc&populate=*`)
            .then((response) => response.json())
            .then((data) => {
                setPressReleases(data.data);
                setFilteredPressReleases(
                    data.data.filter(
                        (release) => release.attributes.year === selectedYear
                    )
                );
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [selectedYear]);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[38].attributes;
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
            const seoAttributes = seodata.data[38].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const indexOfLastRelease = currentPage * postsPerPage;
    const indexOfFirstRelease = indexOfLastRelease - postsPerPage;
    const currentReleases = filteredPressReleases.slice(
        indexOfFirstRelease,
        indexOfLastRelease
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination functions
    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredPressReleases.length / postsPerPage)) {
            paginate(currentPage + 1);
        }
    };

    return (
        <Fragment>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <NavBar />
            {/* {seoData && (
                <Seo
                    title={seoData.title}
                    metaTitle={seoData.metaTitle}
                    metaDescription={seoData.metaDescription}
                />
            )} */}

            <div className="top-section1-new">
                <div className="container">
                    <h1 className="principal-mess">Press Releases</h1>
                </div>

                <section className="container">
                    <div className="row">
                        <div className="dropdown justifyContent">
                            <p className="filter_mob">Filter by Year:</p>
                            <select
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="drop"
                            >
                                {Array.from(
                                    new Set(
                                        pressReleases.map((release) => release.attributes.year)
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
                    <div className="row">
                        {currentReleases.map((release, index) => (
                            <div
                                className="col-lg-3 col-6"
                                key={index}
                                onClick={() =>
                                    handleImageClick(
                                        `${siteUrl}${release.attributes.image.data.attributes.url}`
                                    )
                                }
                            >
                                <div className="card wrap-news">
                                    <img
                                        src={`${siteUrl}${release.attributes.image.data.attributes.url}`}
                                        className="wrap-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <p className="card-text-news">{release.attributes.title}</p>
                                        <p className="card-text-news">(Heritage Week)</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination-blog">
                        {currentPage > 1 && (
                            <button onClick={handlePrevPage}>&larr; Prev</button>
                        )}

                        {Array.from(
                            { length: Math.ceil(filteredPressReleases.length / postsPerPage) },
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

                        {currentPage < Math.ceil(filteredPressReleases.length / postsPerPage) && (
                            <button onClick={handleNextPage}>Next &rarr;</button>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                dialogClassName="modal-fullscreen awa-img"
                onClick={handleCloseModal}
            >
                <Modal.Body>
                    <img src={selectedImage} className="modal-image" alt="..." />
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default PressReleases;
