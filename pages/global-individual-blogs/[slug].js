import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import GlobalRecentBlogs from '@/components/GlobalRecentBlogs';
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';
import RecentSidebar from '@/components/RecentSidebar';

const GlobalSiteUrl = process.env.GSURL

export const getServerSideProps = async (context) => {
    try {

        const siteUrl = determineStrapiUrl(context);
        const { slug } = context.query;

        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${GlobalSiteUrl}/api/global-blogs?filters[slug][$eq]=${slug}&sort=id:desc&populate=*`);
        const res2 = await fetch(`${GlobalSiteUrl}/api/global-blogs?filters[slug][$ne]=${slug}&sort=id:desc&populate=*`);

        const data = await res.json();
        const data1 = await res1.json();
        const data2 = await res2.json();


        return {
            props: {
                siteUrl,
                seodata: data?.data?.attributes?.Pages ?? {},
                blog: data1?.data[0]?.attributes ?? {},
                recentBlogs: data2?.data ?? {},
                slug
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
const GlobalIndividualBlogs = ({ siteUrl, seodata, blog, recentBlogs, slug }) => {

    const [publicUrl, setPublicUrl] = useState();
    const components = {
        img: ({ src, alt }) => {
            return <img src={`${GlobalSiteUrl}${src}`} alt={alt} />;
        },
    };
    useEffect(() => {
        setPublicUrl(window.location.origin)
    }, [publicUrl]);


    return (
        <>
            <Seo SeoData={seodata} PageSlug={"global-individual-blogs"} InnerPageSlug={slug} />
            <NavBar siteUrl={siteUrl} />
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
                                <div className="blog-post">
                                    <img src={`${GlobalSiteUrl}${blog?.image?.data?.attributes?.url}`} alt={blog?.Title} />
                                    <h1 className="wrap-text-inner">
                                        {blog?.Title}
                                    </h1>
                                    <div className="blog-parg-item">
                                        <ReactMarkdown components={components}>
                                            {blog?.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>


                            <RecentSidebar Page="Blog" PageSlug="global-individual-blogs" RelData={recentBlogs} Slug={slug} siteUrl={siteUrl} Title="Title" />


                        </div>
                    </div>
                </section>
            </div>
            <div className='top-section4 mobilehide'>
                <section className="wrap-item-blog-se1 first-section position-relative">
                    <div className='container'>
                        <div className="row gx-5 blog-inn-row">
                            <div className="col-lg-3 col-1">

                                <div className='col-content'>
                                    <a className='backto-btn' href='/global-blogs'>
                                        <img src={publicUrl + "/assets/img/blog/13-arrow-left.png"} alt="Transpro" />
                                        <span>
                                            Back to Blog
                                        </span>
                                    </a>

                                    <RecentSidebar Page="Blog" PageSlug="global-individual-blogs" RelData={recentBlogs} Slug={slug} siteUrl={siteUrl} Title="Title" />

                                </div>
                            </div>
                            <div className="col-lg-9 col-2">
                                <div className="blog-post">
                                    <img src={`${GlobalSiteUrl}${blog?.image?.data?.attributes?.url}`} alt={blog?.Title} />
                                    <h1 className="wrap-text-inner">

                                        {blog?.Title}

                                    </h1>
                                    <div className="blog-parg-item">
                                        <ReactMarkdown components={components}>
                                            {blog?.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer siteUrl={siteUrl} />
        </>
    );
}

export default GlobalIndividualBlogs;
