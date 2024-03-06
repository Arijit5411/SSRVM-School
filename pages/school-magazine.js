import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Seo from './Seo';
import Head from "next/head";



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);

    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/magazines?sort=id:desc&populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            magazineData: data1,
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


const School_Magazine = ({ seodata, magazineData,siteUrl }) => {
    const [schoolMagazines, setSchoolMagazines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
   
    const magazinesPerPage = 8;

    useEffect(() => {
        // fetch(`${siteUrl}/api/magazines?populate=*`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         const sortedMagazines = data.data
        //             .sort((a, b) => {//sorting according to the edition of the magazine
        //                 const editionA = parseInt(a.attributes.title.split(" ")[0]);
        //                 const editionB = parseInt(b.attributes.title.split(" ")[0]);
        //                 return editionB - editionA;
        //             });
        //         setSchoolMagazines(sortedMagazines);
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
        if (magazineData && magazineData?.data && magazineData?.data?.length > 0) {
            // const sortedMagazines = magazineData.data
            //     .sort((a, b) => {//sorting according to the edition of the magazine
            //         const editionA = parseInt(a.attributes.title.split(" ")[0]);
            //         const editionB = parseInt(b.attributes.title.split(" ")[0]);
            //         return editionB - editionA;
            //     });
            // setSchoolMagazines(sortedMagazines);
            setSchoolMagazines(magazineData?.data);
        }
    }, []);

    

    // for pagination
    const indexOfLastMagazine = currentPage * magazinesPerPage;
    const indexOfFirstMagazine = indexOfLastMagazine - magazinesPerPage;
    const currentMagazines = schoolMagazines.slice(indexOfFirstMagazine, indexOfLastMagazine);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //for pagination arrow button
    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(schoolMagazines.length / magazinesPerPage)) {
            paginate(currentPage + 1);
        }
    };

    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"school-magazine"} />

                <NavBar siteUrl={siteUrl}/>

                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

                <div className='top-section1'>
                    <div className="container">
                        <h1 className="principal-mess">School Magazine
                            <a href="/publications">
                                <button className='newsbtm publishButton'>
                                    View other Publications
                                </button>
                            </a>
                        </h1>
                    </div>
                    <section className="container wrap-news-sec-2">
                        <div className="row">
                            {currentMagazines.map((magazine) => (
                                <div className="col-lg-3 col-6" key={magazine.id}>
                                    <div className="card wrap-news">
                                        <img
                                            src={siteUrl + magazine.attributes.image.data.attributes.url}
                                            className="wrap-img-top1 wrap-side-col"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <p className="card-text-school">{magazine.attributes.title}</p>
                                            <a href={siteUrl + magazine.attributes.download_pdf.data.attributes.url} className="text-muted-mag" download>
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

                            {Array.from({ length: Math.ceil(schoolMagazines.length / magazinesPerPage) }, (_, index) => (
                                <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""} >
                                    {index + 1}
                                </button>
                            ))}

                            {currentPage < Math.ceil(schoolMagazines.length / magazinesPerPage) && (
                                <button onClick={handleNextPage}>Next &rarr;</button>
                            )}
                        </div>
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default School_Magazine;
