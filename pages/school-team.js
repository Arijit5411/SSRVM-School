import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
  ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
  : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

const SchoolTeam = () => {
  const [schoolteam, setSchoolTeam] = useState([]);
  useEffect(() => {
    fetch(`${siteUrl}/api/core-school-teams?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setSchoolTeam(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Fragment>
        <NavBar />
        <div className="top-section1-new">
          <div className="container">
            <h1 className="principal-mess">Team</h1>
          </div>
          <section className="container marginTopHeader">
            <div className="container">
              {schoolteam?.data &&
                schoolteam?.data.length > 0 &&
                schoolteam?.data.map((post) => {
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
        <Footer />
      </Fragment>
    </>
  );
};

export default SchoolTeam;
