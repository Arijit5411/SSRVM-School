import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/newspages?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            newsProp: data1
        }
    }
}

const News = ({ seodata, newsProp }) => {
    const [news, setNews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });
    const postsPerPage = 6; // Number of news posts per page

    useEffect(() => {
        // fetch(`${siteUrl}/api/newspages?populate=*`) // Update the endpoint
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.error) {
        //             console.error('Error:', data.error.message);
        //         } else {
        //             // Sort the news posts based on date in descending order
        //             const sortedNews = data.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
        //             setNews({ ...data, data: sortedNews });
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (newsProp && newsProp?.data && newsProp?.data?.length > 0) {
            const sortedNews = newsProp.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
            setNews({ ...newsProp, data: sortedNews });
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[24].attributes;
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
            console.log(seodata);
            const seoAttributes = seodata.data[36].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = news?.data?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    //for arrow button in pagination
    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(news.data.length / postsPerPage)) { paginate(currentPage + 1); }
    };

    return (<>
        <Head>
            <title>{seoData.title}</title>
            {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
            {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
        </Head>
        <Fragment>
            <NavBar />

            {/* {seoData && (
                <Seo
                    title={seoData.title}
                    metaTitle={seoData.metaTitle}
                    metaDescription={seoData.metaDescription}
                />
            )} */}

            <div className='top-section1-new'>
                <div className="container d-flex align-items-center gap-4 my-5">
                    <h1 className="principal-mess wrap-margin m-0 lh-0">News
                        {/* <a href="/press-releases"> */}

                        {/* </a> */}
                    </h1>
                    <button className='newsbtm m-0 position-relative' style={{ zIndex: 9 }} onClick={() => { window.open(' /press-releases', '_self') }}>
                        View Press Releases
                    </button>

                </div>
                {news ? (
                    <section className="container wrap-news-sec-2">
                        <div className='row'>
                            {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                                currentPosts.map((post) => (
                                    <div className='col-lg-4' key={post.id}>
                                        <div className="card wrap-news">
                                            <img src={`${siteUrl}${post.attributes.image?.data?.attributes?.url}`}
                                                className="wrap-img-top" alt="..." />
                                            <div className="card-body">
                                                <p className="card-text-news">{post.attributes.date}</p>
                                                <p className="card-text-news">{post.attributes.title}</p>
                                                <Link href={`/back-to-news/${post.id}`} className="text-muted-news">read more</Link>
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

                            {news?.data?.length > postsPerPage && (
                                Array.from({ length: Math.ceil(news.data.length / postsPerPage) }, (_, index) => (
                                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ?
                                        "active" : ""}>
                                        {index + 1}
                                    </button>
                                ))
                            )}

                            {currentPage < Math.ceil(news.data.length / postsPerPage) && (<button onClick={handleNextPage}>Next
                                &rarr;</button>
                            )}
                        </div>
                    </section>
                ) : (
                    <p>Loading news posts...</p>
                )}
            </div>
            <Footer />
        </Fragment >
    </>
    );
}

export default News;