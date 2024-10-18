// import React, { Fragment, useState, useEffect } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import Testimonial from "./Testimonials";
// import HomeNews from "./HomeNews";
// import Award from "./award";
// import HomeBlog from "./HomeBlogs";
// import HomeEvents from "./HomeEvents";
// import DummyHeader from "./DummyHeader";
// import HomeAdmissionProcess from "./HomeAdmissionProcess";
// import ParentSpeakVideo from "./ParentSpeakVideo";
// import HomeGallery from "./HomeGallery";
// import HomeGlobalBlogs from "./HomeGlobalBlogs";
// import HomeGlobalEvents from "./HomeGlobalEvents";

// const HomeAbout = ({ siteUrl, homeSettings }) => {
//   const [gfounder, setGfounder] = useState(null)
//   const [homeAbout, setHomeAbout] = useState(null);
//   const [activeTab, setActiveTab] = useState("News");
//   const [events, setEvents] = useState([]);
//   const [blogs, setBlogs] = useState([]);



//   const handleTabSelect = (tabKey) => {
//     setActiveTab(tabKey);
//   };
//   const GlobalSiteUrl = process.env.GSURL
//   useEffect(() => {
//     fetch(`${siteUrl}/api/home-abouts?populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         setHomeAbout(data?.data[0]?.attributes);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch(`${GlobalSiteUrl}/api/global-home-founder?populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         setGfounder(data.data.attributes);
//         // setGfounder(data.data[0].attributes);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);


//   useEffect(() => {
//     // Fetch the list of live events on component mount
//     fetch(`${GlobalSiteUrl}/api/global-blog-enable-disables`)
//       .then((response) => response.json())
//       .then((data) => {
//         setEvents(data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching API data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch(`${GlobalSiteUrl}/api/global-event-enable-disables`)
//       .then((response) => response.json())
//       .then((data) => {
//         setBlogs(data.data)
//       })
//       .catch((error) => {
//         console.error("Error fetching API data:", error);
//       });
//   }, []);

//   const founded_by = `${gfounder?.founded_by}`;
//   const founded_by_description = `${gfounder?.founded_by_description}`;


//   useEffect(() => {
//     if (homeSettings?.attributes?.News === false) {
//       setActiveTab("Events")
//     }
//     if (homeSettings?.attributes?.News === false && homeSettings?.attributes?.Events === false) {
//       setActiveTab("Blogs")
//     }
//   }, []);

//   return (
//     <>
//       <div>
//         {/* Start Logistics area */}
//         <div className="logistics_area  IstHomeBackground1">
//           <div className="container">
//             <div className="row justify-content-start">
//               <div className="col-lg-6 remove-col-padding">
//                 <span className="subtitles">{founded_by}</span>
//                 <h1 className="title">{gfounder?.gurudev_ssrs}</h1>
//                 {/* <h2 className="title">{gfounder?.gurudev_ssrs}</h2> */}
//                 <img
//                   src={`${GlobalSiteUrl}${gfounder?.founded_by_image?.data?.attributes?.url}`}
//                   alt="school"
//                   className="image-Banner-Round"
//                 />
//               </div>
//               <div className="col-lg-6">
//                 <div className="logistics-content">
//                   <div className="section-title  text-left">
//                     <p className="fontSize">
//                       {founded_by_description && (
//                         <span
//                           dangerouslySetInnerHTML={{
//                             __html: founded_by_description.replace(
//                               /\n/g,
//                               "<br />"
//                             ),
//                           }}
//                         ></span>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="section-3" style={{ background: `url(${GlobalSiteUrl}${gfounder?.banner_image?.data?.attributes?.url})`, backgroundSize: 'cover' }}>
//           <div className="container">
//             <div className="row">
//               <p>
//                 {gfounder?.banner_description && (
//                   <span
//                     dangerouslySetInnerHTML={{
//                       __html: gfounder?.banner_description.replace(
//                         /\n/g,
//                         "<br />"
//                       ),
//                     }}
//                   ></span>
//                 )}
//                 <br></br>
//               </p>
//             </div>
//           </div>
//         </div>

//         <HomeAdmissionProcess siteUrl={siteUrl} />
//         <DummyHeader siteUrl={siteUrl} />

//         {((homeSettings === null) || (homeSettings?.attributes?.Gallery === true)) && <HomeGallery siteUrl={siteUrl} />}

