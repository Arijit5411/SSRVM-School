import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
// import { Link } from 'react-router-dom';
// import Seo from './Seo';\

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${GlobalSiteUrl}/api/global-events?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            eventData: data1
        }
    }
}

const GlobalEvents = ({ seodata, eventData }) => {

    const [eventsPage, setEventsPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    const postsPerPage = 6; // Number of events posts per page

    useEffect(() => {
        // fetch(`${GlobalSiteUrl}/api/global-events?populate=*`)
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.error) {
        //             console.error('Error:', data.error.message);
        //         } else {
        //             // Sort the events posts based on date in descending order
        //             const sortedNews = data.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
        //             setEventsPage({ ...data, data: sortedNews });
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (eventData && eventData?.data && eventData?.data?.length > 0) {
            const sortedNews = eventData.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
            setEventsPage({ ...eventsPage, data: sortedNews });
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[25].attributes;
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
            const seoAttributes = seodata.data[25].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
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
                <Footer />
            </Fragment>
        </>
    );
}

export default GlobalEvents;