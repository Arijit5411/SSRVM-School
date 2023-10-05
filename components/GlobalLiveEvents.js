import React, { useState, useEffect } from "react";
import WatchVideo from "./WatchVideos";

const GlobalLiveEvents = () => {
    const [events, setEvents] = useState([]);

    const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"
        
    useEffect(() => {
        // Fetch the list of live events on component mount
        fetch(`${GlobalSiteUrl}/api/global-live-event-enable-disables?populate=*`)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.data);
            })
            .catch((error) => {
                console.error("Error fetching API data:", error);
            });
    }, []);

    return (
        <div>
            {events.map(
                (event) =>
                    event.attributes.enable_section && (
                        <div key={event.id} className="service_area-4 upper-line">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="service-item">
                                        <div className="row align-items-center">
                                            <h4>Global Events</h4>
                                            <div className="col-sm-8">
                                                <p>{event.attributes.new_live_event}</p>
                                                <h3>{event.attributes.event_title}</h3>
                                                <p>
                                                    {event.attributes.date_time &&
                                                        new Date(
                                                            event.attributes.date_time
                                                        ).toLocaleString()}
                                                </p>
                                                <WatchVideo videoUrl={event.attributes.watch_link} />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4">
                                                <div className="right-wrapper">
                                                    {event.attributes.event_image && (
                                                        <img
                                                            src={`${GlobalSiteUrl}${event.attributes.event_image?.data?.attributes?.url}`}
                                                            alt="event_image"
                                                            className="image-Banner-Round"
                                                            onError={() =>
                                                                console.error(
                                                                    "Error loading image:",
                                                                    event.attributes.event_image.data.url
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            )}
        </div>
    );
};

export default GlobalLiveEvents;
