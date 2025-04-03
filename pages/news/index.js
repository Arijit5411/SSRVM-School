import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Head from 'next/head';

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);
        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${siteUrl}/api/newspages?sort=id:desc&populate=*`)

        const data = await res.json()
        const data1 = await res1.json()

        return {
            props: {
                seodata: data?.data?.attributes?.Pages ?? {},
                newsProp: data1,
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

const News = ({ seodata, newsProp, siteUrl }) => {
    const [news, setNews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

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
            // const sortedNews = newsProp.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
            setNews({ ...newsProp, data: newsProp?.data });
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

    return (
        <>
            <Seo SeoData={seodata} PageSlug={"news"} />

            <NavBar siteUrl={siteUrl} />



            <div className='' style={{ padding: '160px 0 60px 0' }}>
                <div className="container d-flex align-items-center gap-4 my-5">
                    <h1 className="principal-mess wrap-margin m-0 lh-0">News
                        {/* <a href="/press-releases"> */}
                        {/* </a> */}
                    </h1>
                    <button className='newsbtm m-0 position-relative' style={{ zIndex: 9 }} onClick={() => { window.open(' /press-releases', '_self') }}>
                        View Press Releases
                    </button>

                </div>
                {(news !== null) ? (
                    <section className="container wrap-news-sec-2">
                        <div className='row'>
                            {Array.isArray(currentPosts) && currentPosts.length > 0 && (
                                currentPosts.map((post) => (
                                    <div className='col-lg-4' key={post.id}>
                                        <div className="card wrap-news">
                                            <img src={`${siteUrl}${post.attributes.image?.data?.attributes?.url}`}
                                                className="wrap-img-top" alt="..." />
                                            <div className="card-body">
                                                <p className="card-text-news">{post.attributes.date}</p>
                                                <p className="card-text-news">{post.attributes.title}</p>
                                                <Link href={`/news/${post.attributes.slug}`} className="text-muted-news">read more</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
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
                    <p className='text-center mb-5'>No News available.</p>
                )}
            </div>
            <Footer siteUrl={siteUrl} />
        </>
    );
}

export default News;