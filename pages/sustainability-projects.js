import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
// import Seo from './Seo';
import Head from 'next/head';


import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/sustainability-projects-pages?populate[projects][populate]=*&populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            project: data1,
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

const Sustainability_Projects = ({ seodata, project,siteUrl }) => {
    const [sustainabilityProjects, setSustainabilityProjects] = useState(null);
   

    useEffect(() => {
        // fetch(`${siteUrl}/api/sustainability-projects-pages?populate=*`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setSustainabilityProjects(data.data[0].attributes);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (project && project?.data && project?.data?.length > 0) {
            setSustainabilityProjects(project?.data[0].attributes)
        }
    }, []);

   
    const page_title = `${sustainabilityProjects?.page_title}`
    const paragraph = `${sustainabilityProjects?.paragraph}`

    const image_1_heading = `${sustainabilityProjects?.image_1_heading}`
    const image_2_heading = `${sustainabilityProjects?.image_2_heading}`
    const image_3_heading = `${sustainabilityProjects?.image_3_heading}`

    const image_1_description = `${sustainabilityProjects?.image_1_description}`
    const image_2_description = `${sustainabilityProjects?.image_2_description}`
    const image_3_description = `${sustainabilityProjects?.image_3_description}`

    const image_1 = `${siteUrl}${sustainabilityProjects?.image_1?.data?.attributes?.url}`
    const image_2 = `${siteUrl}${sustainabilityProjects?.image_2?.data?.attributes?.url}`
    const image_3 = `${siteUrl}${sustainabilityProjects?.image_3?.data?.attributes?.url}`

    const knowmore_link_1 = `${sustainabilityProjects?.knowmore_link_1}`
    const knowmore_link_2 = `${sustainabilityProjects?.knowmore_link_2}`
    const knowmore_link_3 = `${sustainabilityProjects?.knowmore_link_3}`

    return (
        <>
            <Fragment>
            <Seo SeoData={seodata} PageSlug={"sustainability-projects"} />

                <NavBar siteUrl={siteUrl}/>

                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}
                <div className='top-section37'>
                    <section className="wrap-item-timing-se1">
                        <div className="container">
                            <div className="wrap-item-timing">
                                <h1 className="wrap-heading-sch">
                                    {page_title}
                                </h1>
                                <p className='wrap-proj desktophide'>
                                    {paragraph && <span dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g) }}></span>}
                                </p>
                                <p className='wrap-proj mobilehide'>
                                    {paragraph && <span dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, "<br />") }}></span>}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="container wrap-news-sec-2">
                        <div className='row'>
                            {
                                sustainabilityProjects?.projects && sustainabilityProjects?.projects.length > 0 && sustainabilityProjects?.projects.map(prj => {
                                    return (
                                        <>
                                            <div key={prj?.id} className='col-lg-6'>
                                                <div className="card wrap-sust-proj">
                                                    <img src={`${siteUrl}${prj.image?.data?.attributes?.url}`} className="wrap-img-proj" alt={prj?.Heading} />
                                                    <div className="card-body">
                                                        <h4 className="card-text-news">
                                                            {prj?.Heading}
                                                        </h4>
                                                        <p>
                                                            {prj?.description && <span dangerouslySetInnerHTML={{ __html: prj?.description.replace(/\n/g) }}></span>}
                                                        </p>
                                                        <a href={prj?.know_more_link} className="text-muted-news colorred">Know more</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {/* <div className='col-lg-6'>
                                <div className="card wrap-sust-proj">
                                    <img src={image_1} className="wrap-img-proj" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-text-news">
                                            {image_1_heading}
                                        </h4>
                                        <p>
                                            {image_1_description && <span dangerouslySetInnerHTML={{ __html: image_1_description.replace(/\n/g) }}></span>}
                                        </p>
                                        <a href={knowmore_link_1} className="text-muted-news colorred">Know more</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className="card wrap-sust-proj">
                                    <img src={image_2} className="wrap-img-proj" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-text-news">
                                            {image_2_heading}
                                        </h4>
                                        <p>
                                            {image_2_description && <span dangerouslySetInnerHTML={{ __html: image_2_description.replace(/\n/g) }}></span>}
                                        </p>
                                        <a href={knowmore_link_2} className="text-muted-news colorred">Know more</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className="card wrap-sust-proj">
                                    <img src={image_3} className="wrap-img-proj" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-text-news">
                                            {image_3_heading}
                                        </h4>
                                        <p>
                                            {image_3_description && <span dangerouslySetInnerHTML={{ __html: image_3_description.replace(/\n/g) }}></span>}
                                        </p>
                                        <a href={knowmore_link_3} className="text-muted-news colorred">Kwow more</a>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </section>

                </div >
                <Footer siteUrl={siteUrl}/>
            </Fragment >
        </>
    );
}

export default Sustainability_Projects;