//         {((homeSettings === null) || (homeSettings?.attributes?.Awards === true)) && <Award siteUrl={siteUrl} />}


//         {/* service area start */}
//         {((homeSettings === null) || (homeSettings?.attributes?.Testimonials === true)) &&
//           <div className="service-area pd-top-115 pb-lg-0 parentSpeak">
//             <div className="container">
//               <ParentSpeakVideo siteUrl={siteUrl} />
//             </div>
//             <div className="container">
//               <div className="row">
//                 <Testimonial siteUrl={siteUrl} />
//               </div>
//             </div>
//           </div>
//         }


//         {/* service area end */}
//         <div className="service-area pt-5 pd-bottom-90 pb-lg-0 newsEvent">
//           <div className="pt-5"></div>
//           <div className="container">
//             <div className="more-news-home">
//               <a href={activeTab === "Global Blogs" ? "/global-blogs" : (activeTab === "Global Events" ? "/global-events" : `/${activeTab.toLowerCase()}`)}>
//                 <p>More {activeTab === "Global Blogs" || activeTab === "Global Events" ? "" : activeTab}</p>
//               </a>
//             </div>
//             <Tabs
//               defaultActiveKey={activeTab}
//               onSelect={handleTabSelect}
//               id="uncontrolled-tab-example"
//               className="mb-3"
//             >

//               {((homeSettings === null) || (homeSettings?.attributes?.News === true)) &&
//                 <Tab eventKey="News" title="News">
//                   <div className="service-area  pb-lg-0"
//                     style={{ background: "url(assets/img/service/bg.png)" }}
//                   >
//                     <HomeNews siteUrl={siteUrl} />
//                   </div>
//                 </Tab>
//               }

//               {((homeSettings === null) || (homeSettings?.attributes?.Events === true)) &&
//                 <Tab eventKey="Events" title="Events">
//                   <HomeEvents siteUrl={siteUrl} />
//                 </Tab>
//               }

//               {((homeSettings === null) || (homeSettings?.attributes?.Blogs === true)) &&
//                 <Tab eventKey="Blogs" title="Blogs">
//                   <HomeBlog siteUrl={siteUrl} />
//                 </Tab>
//               }

//               {events.map(
//                 (event) =>
//                   !event.attributes.enable_disable && (
//                     <Tab key={event.id} eventKey="Global Blogs" title="Global Blogs">
//                       <HomeGlobalBlogs siteUrl={siteUrl} />
//                     </Tab>
//                   )
//               )}

//               {blogs.map(
//                 (blog) =>
//                   !blog.attributes.enable_disable && (
//                     <Tab key={blog.id} eventKey="Global Events" title="Global Events">
//                       <HomeGlobalEvents siteUrl={siteUrl} />
//                     </Tab>
//                   )
//               )}
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomeAbout;








