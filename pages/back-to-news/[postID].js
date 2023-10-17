import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
// import { useParams } from 'react-router-dom';
import { useParams } from "next/navigation";
import Footer from "../components/Footer";
import ReactMarkdown from 'react-markdown';
import RecentNewsSidebar from "../components/RecentNewsSidebar";

const BackToNews = () => {
    const router = useParams()

    const [news, setNews] = useState(null);
    const { postId } = router.query;
    const [loading, setLoading] = useState(true);

    const isProduction = process.env.NODE_ENV === 'production';

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    useEffect(() => {
        if (postId) {
            fetch(`${siteUrl}/api/newspages/${postId}?populate=*`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error('Error:', data.error.message);
                    } else {
                        setNews(data.data.attributes); // Access the attributes directly
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [postId]);

    const components = {
        img: ({ src, alt }) => {
            return <img src={`${siteUrl}${src}`} alt={alt} />;
        },
    };

    return (
        <>
            <NavBar />
            <div className='top-section4-new desktophide'>
                <section className="wrap-item-blog-se1 first-section position-relative">
                    <div className='container'>
                        <div className='col-content'>
                            <a className='backto-btn' href='/news'>
                                <img src={process.env.PUBLIC_URL + "/assets/img/blog/13-arrow-left.png"} alt="Transpro" />
                                <span>
                                    Back to News
                                </span>
                            </a>



                        </div>
                        <div className="row">

                            {loading ? (
                                <p>Loading news post...</p>
                            ) : (
                                <div className="blog-post">
                                    <img src={`${siteUrl}${news?.image?.data?.attributes?.url}`} alt={news?.Title} />
                                    <h1 className="wrap-text-inner">
                                        {news?.title}

                                    </h1>
                                    <p className="blog-parg-item">
                                        <ReactMarkdown components={components}>
                                            {news?.content}
                                        </ReactMarkdown>

                                    </p>
                                </div>
                            )}
                            <div className="row">
                                <RecentNewsSidebar />

                            </div>
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
                                    <a className='backto-btn' href='/news'>
                                        <img src={process.env.PUBLIC_URL + "/assets/img/blog/13-arrow-left.png"} alt="Transpro" />
                                        <span>
                                            Back to News
                                        </span>
                                    </a>

                                    <RecentNewsSidebar />


                                </div>
                            </div>
                            <div className="col-lg-9 col-2">
                                {loading ? (
                                    <p>Loading news post...</p>
                                ) : (
                                    <div className="blog-post">
                                        <img src={`${siteUrl}${news?.image?.data?.attributes?.url}`} alt={news?.Title} />
                                        <h1 className="wrap-text-inner">

                                            {news?.title}

                                        </h1>
                                        <p className="blog-parg-item">
                                            <ReactMarkdown components={components}>
                                                {news?.content}
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


export default BackToNews;
