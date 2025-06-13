import React, { useState, useEffect } from "react";
import MenuPopup from "./menuPopup";
import MobileMenu from "./mobileMenu";
import AdmissionEnquiry from "./AdmissionEnquiry";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaAngleDown,
  FaCalendarAlt,
  FaWhatsapp,
} from "react-icons/fa";
import ImportantAnnouncment from "./ImportantAnnouncment";
import Head from "next/head";
import MandatoryDisclosure from "./MandatoryDisclosure";

const NavBar = ({ siteUrl }) => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [data, setData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [schoolData, setschoolData] = useState([]);
  const [social, setSocial] = useState([]);
  const [enableDisable, setEnableDisable] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch(`${siteUrl}/api/navbar-menu-headers?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, [siteUrl]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const togglePopup1 = () => {
    setShowPopup1(!showPopup1);
  };
  const togglePopup2 = () => {
    setShowPopup2(!showPopup2);
  };

  useEffect(() => {
    fetch(`${siteUrl}/api/menus?nested&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setMenuData(data.data[0].attributes.items.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [siteUrl]);

  useEffect(() => {
    fetch(`${siteUrl}/api/menus?filters[slug][$eq]=school-links&nested&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        const items = data?.data[0]?.attributes?.items?.data;
        setschoolData(items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [siteUrl]);

  useEffect(() => {
    fetch(`${siteUrl}/api/social-links`)
      .then((response) => response.json())
      .then((data) => {
        const items = data?.data;
        setSocial(items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [siteUrl]);

  useEffect(() => {
    fetch(`${siteUrl}/api/admission-enable-disables?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        const items = data?.data[0]?.attributes;
        setEnableDisable(items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [siteUrl]);

  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => {
        setLoaded(true); // ✅ Trigger 3 seconds after full page load
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);


  return (
    <>
      <Head>
        {apiData && apiData.data && apiData.data.length > 0 && (
          <link rel="icon" href={`${siteUrl}${apiData.data[0].attributes.logo?.data?.attributes?.url}`} />
        )}
      </Head>
      {Loaded &&
        <>
          <div className="mobilehide">
            <header className="navbar-are">
              <nav
                className={
                  "navbar navbar-area-1  navbar-area-3 navbar-area navbar-expand-lg d-flex flex-column"
                }
              >
                <MandatoryDisclosure siteUrl={siteUrl} />
                <ImportantAnnouncment siteUrl={siteUrl} />
                <div className="container nav-container">
                  <div className="responsive-mobile-menu">
                    <button
                      onClick={() => setOpen(!open)}
                      className={
                        open
                          ? "menu toggle-btn d-block d-lg-none open"
                          : "menu toggle-btn d-block d-lg-none "
                      }
                      data-target="#transpro_main_menu"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="icon-left" />
                      <span className="icon-right" />
                    </button>
                  </div>
                  <div className="logo">
                    <Link className="home-logo-a1" href="/">
                      {apiData && apiData.data && apiData.data.length > 0 && (
                        <img
                          src={`${siteUrl}${apiData.data[0].attributes.logo?.data?.attributes?.url}`}
                          alt="Transpro"
                        />
                      )}
                      <span className="logo-text">Home</span>
                    </Link>
                  </div>

                  <div className="nav-left-part"></div>

                  <div
                    className={
                      open
                        ? "collapse navbar-collapse sopen"
                        : "collapse navbar-collapse"
                    }
                    id="transpro_main_menu"
                  >
                    <div className="dropdown logotext">
                      <button className="dropbtn">
                        {schoolData && schoolData.length > 0 && schoolData[0].attributes.title}
                        <FaAngleDown className="arrowleft" />
                      </button>
                      <div className="dropdown-content">
                        {schoolData && schoolData.map((item) => (
                          <a
                            key={item.id}
                            href={item.attributes.url}
                            target={item.attributes.target}
                          >
                            {item.attributes.title}
                          </a>
                        ))}
                      </div>
                    </div>

                    <ul className="navbar-nav menu-open text-end">
                      <>
                        {menuData.map((menuItem, index) => (
                          <li
                            key={index}
                            className={
                              menuItem.attributes.children &&
                                menuItem.attributes.children.data.length > 0
                                ? "menu-item-has-children"
                                : ""
                            }
                          >
                            <a
                              href={menuItem.attributes.url}
                              target={menuItem.attributes.target}
                              onClick={(e) => {
                                if (menuItem.attributes.children && menuItem.attributes.children.data.length > 0) {
                                  e.preventDefault();
                                  const subMenu = e.currentTarget.nextElementSibling;
                                  if (subMenu) {
                                    subMenu.classList.toggle("active");
                                    e.currentTarget.classList.toggle("open");
                                  }
                                }
                              }}
                            >
                              {menuItem.attributes.title}
                            </a>
                            {menuItem.attributes.children &&
                              menuItem.attributes.children.data.length > 0 && (
                                <ul className="sub-menu">
                                  {menuItem.attributes.children.data.map(
                                    (childItem, childIndex) => (
                                      <li key={childIndex}>
                                        <div className="sub-link-wrapper">
                                          <a className="sub-link"
                                            href={childItem.attributes.url}
                                            target={childItem.attributes.target}
                                          >
                                            {childItem.attributes.title}
                                            {childItem.attributes.children &&
                                              childItem.attributes.children.data.length > 0 && (
                                                <span>
                                                  {`>`}
                                                </span>)}
                                          </a>
                                          {childItem.attributes.children &&
                                            childItem.attributes.children.data.length > 0 && (
                                              <>

                                                <ul className="sub-menu-2">
                                                  {childItem.attributes.children.data.map(
                                                    (childItem2, childIndex2) => (
                                                      <li key={childIndex2}>

                                                        <a
                                                          href={childItem2.attributes.url}
                                                          target={childItem2.attributes.target}
                                                        >
                                                          {childItem2.attributes.title}
                                                        </a>
                                                        <ul>

                                                        </ul>
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              </>
                                            )}
                                        </div>

                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                          </li>
                        ))}
                      </>
                      <li>
                        <span className="menuPopup" onClick={togglePopup}>
                          Menu
                        </span>
                      </li>
                    </ul>
                    {enableDisable.Admission_Form_Button === true && (
                      <div className="admission d-none d-md-block">
                        <button onClick={togglePopup1}>Admission Enquiry</button>
                      </div>
                    )}
                  </div>
                </div>
                {showPopup && <MenuPopup siteUrl={siteUrl} onClose={togglePopup} />}
              </nav>
            </header>
            <div className="sticky-icon">
              {social && social.map((item) => (
                item.attributes.Show_in_Sidebar !== false && (
                  <a className="d-inline-flex" href={item.attributes.Url} key={item.id}
                    dangerouslySetInnerHTML={{ __html: item.attributes.Icon }}
                    target={item.attributes.Open_Self ? "_self" : "_blank"}>
                  </a>
                )
              ))}
            </div>
            {showPopup1 && <AdmissionEnquiry siteUrl={siteUrl} onClose={togglePopup1} />}
          </div>

          <div className="desktophide">
            <MandatoryDisclosure siteUrl={siteUrl} />
            <ImportantAnnouncment siteUrl={siteUrl} />
            <header className="navbar-area">
              <nav className="mobileshowmenu">
                <div className="container nav-container">
                  {enableDisable.Admission_Form_Button === true && (
                    <div className="admission d-md-none">
                      <button onClick={togglePopup1}>Admission Enquiry</button>
                    </div>
                  )}
                  <div className="responsive-mobile-menu">
                    <button
                      onClick={togglePopup2}
                      className={
                        open
                          ? "menu toggle-btn d-block d-lg-none open"
                          : "menu toggle-btn d-block d-lg-none "
                      }
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      Menu
                    </button>
                    {showPopup2 && <MobileMenu siteUrl={siteUrl} onClose={togglePopup2} />}
                  </div>
                  <div className="logo">
                    <Link className="logo-1" href="/">
                      {apiData && apiData.data && apiData.data.length > 0 && (
                        <img
                          src={`${siteUrl}${apiData.data[0].attributes.logo?.data?.attributes?.url}`}
                          className="mobileLogo"
                        />)}
                    </Link>
                    <div className="dropdown logotext mobileDropDown">
                      <button className="dropbtnMobile">
                        {schoolData.length > 0 && schoolData[0].attributes.title}
                        <FaAngleDown className="arrowleft" />
                      </button>
                      <div className="dropdown-content">
                        {schoolData.map((item) => (
                          <a
                            key={item.id}
                            href={item.attributes.url}
                            target={item.attributes.target}
                          >
                            {item.attributes.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
          </div>
        </>
      }
    </>
  );
};

export default NavBar;

















// import React, { useState, useEffect, useRef } from "react";
// import MenuPopup from "./menuPopup";
// import MobileMenu from "./mobileMenu";
// import AdmissionEnquiry from "./AdmissionEnquiry";
// import Link from "next/link";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,
//   FaYoutube,
//   FaAngleDown,
//   FaCalendarAlt,
//   FaWhatsapp,
// } from "react-icons/fa";
// import ImportantAnnouncment from "./ImportantAnnouncment";
// import Head from "next/head";

// const NavBar = ({ siteUrl }) => {
//   const [open, setOpen] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); // New state variable for popup
//   const [showPopup1, setShowPopup1] = useState(false); // New state variable for popup
//   const [showPopup2, setShowPopup2] = useState(false); // New state variable for popup
//   const [data, setData] = useState(null);
//   const [menuData, setMenuData] = useState([]);
//   const [schoolData, setschoolData] = useState([]);
//   const [social, setSocial] = useState([]);
//   const [enableDisable, setEnableDisable] = useState(false);

//   const [apiData, setApiData] = useState(null);
//   useEffect(() => {
//     // Make the API call using fetch
//     fetch(`${siteUrl}/api/navbar-menu-headers?populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Set the API data in the state
//         setApiData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data from the API:", error);
//       });
//   }, []);


//   // Function to toggle the popup
//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };
//   const togglePopup1 = () => {
//     setShowPopup1(!showPopup1);
//   };
//   const togglePopup2 = () => {
//     setShowPopup2(!showPopup2);
//   };
//   // Control sidebar navigation
//   let items =
//     typeof document !== "undefined" &&
//     document.querySelectorAll(".menu-item-has-children > a");
//   // let items = useRef()
//   for (let i in items) {
//     if (items.hasOwnProperty(i)) {
//       items[i].onclick = function () {
//         this.parentElement
//           .querySelector(".sub-menu")
//           .classList.toggle("active");
//         this.classList.toggle("open");
//       };
//     }
//   }


//   // useEffect(() => {
//   //   // Fetch data from the API
//   //   fetch(`${siteUrl}/api/whatsapp-chats`)
//   //     .then((response) => response.json())
//   //     .then((responseData) => {
//   //       if (
//   //         responseData &&
//   //         responseData.data &&
//   //         responseData.data[0] &&
//   //         responseData.data[0].attributes
//   //       ) {
//   //         setData(responseData.data[0].attributes);
//   //       } else {
//   //         console.error("API response is missing expected data structure.");
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data from the API:", error);
//   //     });
//   // }, []);

//   useEffect(() => {
//     // Fetch menu data from the API endpoint
//     fetch(`${siteUrl}/api/menus?nested&populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.data && data.data.length > 0) {
//           setMenuData(data.data[0].attributes.items.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching menu data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch the API data
//     fetch(`${siteUrl}/api/menus?filters[slug][$eq]=school-links&nested&populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Extract menu items from the API response
//         const items = data?.data[0]?.attributes?.items?.data;
//         setschoolData(items);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch the API data
//     fetch(`${siteUrl}/api/social-links`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Extract menu items from the API response
//         const items = data?.data;
//         setSocial(items);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Fetch the API data
//     fetch(`${siteUrl}/api/admission-enable-disables?populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Extract menu items from the API response
//         const items = data?.data[0]?.attributes;
//         setEnableDisable(items);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <>
//       <Head>
//         {apiData && apiData.data && apiData.data.length > 0 && (
//           <link rel="icon" href={`${siteUrl}${apiData.data[0].attributes.logo?.data?.attributes?.url}`} />
//         )}
//       </Head>
//       <div className="mobilehide">
//         <header className="navbar-are">
//           <nav
//             className={
//               "navbar navbar-area-1  navbar-area-3 navbar-area navbar-expand-lg d-flex flex-column"
//             }
//           >
//             <ImportantAnnouncment siteUrl={siteUrl} />
//             <div className="container nav-container">
//               <div className="responsive-mobile-menu">
//                 <button
//                   onClick={() => setOpen(!open)}
//                   className={
//                     open
//                       ? "menu toggle-btn d-block d-lg-none open"
//                       : "menu toggle-btn d-block d-lg-none "
//                   }
//                   data-target="#transpro_main_menu"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   <span className="icon-left" />
//                   <span className="icon-right" />
//                 </button>
//               </div>
//               <div className="logo">
//                 <Link href="/">
//                   {apiData && apiData.data && apiData.data.length > 0 && (
//                     <img
//                       src={`${siteUrl}${apiData.data[0].attributes.logo?.data?.attributes?.url}`}
//                       alt="Transpro"
//                     />
//                   )}
//                 </Link>
//               </div>
//               <div className="nav-left-part"></div>

//               <div
//                 className={
//                   open
//                     ? "collapse navbar-collapse sopen"
//                     : "collapse navbar-collapse"
//                 }
//                 id="transpro_main_menu"
//               >
//                 <div className="dropdown logotext">
//                   <button className="dropbtn">
//                     {schoolData && schoolData.length > 0 && schoolData[0].attributes.title}
//                     <FaAngleDown className="arrowleft" />
//                   </button>
//                   <div className="dropdown-content">
//                     {schoolData && schoolData.map((item) => (
//                       <a
//                         key={item.id}
//                         href={item.attributes.url}
//                         target={item.attributes.target}
//                       >
//                         {item.attributes.title}
//                       </a>
//                     ))}
//                   </div>
//                 </div>

//                 <ul className="navbar-nav menu-open text-end">
//                   <>
//                     {menuData.map((menuItem, index) => (
//                       <li
//                         key={index}
//                         className={
//                           menuItem.attributes.children &&
//                             menuItem.attributes.children.data.length > 0
//                             ? "menu-item-has-children"
//                             : ""
//                         }
//                       >
//                         <a
//                           ref={items}
//                           href={menuItem.attributes.url}
//                           target={menuItem.attributes.target}
//                         >
//                           {menuItem.attributes.title}
//                         </a>
//                         {menuItem.attributes.children &&
//                           menuItem.attributes.children.data.length > 0 && (
//                             <ul className="sub-menu">
//                               {menuItem.attributes.children.data.map(
//                                 (childItem, childIndex) => (
//                                   <li key={childIndex}>
//                                     <a
//                                       href={childItem.attributes.url}
//                                       target={childItem.attributes.target}
//                                     >
//                                       {childItem.attributes.title}
//                                     </a>
//                                   </li>
//                                 )
//                               )}
//                             </ul>
//                           )}
//                       </li>
//                     ))}
//                   </>
//                   <li>
//                     <span className="menuPopup" onClick={togglePopup}>
//                       Menu
//                     </span>
//                   </li>
//                 </ul>
//                 {enableDisable.Admission_Form_Button === true && (
//                   <div className="admission d-none d-md-block">
//                     <button onClick={togglePopup1}>Admission Enquiry</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* Conditionally render the popup */}
//             {showPopup && <MenuPopup siteUrl={siteUrl} onClose={togglePopup} />}
//           </nav>
//         </header>
//         <div className="sticky-icon">

//           {social && social.map((item) => (
//             item.attributes.Show_in_Sidebar !== false && (
//               <a className="d-inline-flex" href={item.attributes.Url} key={item.id}
//                 dangerouslySetInnerHTML={{ __html: item.attributes.Icon }}
//                 target={item.attributes.Open_Self ? "_self" : "_blank"}>
//               </a>
//             )
//           ))}


//           {/* {social?.facebook_link?.length > 0 && (
//             <a
//               title="Facebook"
//               href={social?.facebook_link}
//               target="new"
//               className="facebook"
//             >
//               <FaFacebookF className="socialFont" />
//             </a>
//           )}
//           {social?.twitter_link?.length > 0 && (
//             <a
//               title="Twitter"
//               href={social?.twitter_link}
//               className="twitter"
//               target="new"
//             >
//               <FaTwitter className="socialFont" />
//             </a>
//           )}
//           {social?.youtube_link?.length > 0 && (
//             <a
//               title="Youtube"
//               href={social?.youtube_link}
//               target="new"
//               className="youtube"
//             >
//               <FaYoutube className="socialFont" />
//             </a>
//           )}
//           {social?.insta_link?.length > 0 && (
//             <a
//               title="Instagram"
//               href={social?.insta_link}
//               target="new"
//               className="instagram"
//             >
//               <FaInstagram className="socialFont" />
//             </a>
//           )}
//           {social?.whatsapp_link?.length > 0 && (
//             <a
//               title="Appointment"
//               href="/appointment-booking"
//               className="calender bg-icon"
//             >
//               <FaCalendarAlt className="calendarText" />
//             </a>
//           )}
//           {social?.whatsapp_link?.length > 0 && (
//             <a
//               title="Whatsapp"
//               href={social?.whatsapp_link}
//               className="chat bg-icon"
//               target="_blank"
//             >
//               <FaWhatsapp className="calendarText" />
//             </a>
//           )} */}
//         </div>

//         {showPopup1 && <AdmissionEnquiry siteUrl={siteUrl} onClose={togglePopup1} />}

//         {/* navbar end */}
//       </div>

//       <div className="desktophide">
//         {/* navbar start */}
//         <ImportantAnnouncment siteUrl={siteUrl} />
//         <header className="navbar-area">
//           <nav className="mobileshowmenu">
//             <div className="container nav-container">
//               {enableDisable.Admission_Form_Button === true && (
//                 <div className="admission d-md-none">
//                   <button onClick={togglePopup1}>Admission Enquiry</button>
//                 </div>
//               )}
//               <div className="responsive-mobile-menu">
//                 <button
//                   onClick={togglePopup2}
//                   className={
//                     open
//                       ? "menu toggle-btn d-block d-lg-none open"
//                       : "menu toggle-btn d-block d-lg-none "
//                   }
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   Menu
//                 </button>
//                 {showPopup2 && <MobileMenu siteUrl={siteUrl} onClose={togglePopup2} />}
//               </div>
//               <div className="logo">
//                 <Link className="logo-1" href="/">
//                   {apiData && apiData.data && apiData.data.length > 0 && (
//                     <img
//                       src={`${siteUrl}${apiData.data[0].attributes.logo?.data?.attributes?.url}`}
//                       className="mobileLogo"
//                     />)}
//                 </Link>
//                 <div className="dropdown logotext mobileDropDown">
//                   <button className="dropbtnMobile">
//                     {schoolData.length > 0 && schoolData[0].attributes.title}
//                     <FaAngleDown className="arrowleft" />
//                   </button>
//                   <div className="dropdown-content">
//                     {schoolData.map((item) => (
//                       <a
//                         key={item.id}
//                         href={item.attributes.url}
//                         target={item.attributes.target}
//                       >
//                         {item.attributes.title}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </header>
//         {/* navbar end */}
//       </div>
//     </>
//   );
// };

// export default NavBar;


