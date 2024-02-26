import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);

  const res1 = await fetch(
    `${siteUrl}/api/publications?sort=id:desc&populate=*`
  );

  const data = await res.json();
  const data1 = await res1.json();

  return {
    props: {
      seodata: data.data.attributes.Pages,
      publicationData: data1,
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


const Publications = ({ seodata, publicationData,siteUrl }) => {
  const [publications, setPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 

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
    if (
      publicationData &&
      publicationData?.data &&
      publicationData?.data?.length > 0
    ) {
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

 

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentpublication = publications.slice(
    indexOfFirstPublication,
    indexOfLastPublication
  );

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
      <Seo SeoData={seodata} PageSlug={"publications"} />

        <NavBar siteUrl={siteUrl}/>

        <div className="top-section1">
          <div className="d-flex  ml-5 pub-sec gap-3" style={{paddingLeft:'6rem'}}>
            <h2 className="ml-5">Publications</h2>
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
                      src={
                        siteUrl +
                        publication.attributes.image.data.attributes.url
                      }
                      className="wrap-img-top1 wrap-img-colour"
                      alt="..."
                    />
                    <div className="card-body">
                      <p className="card-text-school">
                        {publication.attributes.title}
                      </p>
                      <a
                        href={
                          siteUrl +
                          publication.attributes.download_pdf.data.attributes
                            .url
                        }
                        className="text-muted-mag"
                        download
                      >
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

              {Array.from(
                {
                  length: Math.ceil(publications.length / publicationsPerPage),
                },
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
                Math.ceil(publications.length / publicationsPerPage) && (
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

export default Publications;
