import React, { useState } from "react";

const DownloadTransferCertificate = () => {
  const [formData, setFormData] = useState({
    registration: "",
    dateofbirth: "",
  });

  const [errors, setErrors] = useState({});
  const [downloadedData, setDownloadedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          `${siteUrl}/api/download-transfer-certificates?populate=*&registration=${formData.registration}&dateofbirth=${formData.dateofbirth}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        const matchingCertificate = responseData.data.find(
          (certificate) =>
            certificate.attributes.registration_Id === formData.registration &&
            certificate.attributes.dob === formData.dateofbirth
        );

        if (matchingCertificate) {
          setDownloadedData(matchingCertificate.attributes);
        } else {
          setDownloadedData(null);
          setErrors({
            registration: "No matching transfer certificate found.",
            dateofbirth:
              "Please enter valid Registration ID and Date of Birth.",
          });
        }
      } catch (error) {
        console.error("Error fetching transfer certificate:", error);
      }
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.registration.trim()) {
      errors.registration = "Registration ID is required.";
    }

    if (!data.dateofbirth) {
      errors.dateofbirth = "Date of Birth is required.";
    }

    return errors;
  };

  return (
    <>
      <section className="form-certi container margintop_certi">
        <div className="title-bottom-form">
          <h5>
            Please enter your details to download the Transfer Certificate
          </h5>
        </div>
        <div>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                  <input
                    className="input_certi"
                    type="text"
                    id="registration"
                    name="registration"
                    value={formData.registration}
                    placeholder="Registration ID"
                    onChange={handleChange}
                    // required
                  />{" "}
                  {errors.registration && (
                    <span className="error">{errors.registration}</span>
                  )}
                </div>
                <div className="col-sm-6">
                  <input
                    className="input_certi"
                    type="date"
                    id="dateofbirth"
                    name="dateofbirth"
                    value={formData.dateofbirth}
                    placeholder="Date Of Birth*"
                    onChange={handleChange}
                    // required
                  />{" "}
                  {errors.dateofbirth && (
                    <span className="error">{errors.dateofbirth}</span>
                  )}
                </div>

                <div className="col-sm-6">
                  <button type="submit" className="submit-certi">
                    SEARCH
                  </button>
                  <p className="para_after-button">* All fields to be filled</p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {downloadedData && (
          <div className="downloaded-data">
            <h5>Download Transfer Certificate:</h5>
            <p>Registration ID: {downloadedData.registration_Id}</p>
            <p>Date of Birth: {downloadedData.dob}</p>
            <p>
              Download Link:{" "}
              <a
                href={`${siteUrl}${downloadedData.upload_transfer_certificate.data.attributes.url}`}
                target="_blank"
                download
              >
                <button className="downloadButton">Download Certificate</button>
              </a>
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default DownloadTransferCertificate;
