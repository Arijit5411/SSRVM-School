import React, { useState, useEffect, useRef } from "react";
import MenuPopup from "./menuPopup";
import AdmissionEnquiry from "./AdmissionEnquiry";
// import Link from "next/link";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaAngleDown,
  FaCalendarAlt,
  FaSnapchat,
} from "react-icons/fa";
import MobileMenu from "./mobileMenu";

const NavBar = () => {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state variable for popup
  const [showPopup1, setShowPopup1] = useState(false); // New state variable for popup
  const [showPopup2, setShowPopup2] = useState(false); // New state variable for popup
  const [data, setData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [schoolData, setschoolData] = useState([]);


  // Function to toggle the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const togglePopup1 = () => {
    setShowPopup1(!showPopup1);
  };
  const togglePopup2 = () => {
    setShowPopup2(!showPopup2);
  };
  // Control sidebar navigation
  let items = typeof document !== 'undefined' && document.querySelectorAll(".menu-item-has-children > a");
  // let items = useRef()
  for (let i in items) {
    if (items.hasOwnProperty(i)) {
      items[i].onclick = function () {
        this.parentElement
          .querySelector(".sub-menu")
          .classList.toggle("active");
        this.classList.toggle("open");
      };
    }
  }

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    // Fetch data from the API
    fetch(`${siteUrl}/api/whatsapp-chats`)
      .then((response) => response.json())
      .then((responseData) => {
        if (
          responseData &&
          responseData.data &&
          responseData.data[0] &&
          responseData.data[0].attributes
        ) {
          setData(responseData.data[0].attributes);
        } else {
          console.error("API response is missing expected data structure.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch menu data from the API endpoint
    fetch(`${siteUrl}/api/menus?nested&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          // Assuming the API response contains menu data in the "data" field
          setMenuData(data.data[0].attributes.items.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch the API data
    fetch(`${siteUrl}/api/menus/10?nested&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        // Extract menu items from the API response
        const items = data.data.attributes.items.data;
        setschoolData(items);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className="mobilehide">
        <header className="navbar-are">
          <nav
            className={
              "navbar navbar-area-1  navbar-area-3 navbar-area navbar-expand-lg"
            }
          >
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
                <Link href="/">
                  <img
                    src={publicUrl + "assets/img/ssrvm-logo.svg"}
                    alt="Transpro"
                  />
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
                    {schoolData.length > 0 && schoolData[0].attributes.title}
                    <FaAngleDown className="arrowleft" />
                  </button>
                  <div className="dropdown-content">
                    {schoolData.map((item) => (
                      <a key={item.id} href={item.attributes.url} target={item.attributes.target}>
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
                        className={menuItem.attributes.children && menuItem.attributes.children.data.length > 0 ? 'menu-item-has-children' : ''}
                      >
                        <a ref={items} href={menuItem.attributes.url} target={menuItem.attributes.target}>
                          {menuItem.attributes.title}
                        </a>
                        {menuItem.attributes.children && menuItem.attributes.children.data.length > 0 && (
                          <ul className="sub-menu">
                            {menuItem.attributes.children.data.map((childItem, childIndex) => (
                              <li key={childIndex}>
                                <a href={childItem.attributes.url} target={childItem.attributes.target}>
                                  {childItem.attributes.title}
                                </a>
                              </li>
                            ))}
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
              </div>
            </div>
            {/* Conditionally render the popup */}
            {showPopup && <MenuPopup onClose={togglePopup} />}
          </nav>
        </header>
        <div className="sticky-icon">
          <a
            href="https://www.facebook.com/ssrvm.official" target="new"
            className="facebook"
          >
            {" "}
            <FaFacebookF className="socialFont" />
          </a>

          <a href="https://twitter.com/ssrvm" className="twitter" target="new">
            <FaTwitter className="socialFont" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCz1tS-oRzKeElBOd6pIjgLQ" target="new"
            className="youtube"
          >
            <FaYoutube className="socialFont" />
          </a>

          <a
            href="https://www.instagram.com/ssrvm.official/" target="new"
            className="instagram"
          >
            <FaInstagram className="socialFont" />
          </a>
          <a href="/appointment-booking" className="calender">
            <FaCalendarAlt className="calendarText" />
          </a>
          {data && (
            <div id="api-response">
              <a href={data.whatsapp_number} className="chat" target="_blank">
                <FaSnapchat className="calendarText" />
              </a>
            </div>
          )}
        </div>
        <div className="admission">
          <button onClick={togglePopup1}>Admission Enquiry</button>
        </div>
        {showPopup1 && <AdmissionEnquiry onClose={togglePopup1} />}

        {/* navbar end */}
      </div>

      <div className="desktophide">
        {/* navbar start */}
        <header className="navbar-area">
          <nav className="mobileshowmenu">
            <div className="container nav-container">
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

                <div className="admission">
                  <button onClick={togglePopup1}>Admission Enquiry</button>
                </div>
                {showPopup2 && <MobileMenu onClose={togglePopup2} />}
              </div>
              <div className="logo">
                <Link className="logo-1" href="/">
                  <img
                    src={publicUrl + "assets/img/ssrvm-logo.svg"}
                    className="mobileLogo"
                  />
                </Link>
                <div className="dropdown logotext mobileDropDown">
                  <button className="dropbtnMobile">
                    {schoolData.length > 0 && schoolData[0].attributes.title}
                    <FaAngleDown className="arrowleft" />
                  </button>
                  <div className="dropdown-content">
                    {schoolData.map((item) => (
                      <a key={item.id} href={item.attributes.url} target={item.attributes.target}>
                        {item.attributes.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {/* navbar end */}
      </div>
    </>
  );
};

export default NavBar;
