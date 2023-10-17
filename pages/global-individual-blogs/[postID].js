import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import GlobalRecentBlogs from '@/components/GlobalRecentBlogs';

const GlobalIndividualBlogs = () => {
    const router = useRouter()
    const [blog, setBlog] = useState(null);
    const { postID } = router.query;
    const [loading, setLoading] = useState(true);

    const isProduction = process.env.NODE_ENV === 'production';

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"


    useEffect(() => {
        if (postID) {
            fetch(`${GlobalSiteUrl}/api/global-blogs/${postID}?populate=*`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error('Error:', data.error.message);
                    } else {
                        setBlog(data.data.attributes); // Access the attributes directly
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [postID]);

    const components = {
        img: ({ src, alt }) => {
            return <img src={`${GlobalSiteUrl}${src}`} alt={alt} />;
        },
    };

    return (
        <>
            <NavBar />
            <div className='top-section4 desktophide'>
                <section className="wrap-item-blog-se1 first-section position-relative">
                    <div className='container'>
                        <div className="row">
                            <div className='col-content'>
                                <a className='backto-btn' href='/global-blogs'>
                                    <img src={process.env.PUBLIC_URL + "/assets/img/blog/13-arrow-left.png"} alt="Transpro" />
                                    <span>
                                        Back to Blog
                                    </span>
                                </a>



                            </div>
                            <div className="row">
                                {loading ? (
                                    <p>Loading blog post...</p>
                                ) : (
                                    <div className="blog-post">
                                        <img src={`${GlobalSiteUrl}${blog?.image?.data?.attributes?.url}`} alt={blog?.Title} />
                                        <h1 className="wrap-text-inner">
                                            {blog?.Title}
                                        </h1>
                                        <p className="blog-parg-item">
                                            <ReactMarkdown components={components}>
                                                {blog?.content}
                                            </ReactMarkdown>
                                        </p>
                                    </div>
                                )}
                            </div>
                            <GlobalRecentBlogs />

                        </div>
                    </div>
                </section>
            </div>
            <div className='top-section4 mobilehide'>
                <section className="wrap-item-blog-se1 first-section position-relative">
                    <div className='container'>
                        <div className="row gx-5 blog-inn-row">
                            <div className="col-lg-3 col-1">
                                {/* Sidebar content */}
                                <div className='col-content'>
                                    <a className='backto-btn' href='/global-blogs'>
                                        <img src={process.env.PUBLIC_URL + "/assets/img/blog/13-arrow-left.png"} alt="Transpro" />
                                        <span>
                                            Back to Blog
                                        </span>
                                    </a>

                                    <GlobalRecentBlogs />


                                </div>
                            </div>
                            <div className="col-lg-9 col-2">
                                {loading ? (
                                    <p>Loading blog post...</p>
                                ) : (
                                    <div className="blog-post">
                                        <img src={`${GlobalSiteUrl}${blog?.image?.data?.attributes?.url}`} alt={blog?.Title} />
                                        <h1 className="wrap-text-inner">

                                            {blog?.Title}

                                        </h1>
                                        <p className="blog-parg-item">
                                            <ReactMarkdown components={components}>
                                                {blog?.content}
                                            </ReactMarkdown>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default GlobalIndividualBlogs;
