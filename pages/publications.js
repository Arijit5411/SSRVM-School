import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/publications?sort=id:desc&populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            publicationData: data1
        }
    }
}

const Publications = ({ seodata, publicationData }) => {
    const [publications, setPublications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    const publicationsPerPage = 8;


    useEffect(() => {
        // fetch(`${siteUrl}/api/publications?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         const sortedPublications = data.data
        //             .sort((a, b) => {//sorting according to the edition of the magazine
        //                 const editionA = parseInt(a.attributes.title.split(" ")[0]);
        //                 const editionB = parseInt(b.attributes.title.split(" ")[0]);
        //                 return editionB - editionA;
        //             });
        //         setPublications(sortedPublications);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (publicationData && publicationData?.data && publicationData?.data?.length > 0) {
            // const sortedPublications = publicationData.data
            //     .sort((a, b) => {//sorting according to the edition of the magazine
            //         const editionA = parseInt(a.attributes.title.split(" ")[0]);
            //         const editionB = parseInt(b.attributes.title.split(" ")[0]);
            //         return editionB - editionA;
            //     });
            // setPublications(sortedPublications);
            setPublications(publicationData?.data);
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[42].attributes;
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
            const seoAttributes = seodata.data[42].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const indexOfLastPublication = currentPage * publicationsPerPage;
    const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
    const currentpublication = publications.slice(indexOfFirstPublication, indexOfLastPublication);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //for pagination arrow button
    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(publications.length / publicationsPerPage)) {
            paginate(currentPage + 1);
        }
    };

    return (
        <>
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

                <div className="top-section1">
                    <div className="container mobilehide">
                        <h1 className="principal-mess">
                            Publications
                            <a
                                href="/school-magazine"
                                target="_blank"
                                className="newsbtm-school-item"
                            >
                                View School Magazine
                            </a>
                        </h1>
                    </div>
                    <div className="container desktophide">
                        <h1 className="principal-mess">
                            Publications
                        </h1>
                        <a
                            href="/school-magazine"
                            target="_blank"
                            className="newsbtm-school-item"
                        >
                            View School Magazine
                        </a>
                    </div>
                    <section className="container wrap-news-sec-2">


                        <div className="row">
                            {currentpublication.map((publication) => (
                                <div className="col-lg-3 col-6" key={publication.id}>
                                    <div className="card wrap-news">
                                        <img
                                            src={siteUrl + publication.attributes.image.data.attributes.url}
                                            className="wrap-img-top1 wrap-img-colour"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <p className="card-text-school">{publication.attributes.title}</p>
                                            <a href={siteUrl + publication.attributes.download_pdf.data.attributes.url} className="text-muted-mag" download>
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="pagination-blog">
                            {currentPage > 1 && (
                                <button onClick={handlePrevPage}>&larr; Prev</button>
                            )}

                            {Array.from({ length: Math.ceil(publications.length / publicationsPerPage) }, (_, index) => (
                                <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""} >
                                    {index + 1}
                                </button>
                            ))}

                            {currentPage < Math.ceil(publications.length / publicationsPerPage) && (
                                <button onClick={handleNextPage}>Next &rarr;</button>
                            )}
                        </div>

                    </section>
                </div>
                <Footer />
            </Fragment>
        </>
    );
};

export default Publications;