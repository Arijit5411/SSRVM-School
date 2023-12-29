import React, { useState, useEffect } from "react";
import Link from "next/link";

const HomeAdmissionProcess = ({siteUrl}) => {
  const [admission, setAdmission] = useState([]);
  useEffect(() => {
    fetch(`${siteUrl}/api/home-admission-enables?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setAdmission(data.data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  return (
    <div>
      {admission.map(
        (event) =>
          event.attributes.enable_disable && (
            <div key={event.id} className="marginTop addmissionProcessBack">
              <div className="container">
                <h2 className="title pd-bottom-20">
                  {event.attributes.heading}
                </h2>
                <div className="row addmissionProcess">
                  <div className="col-sm-6">
                    <div className="paddingbox">
                      <div className="service-single-item">
                        <h3>{event.attributes.admission_format}</h3>
                        <p>{event.attributes.admission_format_description}</p>
                        <button type="button" className="btn-home">
                          <a href={event.attributes.admission_format_link}>Know more</a>
                        </button>
                      </div>
                      <div className="service-single-item pd-top-45">
                        <h3>{event.attributes.application_format}</h3>
                        <p>{event.attributes.application_format_description}</p>
                        <button type="button" className="btn-home">
                          <a href={event.attributes.application_format_link}>Know more</a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="imgRight">
                      <img
                        src={`${siteUrl}${event.attributes.image.data.attributes.url}`}
                        alt="school"
                        className="image-Banner-Round"
                      />
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

export default HomeAdmissionProcess;
