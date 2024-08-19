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
        const { id } = context.params;

        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${siteUrl}/api/features/${id}?populate=deep,3`);

        const seoData = await res.json();
        const featureData = await res1.json();

        return {
            props: {
                seodata: seoData?.data?.attributes?.Pages ?? {},
                featuredata: featureData.data,
                siteUrl,
                id
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

const BackToFeature = ({ seodata, featuredata, siteUrl, id }) => {
    const renderImage = (props) => {
        const { src, alt } = props;
        const fullSrc = src.startsWith('http') ? src : `${siteUrl}${src}`;
        return <img src={fullSrc} alt={alt} />;
    };

    const content = featuredata?.attributes?.Content?.[0]?.Content ?? '';

    return (
        <>
            {/* <Seo SeoData={seodata} PageSlug={"back-to-feature"} InnerPageSlug={id} /> */}
            {/* <NavBar siteUrl={siteUrl} /> */}
            <div className="">
                <section className="top-section4-new">
                    <div className="container">
                        <div className="row">
                            <section className="container">
                                <h2>{featuredata?.attributes?.heading}</h2>
                                {featuredata?.attributes?.Content[0]?.Content_Image?.data?.attributes?.url &&
                                    <img src={siteUrl + featuredata?.attributes?.Content[0]?.Content_Image?.data?.attributes?.url} alt="" />
                                }
                            </section>
                        </div>
                    </div>
                </section>
            </div>
            <Footer siteUrl={siteUrl} />
        </>
    );
};

export default BackToFeature;
