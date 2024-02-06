import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Head from 'next/head';
// import Seo from './Seo';



import { determineStrapiUrl } from "@/utils/strapiUtils";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/virtual-tours`)

    const data = await res.json()
    const data1 = await res1.json()
   
    return {
        props: {
            seodata: data,
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


const VirtualTour = ({ seodata, virtual,siteUrl }) => {

    const [virtualTour, setVirtualTour] = useState(null);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/virtual-tours`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setVirtualTour(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (virtual && virtual?.data && virtual?.data?.length > 0) {
            setVirtualTour(virtual?.data[0]?.attributes)
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[34].attributes;
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
            const seoAttributes = seodata.data[34].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);     
    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <NavBar siteUrl={siteUrl}/>
            {/* {seoData && (
                <Seo
                    title={seoData.title}
                    metaTitle={seoData.metaTitle}
                    metaDescription={seoData.metaDescription}
                />
            )} */}

            {virtualTour && (
                <div className='top-section1'>
                    <div className="container">
                        <h1 className="principal-mess">{virtualTour.title}</h1>
                    </div>
                      <div className='desktophide marginTopHeader'>
                        <iframe width="100%" height="500" src={virtualTour.tour_link}  frameborder="0"
                            allowfullscreen></iframe>
                    </div>
                    <div className='mobilehide'>
                        <iframe width="100%" height="850" src={virtualTour.tour_link}  frameborder="0"
                            allowfullscreen></iframe>

                    </div>  
                     
                   
                </div>
            )}
            <Footer siteUrl={siteUrl}/>

        </>
    )

}

export default VirtualTour;