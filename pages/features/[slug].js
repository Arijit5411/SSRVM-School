import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown support
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);
        const { slug } = context.params;

        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${siteUrl}/api/features?filters[Slug][$eq]=${slug}&populate=deep,3`);

        const seoData = await res.json();
        const featureData = await res1.json();

        return {
            props: {
                seodata: seoData?.data?.attributes?.Pages ?? {},
                featuredata: featureData.data[0],
                siteUrl,
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

const BackToFeature = ({ seodata, featuredata, siteUrl, slug }) => {

    console.log("featuredata", featuredata)

    const renderImage = (props) => {
        const { src, alt } = props;
        const fullSrc = src.startsWith('http') ? src : `${siteUrl}${src}`;
        return <img src={fullSrc} alt={alt} />;
    };

    const content = featuredata?.attributes?.Content?.[0]?.Content ?? '';

    return (
        <>
            <Seo SeoData={seodata} PageSlug={"features"} InnerPageSlug={slug} />
            <NavBar siteUrl={siteUrl} />
            <div className="">
                <section className="feature-cont-a4" style={{ backgroundColor: '#f7eecd' }}>
                    <div className="container">
                        <div className='row g-4 pb-5 top-sec-a1'>
                            <div className='col-lg-6'>
                                <h1 className=''>{featuredata?.attributes?.heading}</h1>
                                <p className='pt-4'>
                                    {featuredata?.attributes?.sub_heading}
                                </p>
                            </div>
                            <div className='col-lg-6'>
                                {featuredata?.attributes?.Thumbnail?.data?.attributes?.url &&
                                    <img className='w-100 h-auto object-fit-cover' src={siteUrl + featuredata?.attributes?.Thumbnail?.data?.attributes?.url} alt="" />
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className='pb-5'>
                    <div className='container pt-5'>
                        {
                            featuredata?.attributes?.Content &&
                            featuredata?.attributes?.Content.map((item, index) => (
                                <div className='row align-items-center' >
                                    {index % 2 === 0 ? (
                                        <>
                                            <div className='col-lg-6 pb-4'>
                                                <img className='w-100 h-auto object-fit-cover' src={siteUrl + item.Content_Image?.data?.attributes?.url} alt="" />
                                            </div>
                                            <div className='col-lg-6 pb-4'>
                                                <ReactMarkdown>
                                                    {item.Content}
                                                </ReactMarkdown>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='col-lg-6 pb-4'>
                                                <ReactMarkdown>
                                                    {item.Content}
                                                </ReactMarkdown>
                                            </div>
                                            <div className='col-lg-6 pb-4'>
                                                <img className='w-100 h-auto object-fit-cover' src={siteUrl + item.Content_Image?.data?.attributes?.url} alt="" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </section>

            </div>
            <Footer siteUrl={siteUrl} />


        </>
    );
};

export default BackToFeature;
