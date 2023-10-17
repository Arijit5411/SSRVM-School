import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
// import { Link } from 'react-router-dom';
// import Seo from './Seo';

const postsPerPage = 6; // Number of blog posts per page

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos`)
    const res1 = await fetch(`${siteUrl}/api/blogs?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            blogProp: data1
        }
    }
}

const Blog = ({ seodata, blogProp }) => {

    const [blog, setBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/blogs?populate=*`) // Update the endpoint
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.error) {
        //             console.error('Error:', data.error.message);
        //         } else {
        //             // Sort the blog posts based on date in descending order
        //             const sortedBlogs = data.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
        //             setBlog({ ...data, data: sortedBlogs });
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (blogProp && blogProp?.data) {
            const sortedBlogs = blogProp.data.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
            setBlog({ ...blogProp, data: sortedBlogs });
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[1].attributes;
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
            const seoAttributes = seodata.data[1].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    // for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blog?.data?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    //for arrow button in pagination
    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(blog.data.length / postsPerPage)) { paginate(currentPage + 1); }
    }; return (<>
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
            <div className='top-section1'>
                <div className="container">
                    <h1 className="principal-mess">Blog</h1>
                </div>
                {blog ? (
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
                                                <p className="card-text-news">{post.attributes.Title}</p>
                                                <Link href={`/back-to-blog/${post.id}`} className="text-muted-news">read more</Link>
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

                            {blog?.data?.length > postsPerPage && (
                                Array.from({ length: Math.ceil(blog.data.length / postsPerPage) }, (_, index) => (
                                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ?
                                        "active" : ""}>
                                        {index + 1}
                                    </button>
                                ))
                            )}

                            {currentPage < Math.ceil(blog.data.length / postsPerPage) && (<button onClick={handleNextPage}>Next
                                &rarr;</button>
                            )}
                        </div>
                    </section>
                ) : (
                    <p>Loading blog posts...</p>
                )}

            </div>
            <Footer />
        </Fragment>
    </>
    );
}

export default Blog;