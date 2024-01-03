import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaEnvelopeOpen, FaPhoneAlt } from "react-icons/fa";

const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in";

const MobileMenu = ({ siteUrl, onClose }) => {
  const [menuData, setMenuData] = useState([]);
  const [social, setSocial] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [schoolData, setschoolData] = useState([]);
  const [globalsocial, setGlobalSocial] = useState();
  useEffect(() => {
    fetch(`${siteUrl}/api/navbar-menu-headers?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        const items = data?.data[0]?.attributes;
        setSocial(items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    fetch(`${siteUrl}/api/navbar-menu-headers?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, []);
  useEffect(() => {
    fetch(`${siteUrl}/api/menus/10?nested&populate=*`)
      .then((response) => response.json())
      .then((data) => {
        const items = data.data.attributes.items.data;
        setschoolData(items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch(`${siteUrl}/api/menus/9?nested&populate=*`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMenuData(data.data.attributes.items.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetch(`${GlobalSiteUrl}/api/global-trust-data?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setGlobalSocial(data.data.attributes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(menuData);
  return (
    <div className="popup-menu">
      <div className="popup-card-menu">
        <div>
          <div className="d-flex align-items-center justify-content-end">
            <button className="close-btn-menu" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="menu-col-list mobile-menu-list">
            {menuData &&
              menuData.map((itemData) => {
                return (
                  <>
                    {itemData?.attributes?.children?.data.length > 0 && (
                      <>
                        <div className="menu-col-item">
                          <h6>{itemData?.attributes?.title} </h6>
                          <ul>
                            {itemData?.attributes?.children?.data.map(
                              (item) => {
                                return (
                                  <li>
                                    <Link href={item.attributes.url}>
                                      {item.attributes.title}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
          </div>
          <div className="row menuFooter">
            <div className="">
              <div className="p-2">
                {apiData && apiData.data && apiData.data.length > 0 && (
                  <div className="d-flex gap-3 ">
                    <div className="">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <a href={apiData.data[0].attributes.number_link}>
                        {apiData.data[0].attributes.number}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2">
                {apiData && apiData.data && apiData.data.length > 0 && (
                  <div className="d-flex gap-3">
                    <div>
                      <FaEnvelopeOpen />
                    </div>
                    <div>
                      <a href={apiData.data[0].attributes.email_link}>
                        {apiData.data[0].attributes.email_link}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
