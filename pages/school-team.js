import React, { Fragment } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { determineStrapiUrl } from "@/utils/strapiUtils";
export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/core-school-teams?populate=*`);
    const data = await res.json();
    return {
      props: {
        data,
        siteUrl,
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

const SchoolTeam = ({ data, siteUrl }) => {
  return (
    <>
      <Fragment>
        <NavBar siteUrl={siteUrl} />
        <div className="top-section1-new">
          <div className="container">
            <h1 className="principal-mess">Team</h1>
          </div>
          <section className="container marginTopHeader">
            <div className="container">
              {data?.data &&
                data?.data.length > 0 &&
                data?.data.map((post) => {
                  return (
                    <div className="col-lg-6" key={post.id}>
                      <div className="wrap-item-member">
                        <div className="wrap-image">
                          {post.attributes.image &&
                          post.attributes.image.data.attributes.url ? (
                            <img
                              src={`${siteUrl}${post.attributes.image.data.attributes.url}`}
                              alt="Transpro"
                              className="member-img"
                            />
                          ) : (
                            <img
                              src="placeholder-url"
                              alt="No Image"
                              className="member-img"
                            />
                          )}
                        </div>
                        <div className="wrap-text">
                          <h6>
                            {post.attributes.designation || "No Designation"}
                          </h6>
                          <p>{post.attributes.full_name || "No Name"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
        <Footer siteUrl={siteUrl} />
      </Fragment>
    </>
  );
};

export default SchoolTeam;
