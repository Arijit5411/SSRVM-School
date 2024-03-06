import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Head from 'next/head';
// import Seo from './Seo';



import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from '@/components/Seo';

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(`${siteUrl}/api/teams?populate=*`)

    const data = await res.json()
    const data1 = await res1.json()

    return {
        props: {
            seodata: data?.data?.attributes?.Pages ?? {},
            team: data1,
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


const Team = ({ seodata, team ,siteUrl}) => {
    const [academicTeam, setAcademicTeam] = useState([]);
    const [adminTeam, setAdminTeam] = useState([]);
   
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
               <Seo SeoData={seodata} PageSlug={"team"} />

            <Fragment>
                <NavBar siteUrl={siteUrl}/>
                

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
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default Team;
