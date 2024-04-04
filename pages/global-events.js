import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';



const GlobalSiteUrl = process.env.GSURL

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${GlobalSiteUrl}/api/global-events?sort=id:desc&populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            eventData: data1,
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

const GlobalEvents = ({ seodata, eventData ,siteUrl}) => {

    const [eventsPage, setEventsPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
   

    const postsPerPage = 6; // Number of events posts per page

    useEffect(() => {
        fetch(`${GlobalSiteUrl}/api/global-events?populate=*`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.error.message);
                } else {
                    // Sort the events posts based on date in descending order
                    const sortedNews = data.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
                    setEventsPage({ ...data, data: sortedNews });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        if (eventData && eventData?.data && eventData?.data?.length > 0) {
            const sortedNews = eventData.data
            // sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
            setEventsPage({ ...eventsPage, data: sortedNews });
            
        }
    }, []);

  



    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = eventsPage?.data?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    //for arrow button in pagination
    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(eventsPage.data.length / postsPerPage)) {
            paginate(currentPage + 1);
        }
    };

    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"global-events"} />

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
                        <h1 className="principal-mess mob_head">Events</h1>
                    </div>
                    {eventsPage ? (
                        <section className="container wrap-news-sec-2">
                            <div className='row'>
                                {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                                    currentPosts.map((post) => (
                                        <div className='col-lg-4' key={post.id}>
                                            <div className="card wrap-news">
                                                <img src={`${GlobalSiteUrl}${post.attributes.image?.data?.attributes?.url}`} className="wrap-img-top" alt="..." />
                                                <div className="card-body">
                                                    <p className="card-text-news">{post.attributes.date}</p>
                                                    <p className="card-text-news">{post.attributes.title}</p>
                                                    <Link href={`/global-individual-events/${post.id}`} className="text-muted-news">read more</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No blog posts available.</p>
                                )}
                            </div>
                            <div className="pagination-blog">
                                {currentPage > 1 && (
                                    <button onClick={handlePrevPage}>&larr; Prev</button>
                                )}

                                {eventsPage?.data?.length > postsPerPage && (
                                    Array.from({ length: Math.ceil(eventsPage.data.length / postsPerPage) }, (_, index) => (
                                        <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
                                            {index + 1}
                                        </button>
                                    ))
                                )}

                                {currentPage < Math.ceil(eventsPage.data.length / postsPerPage) && (
                                    <button onClick={handleNextPage}>Next &rarr;</button>
                                )}
                            </div>
                        </section>
                    ) : (
                        <p>Loading event posts...</p>
                    )}
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
}

export default GlobalEvents;