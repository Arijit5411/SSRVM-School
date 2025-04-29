import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
// import Seo from './Seo';



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
    try {
        const siteUrl = determineStrapiUrl(context);
        const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
        const res1 = await fetch(`${siteUrl}/api/virtual-tours`)

        const data = await res.json()
        const data1 = await res1.json()

        return {
            props: {
                seodata: data?.data?.attributes?.Pages ?? {},
                virtual: data1,
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


const VirtualTour = ({ seodata, virtual, siteUrl }) => {

    const [virtualTour, setVirtualTour] = useState(null);


    useEffect(() => {

        if (virtual && virtual?.data && virtual?.data?.length > 0) {
            setVirtualTour(virtual?.data[0]?.attributes)
        }
    }, []);


    return (
        <>
            <Seo SeoData={seodata} PageSlug={"virtual-tour"} />

            <NavBar siteUrl={siteUrl} />


            {virtualTour ? (
                <div className="top-pl-css">
                    <div className="container">
                        <h1 className="principal-mess">{virtualTour.title}</h1>
                    </div>
                    <div className="desktophide marginTopHeader">
                        <iframe
                            width="100%"
                            height="500"
                            src={virtualTour.tour_link}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="mobilehide">
                        <iframe
                            width="100%"
                            height="850"
                            src={virtualTour.tour_link}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            ) : (
                <div className="top-pl-css">
                    <div className='container'>
                        <h4> Sorry Currently no tour</h4>
                    </div>
                </div>
            )}
            <Footer siteUrl={siteUrl} />

        </>
    )

}

export default VirtualTour;