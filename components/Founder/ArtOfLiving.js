import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const ArtOfLiving = () => {
  const [art, setArt] = useState({});
  const GlobalSiteUrl = process.env.GSURL;

  useEffect(() => {
    fetch(`${GlobalSiteUrl}/api/art-of-living?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setArt(data.data[0]?.attributes || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const logoUrl = `${GlobalSiteUrl}${art.logo?.data?.attributes?.url}`;
  const videoUrl = art.video_url || "https://www.youtube.com/embed/default";
  const visit_website_button = art.visit_website_button || "#";
  const paragraph = art.paragraph || "";
  const short_description = art.short_description || "";
  const bottom_heading_gurudev = art.bottom_heading_gurudev || "About";

  return (
    <>
      <section>
        <div>
          <div className="upper_section_alfSection">
            <div>
              <Image
                width={245}
                height={103}
                src={logoUrl}
                alt="Art of Living Foundation Logo"
                className="art_of_living_foundation_logo"
              />
            </div>
            <div className="para_with_image_art_of_living">
              <p>
                {paragraph && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\n/g, "<br />"),
                    }}
                  ></span>
                )}
              </p>
              <a href={visit_website_button} className="founderbtn">
                Visit website
              </a>
            </div>
            <div className="button_visit_website_ALF">
              <button className="visit_website_alf_below">
                Visit website
              </button>
            </div>
          </div>
          <div>
            <Image
              width={1450}
              height={723}
              src="/assets/img/4c-AOL/2-hero-desktop.jpg"
              alt="Hero Image"
              className="deskTopImg"
            />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="wrap-arts">
          <div>
            <div>
              <iframe
                width="560"
                height="315"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text_onside_video">
              <h2>{bottom_heading_gurudev}</h2>
              <p>
                {short_description && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: short_description.replace(/\n/g, "<br />"),
                    }}
                  ></span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtOfLiving;