import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Head from 'next/head';
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === 'production';

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
    const res1 = await fetch(`${siteUrl}/api/teams?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data,
            team: data1
        }
    }
}

const Team = ({ seodata, team }) => {
    const [academicTeam, setAcademicTeam] = useState([]);
    const [adminTeam, setAdminTeam] = useState([]);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    useEffect(() => {
        // fetch(`${siteUrl}/api/teams?populate=*`)
        //     .then(response => response.json())
        //     .then(data => {
        //         const academicMembers = data.data.filter(member => member.attributes.academic_or_admin === "Core Academic Team");
        //         const adminMembers = data.data.filter(member => member.attributes.academic_or_admin === "Core Admin Team");

        //         setAcademicTeam(academicMembers);
        //         setAdminTeam(adminMembers);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
        if (team && team?.data && team?.data?.length > 0) {
            const academicMembers = team?.data.filter(member => member?.attributes?.academic_or_admin === "Core Academic Team");
            const adminMembers = team?.data.filter(member => member?.attributes?.academic_or_admin === "Core Admin Team");

            setAcademicTeam(academicMembers);
            setAdminTeam(adminMembers);
        }
    }, []);

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos`) // Replace with the actual API endpoint
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data); // Log the API response data
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[0].attributes;
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
            const seoAttributes = seodata.data[36].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);


    const TeamSection = ({ teamData }) => (
        <section className="container wrap-item-1">
            <div className="row g-4">
                {teamData.map((member, index) => (
                    <div className="col-lg-6" key={index}>
                        <div className="wrap-item-member">
                            <div className="wrap-image">
                                {member.attributes.image && member.attributes.image.data && member.attributes.image.data.attributes.url ? (
                                    <img src={`${siteUrl}${member.attributes.image.data.attributes.url}`} alt="Transpro" className="member-img" />
                                ) : (
                                    <img src="placeholder-url" alt="No Image" className="member-img" />
                                )}
                            </div>
                            <div className="wrap-text">
                                <h6>{member.attributes.designation || "No Designation"}</h6>
                                <p>{member.attributes.name || "No Name"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <Fragment>
                <NavBar />
                {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}


                <div className='top-section1-new'>
                    <div className="container">
                        <h1 className="principal-mess">Team</h1>
                    </div>
                    <section className="container marginTopHeader">
                        <div className='container'>
                            <Tabs defaultActiveKey="academicTeam" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="academicTeam" title="Core Academic Team">
                                    <TeamSection teamData={academicTeam} />
                                </Tab>
                                <Tab eventKey="adminTeam" title="Core Admin Team">
                                    <TeamSection teamData={adminTeam} />
                                </Tab>
                            </Tabs>
                        </div>
                    </section>
                </div>
                <Footer />
            </Fragment>
        </>
    );
};

export default Team;
