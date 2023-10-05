import React, { useState, useEffect } from "react";

const AdmissionEnquiry = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    hearAboutUs: "",
    message: "",
    isRobot: false,
    Class: "",
  });

  const [errors, setErrors] = useState({});
  const [classOptions, setClassOptions] = useState([]);

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  useEffect(() => {
    // Fetch data from the API
    fetch(`${siteUrl}/api/admission-enq-class-dropdowns`)
      .then((response) => response.json())
      .then((data) => {
        // Extract the class options from the API response
        const classOptions = data.data[0].attributes.school_name.options;
        setClassOptions(classOptions);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear the error message for the input field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleContactNumberKeyPress = (e) => {
    // Allow only numeric characters (0-9) and the Backspace key
    const allowedKeys = /[0-9]|Backspace/;
    if (!allowedKeys.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email ID is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!formData.contactNumber.trim()) {
      validationErrors.contactNumber = "Contact Number is required";
    } else if (formData.contactNumber.trim().length < 10) {
      validationErrors.contactNumber =
        "Contact Number should be at least 10 digits";
    }

    if (!formData.hearAboutUs.trim()) {
      validationErrors.hearAboutUs = "How did you hear about us? is required";
    }

    // Class Validation
    if (!formData.Class.trim()) {
      validationErrors.Class = "Please select your class";
    }

    if (!formData.message.trim()) {
      validationErrors.message = "Message is required";
    }

    if (!formData.isRobot) {
      validationErrors.isRobot = "Please confirm that you are not a robot";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can now submit the data or perform further actions
      console.log("Form submitted successfully!");

      const url = `${siteUrl}/api/home-admission-enqs`;
      const requestData = {
        data: {
          full_name: formData.fullName,
          email_id: formData.email,
          contact_no: formData.contactNumber,
          about_us: formData.hearAboutUs,
          message: formData.message,
          class: formData.Class,
        },
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);
          // Handle the API response if needed

          // Clear form data after successful submission
          setFormData({
            fullName: "",
            email: "",
            contactNumber: "",
            hearAboutUs: "",
            message: "",
            isRobot: false,
            Class: "",
          });

          window.location.href = "/thank-you";
        } else {
          console.error("API Request failed with status:", response.status);
          // Handle API error cases
        }
      } catch (error) {
        console.error("API Error:", error);
        // Handle network or other API errors
      }
    }
  };

  return (
    <div className="popup-menu">
      <div className="addmissionPopup">
        <div className="popup-content-menu">
          <div className="container">
            <div className="row">
              <div className="displayFlex">
                <p className="admissionfont">Admission Enquiry</p>
                <button className="close-btn-menu-popup" onClick={onClose}>
                  &times;
                </button>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="bottom-sec-contact_popup">
                    <div>
                      <div>
                        <input
                          className="input_contact_popup"
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Full Name*"
                        />
                        {errors.fullName && (
                          <p className="form-error">{errors.fullName}</p>
                        )}
                      </div>
                      <div>
                        <input
                          className="input_contact_popup"
                          type="text"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email ID*"
                        />
                        {errors.email && (
                          <p className="form-error">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <input
                          className="input_contact_popup"
                          type="text"
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          onKeyPress={handleContactNumberKeyPress}
                          placeholder="Contact Number*"
                        />
                        {errors.contactNumber && (
                          <p className="form-error">{errors.contactNumber}</p>
                        )}
                      </div>
                      <div>
                        <input
                          className="input_contact_popup"
                          type="text"
                          id="hearAboutUs"
                          name="hearAboutUs"
                          value={formData.hearAboutUs}
                          onChange={handleInputChange}
                          placeholder="How did you hear about us?"
                        />
                        {errors.hearAboutUs && (
                          <p className="form-error">{errors.hearAboutUs}</p>
                        )}
                      </div>
                      <p className="">* All fields to be filled</p>
                    </div>
                    <div>
                      <div className="input_contact_popup">
                        <select
                          id="classDropdown"
                          name="Class"
                          value={formData.Class}
                          onChange={handleInputChange}
                        >
                          {classOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.Class && (
                        <p className="form-error">{errors.Class}</p>
                      )}

                      <div>
                        <textarea
                          className="input_textarea-contact_popup"
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Message*"
                        />
                        {errors.message && (
                          <p className="form-error">{errors.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="labelHomeColor">
                          <input
                            type="checkbox"
                            name="isRobot"
                            checked={formData.isRobot}
                            onChange={handleInputChange}
                          />
                          I'm not a robot
                        </label>
                        {errors.isRobot && (
                          <p className="form-error">{errors.isRobot}</p>
                        )}
                        <button type="submit" className="submit-contact_popup">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiry;
