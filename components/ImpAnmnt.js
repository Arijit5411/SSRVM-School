import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import AnnouncementPopup from "./AnnouncementPopup";
import LiveEvents from "./liveEvents";
import GlobalLiveEvents from "./GlobalLiveEvents";

const ImpAnmnt = ({siteUrl}) => {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch both the list of live events and important announcements on component mount
    Promise.all([
      fetch(`${siteUrl}/api/announcement-enable-disables?populate=*`),
      fetch(`${siteUrl}/api/imptannouncements?populate=*`),
    ])
      .then(([eventsResponse, announcementsResponse]) => {
        return Promise.all([
          eventsResponse.json(),
          announcementsResponse.json(),
        ]);
      })
      .then(([eventsData, announcementsData]) => {
        setEvents(eventsData.data);
        setAnnouncements(announcementsData.data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaArrowLeft className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaArrowRight className={className} onClick={onClick} />;
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div>
      {events.map(
        (event) =>
          event.attributes.enable_disable && (
            <div key={event.id} className="service_area-3">
              {console.log('events', event)}
              <div className="container">
                <div className="service-item">
                  <div className="row align-items-center">
                    <div className="col-lg-3">
                      <div className="service-single-item service-ansmnt">
                        <h3>
                          <span>{event.attributes.title}</span>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-9 align-self-center">
                      <div className="section-title">
                        <div className="feature-slider owl-carousel">
                          <Slider {...settings}>
                            {announcements.map((announcement) => (
                              <div className="item" key={announcement.id}>
                                <div className="service-single-item">
                                  <p className="new impnew">
                                    {announcement.attributes.new}
                                  </p>
                                  <p>{announcement.attributes.heading}</p>
                                  <AnnouncementPopup
                                    announcement={announcement}
                                    siteUrl={siteUrl}
                                  />
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
      <LiveEvents siteUrl={siteUrl}/>
      <GlobalLiveEvents siteUrl={siteUrl} />
    </div>
  );
};

export default ImpAnmnt;
