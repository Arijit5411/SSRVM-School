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
    const res1 = await fetch(`${GlobalSiteUrl}/api/global-blogs?sort=id:desc&populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            blogData: data1,
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


const GlobalBlogs = ({ seodata, blogData,siteUrl }) => {

    const [blog, setBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
   

    const postsPerPage = 6; // Number of blog posts per page


    useEffect(() => {
        // fetch(`${GlobalSiteUrl}/api/global-blogs?populate=*`) // Update the endpoint
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
        if (blogData && blogData?.data && blogData?.data?.length > 0) {
            const sortedBlogs = blogData.data //.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
            setBlog({ ...blog, data: sortedBlogs });
        }

    }, []);

   

    // for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blog?.data?.slice(indexOfFirstPost, indexOfLastPost);
console.log('data',blogData)
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
        <Fragment>
        <Seo SeoData={seodata} PageSlug={"global-blogs"} />

            <NavBar siteUrl={siteUrl}/>
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
                                            <img src={`${GlobalSiteUrl}${post.attributes.image?.data?.attributes?.url}`}
                                                className="wrap-img-top" alt="..." />
                                            <div className="card-body">
                                                <p className="card-text-news">{post.attributes.date}</p>
                                                <p className="card-text-news">{post.attributes.Title}</p>
                                                <Link href={`/global-individual-blogs/${post.id}`} className="text-muted-news">read more</Link>
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
            <Footer siteUrl={siteUrl}/>
        </Fragment>
    </>
    );
}

export default GlobalBlogs;