import React, { useState, useEffect } from "react";
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
  const [gfounder, setGfounder] = useState(null);
  const [homeAbout, setHomeAbout] = useState(null);
  const [activeTab, setActiveTab] = useState("News");
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const GlobalSiteUrl = process.env.GSURL;

  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
  };

  useEffect(() => {
    // Fetch Home About data
    fetch(`${siteUrl}/api/home-abouts?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setHomeAbout(data?.data[0]?.attributes);
      })
      .catch((error) => console.error("Error fetching home about data:", error));
  }, [siteUrl]);

  useEffect(() => {
    // Fetch Global Founder data
    fetch(`${GlobalSiteUrl}/api/global-home-founder?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setGfounder(data.data.attributes);
      })
      .catch((error) => console.error("Error fetching global founder data:", error));
  }, [GlobalSiteUrl]);

  useEffect(() => {
    // Fetch Global Blog Enable/Disable settings
    fetch(`${GlobalSiteUrl}/api/global-blog-enable-disables`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.data);
      })
      .catch((error) => console.error("Error fetching events data:", error));
  }, [GlobalSiteUrl]);

  useEffect(() => {
    // Fetch Global Event Enable/Disable settings
    fetch(`${GlobalSiteUrl}/api/global-event-enable-disables`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.data);
      })
      .catch((error) => console.error("Error fetching blogs data:", error));
  }, [GlobalSiteUrl]);

  useEffect(() => {
    if (homeSettings) {
      if (homeSettings?.attributes?.News === false) {
        setActiveTab("Events");
      }
      if (homeSettings?.attributes?.News === false && homeSettings?.attributes?.Events === false) {
        setActiveTab("Blogs");
      }
    }
  }, [homeSettings]);


  const founded_by = gfounder?.founded_by || "";
  const founded_by_description = gfounder?.founded_by_description || "";

  return (
    <>
      <div>
        {/* Start Logistics area */}
        <div className="logistics_area IstHomeBackground1">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-lg-6 remove-col-padding">
                <span className="subtitles">{founded_by}</span>
                <h1 className="title">{gfounder?.gurudev_ssrs}</h1>
                <img
                  src={`${GlobalSiteUrl}${gfounder?.founded_by_image?.data?.attributes?.url}`}
                  alt="school"
                  className="image-Banner-Round"
                />
              </div>
              <div className="col-lg-6">
                <div className="logistics-content">
                  <div className="section-title text-left">
                    <p className="fontSize">
                      {founded_by_description && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: founded_by_description.replace(/\n/g, "<br />"),
                          }}
                        />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="section-3"
          style={{
            background: `url(${GlobalSiteUrl}${gfounder?.banner_image?.data?.attributes?.url})`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="row">
              <p>
                {gfounder?.banner_description && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: gfounder?.banner_description.replace(/\n/g, "<br />"),
                    }}
                  />
                )}
                <br />
              </p>
            </div>
          </div>
        </div>

        {/* Other Components */}
        <HomeAdmissionProcess siteUrl={siteUrl} />
        <DummyHeader siteUrl={siteUrl} />

        {((homeSettings === null) || homeSettings?.attributes?.Gallery) && (
          <HomeGallery siteUrl={siteUrl} />
        )}

        {((homeSettings === null) || homeSettings?.attributes?.Awards) && (
          <Award siteUrl={siteUrl} />
        )}

        {/* Testimonials Area */}
        {((homeSettings === null) || homeSettings?.attributes?.Testimonials) && (
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
        )}

        {/* Tabs Section */}
        {(
          (homeSettings?.attributes?.News ||
            homeSettings?.attributes?.Events ||
            homeSettings?.attributes?.Blogs ||
            events[0]?.attributes.enable_disable ||
            blogs[0]?.attributes.enable_disable)
        ) && (
            <div className="service-area pt-5 pd-bottom-90 pb-lg-0 newsEvent">
              <div className="pt-5"></div>
              <div className="container">
                <div className="more-news-home">
                  <a
                    href={
                      activeTab === "Global Blogs"
                        ? "/global-blogs"
                        : activeTab === "Global Events"
                          ? "/global-events"
                          : activeTab === "Blogs"
                            ? "/blog"  // Set to /blog instead of /blogs
                            : `/${activeTab.toLowerCase()}`
                    }
                  >
                    <p>
                      More {activeTab === "Global Blogs" || activeTab === "Global Events" ? "" : activeTab}
                    </p>
                  </a>
                </div>
                <Tabs key={activeTab} defaultActiveKey={activeTab} onSelect={handleTabSelect} id="uncontrolled-tab-example" className="mb-3">
                  {homeSettings?.attributes?.News && (
                    <Tab eventKey="News" title="News">
                      <div className="service-area pb-lg-0" style={{ background: "url(assets/img/service/bg.png)" }}>
                        <HomeNews siteUrl={siteUrl} />
                      </div>
                    </Tab>
                  )}

                  {homeSettings?.attributes?.Events && (
                    <Tab eventKey="Events" title="Events">
                      <HomeEvents siteUrl={siteUrl} />
                    </Tab>
                  )}

                  {homeSettings?.attributes?.Blogs && (
                    <Tab eventKey="Blogs" title="Blogs">
                      <HomeBlog siteUrl={siteUrl} />
                    </Tab>
                  )}

                  {events[0]?.attributes.enable_disable && (
                    <Tab eventKey="Global Blogs" title="Global Blogs">
                      <HomeGlobalBlogs siteUrl={siteUrl} />
                    </Tab>
                  )}

                  {blogs[0]?.attributes.enable_disable && (
                    <Tab eventKey="Global Events" title="Global Events">
                      <HomeGlobalEvents siteUrl={siteUrl} />
                    </Tab>
                  )}
                </Tabs>
              </div>
            </div>
          )}

      </div>
    </>
  );
};

export default HomeAbout;
