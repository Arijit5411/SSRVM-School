import React, { Fragment, useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Testimonial from "./Testimonials";
import HomeNews from "./HomeNews";
import Award from "./award";
import HomeBlog from "./HomeBlogs";
import HomeEvents from "./HomeEvents";
import DummyHeader from "./DummyHeader";
import HomeAdmissionProcess from "./HomeAdmissionProcess";
import ParentSpeakVideo from "./ParentSpeakVideo";
import HomeGallery from "./HomeGallery";
import HomeGlobalBlogs from "./HomeGlobalBlogs";
import HomeGlobalEvents from "./HomeGlobalEvents";

const HomeAbout = ({ siteUrl, homeSettings }) => {
  const [gfounder, setGfounder] = useState(null)
  const [homeAbout, setHomeAbout] = useState(null);
  const [activeTab, setActiveTab] = useState("News");
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);



  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
  };
  const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"
  useEffect(() => {
    fetch(`${siteUrl}/api/home-abouts?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setHomeAbout(data?.data[0]?.attributes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${GlobalSiteUrl}/api/global-home-founder?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setGfounder(data.data.attributes);
        // setGfounder(data.data[0].attributes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  useEffect(() => {
    // Fetch the list of live events on component mount
    fetch(`${GlobalSiteUrl}/api/global-blog-enable-disables`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${GlobalSiteUrl}/api/global-event-enable-disables`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.data)
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  const founded_by = `${gfounder?.founded_by}`;
  const founded_by_description = `${gfounder?.founded_by_description}`;

  return (
    <>
      <div>
        {/* Start Logistics area */}
        <div className="logistics_area  IstHomeBackground1">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-lg-6 remove-col-padding">
                <span className="subtitles">{founded_by}</span>
                <h2 className="title">{gfounder?.gurudev_ssrs}</h2>
                <img
                  src={`${GlobalSiteUrl}${gfounder?.founded_by_image?.data?.attributes?.url}`}
                  alt="school"
                  className="image-Banner-Round"
                />
              </div>
              <div className="col-lg-6">
                <div className="logistics-content">
                  <div className="section-title  text-left">
                    <p className="fontSize">
                      {founded_by_description && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: founded_by_description.replace(
                              /\n/g,
                              "<br />"
                            ),
                          }}
                        ></span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-3" style={{ background: `url(${GlobalSiteUrl}${gfounder?.banner_image?.data?.attributes?.url})`, backgroundSize: 'cover' }}>
          <div className="container">
            <div className="row">
              <p>
                {gfounder?.banner_description && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: gfounder?.banner_description.replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  ></span>
                )}
                <br></br>
              </p>
            </div>
          </div>
        </div>

        <HomeAdmissionProcess siteUrl={siteUrl} />

        <DummyHeader siteUrl={siteUrl} />

        {((homeSettings === null) || (homeSettings?.attributes?.Gallery === true)) && <HomeGallery siteUrl={siteUrl} />}

        {((homeSettings === null) || (homeSettings?.attributes?.Awards === true)) && <Award siteUrl={siteUrl} />}


        {/* service area start */}
        {((homeSettings === null) || (homeSettings?.attributes?.Testimonials === true)) &&
          <div className="service-area pd-top-115 pb-lg-0 parentSpeak">
            <div className="container">
              <ParentSpeakVideo siteUrl={siteUrl} />
            </div>
            <div className="container">
              <div className="row">
                <Testimonial siteUrl={siteUrl} />
              </div>
            </div>
          </div>
        }


        {/* service area end */}
        <div className="service-area pt-5 pd-bottom-90 pb-lg-0 newsEvent">
          <div className="pt-5"></div>
          <div className="container">
            <div className="more-news-home">
              <a href={activeTab === "Global Blogs" ? "/global-blogs" : (activeTab === "Global Events" ? "/global-events" : `/${activeTab.toLowerCase()}`)}>
                <p>More {activeTab === "Global Blogs" || activeTab === "Global Events" ? "" : activeTab}</p>
              </a>
            </div>
            <Tabs
              defaultActiveKey="News"
              onSelect={handleTabSelect}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="News" title="News">
                <div
                  className="service-area  pb-lg-0"
                  style={{ background: "url(assets/img/service/bg.png)" }}
                >
                  <HomeNews siteUrl={siteUrl} />
                </div>
              </Tab>
              <Tab eventKey="Events" title="Events">
                <HomeEvents siteUrl={siteUrl} />
              </Tab>

              {((homeSettings === null) || (homeSettings?.attributes?.Blogs === true)) &&
                <Tab eventKey="Blogs" title="Blogs">
                  <HomeBlog siteUrl={siteUrl} />
                </Tab>
              }

              {events.map(
                (event) =>
                  event.attributes.enable_disable && (
                    <Tab key={event.id} eventKey="Global Blogs" title="Global Blogs">
                      <HomeGlobalBlogs siteUrl={siteUrl} />
                    </Tab>
                  )
              )}

              {blogs.map(
                (blog) =>
                  blog.attributes.enable_disable && (
                    <Tab key={blog.id} eventKey="Global Events" title="Global Events">
                      <HomeGlobalEvents siteUrl={siteUrl} />
                    </Tab>
                  )
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAbout;
