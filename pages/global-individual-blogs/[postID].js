import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import GlobalRecentBlogs from '@/components/GlobalRecentBlogs';
import { determineStrapiUrl } from "@/utils/strapiUtils";

const GlobalIndividualBlogs = () => {
    const router = useRouter()
    const [blog, setBlog] = useState(null);
    const { postID } = router.query;
    const [loading, setLoading] = useState(true);
    const [publicUrl, setPublicUrl] = useState();


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
    useEffect(() => {
        setPublicUrl(window.location.origin) 
      }, [publicUrl]);


    // Get the current home URL
    const homeUrl = router.pathname === '/' ? '/' : `/${router.pathname}`;

    const siteUrl = determineStrapiUrl(homeUrl);

    return (
        <>
            <NavBar siteUrl={siteUrl}/>
            <div className='top-section4 desktophide'>
                <section className="wrap-item-blog-se1 first-section position-relative">
                    <div className='container'>
                        <div className="row">
                            <div className='col-content'>
                                <a className='backto-btn' href='/global-blogs'>
                                    <img src={publicUrl + "/assets/img/blog/13-arrow-left.png"} alt="Transpro" />
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
                            <GlobalRecentBlogs siteUrl={siteUrl}/>

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
                                        <img src={publicUrl + "/assets/img/blog/13-arrow-left.png"} alt="Transpro" />
                                        <span>
                                            Back to Blog
                                        </span>
                                    </a>

                                    <GlobalRecentBlogs siteUrl={siteUrl}/>


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
            <Footer siteUrl={siteUrl}/>
        </>
    );
}

export default GlobalIndividualBlogs;
