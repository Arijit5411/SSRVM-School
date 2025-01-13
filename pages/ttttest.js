import HomeAutoPopup from '@/components/HomeAutoPopup';
import MainSlider from '@/components/Sliders/MainSlider1';
import React from 'react'
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Marquee from 'react-fast-marquee';
import MainAccordion from '@/components/Accordion/MainAccordion';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';




export const getServerSideProps = async (context) => {
    const siteUrl = determineStrapiUrl(context);
    try {
        // const res2 = await fetch(`${siteUrl}/api/home?populate=*`);
        const res3 = await fetch(`${siteUrl}/api/home-popup-slider?populate=*`);
        // const res4 = await fetch(`${siteUrl}/api/seo?populate=deep, 10`);
        // const data2 = await res2.json();
        const data3 = await res3.json();
        // const data4 = await res4.json();
        return {
            props: {
                siteUrl,
                // homeSettings: data2?.data,
                homePopupSlider: data3?.data,
                // seodata: data4?.data?.attributes?.Pages ?? {},
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);

        return {
            props: {
                data: [],
                siteUrl,
            },
        };
    }
};


const northBanglor = ({ siteUrl, homePopupSlider }) => {



    return (
        <main>
    
            {/* ================================================================ s2 */}

            <section className='py-5'>
                <div className='container'>
                    <div className=''>
                        <h3 className='text-uppercase text-center fs-20 fs-md-22 fs-lg-24 fw-500'>Things to note</h3>
                        <h2 className='fs-32 fs-md-46 fs-lg-56 fw-600 text-center'>FAQs</h2>
                        <MainAccordion accordionData={accordionData} />
                    </div>
                </div>
            </section>

            <Footer siteUrl={siteUrl} />

        </main >
    )
}

export default northBanglor