import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ContactAddress from "../components/address";
import Head from "next/head";
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);

    const data = await res.json();

    return {
      props: {
        seodata: data.data.attributes.Pages,
        siteUrl
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        data: [],
      },
    };
  }
};

const ContactUs = ({ seodata, contactData, siteUrl}) => {
  const [seoData, setSeoData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
    isRobot: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
    isRobot: "",
  });

  const { fullName, email, contactNumber, message, isRobot } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
    // Clear the error message when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here
    const newErrors = {};

    // Validate full name
    if (!fullName) {
      newErrors.fullName = "Full Name is required.";
    } else if (!/^[A-Za-z\s]+$/i.test(fullName)) {
      newErrors.fullName = "Please enter a valid name!";
    }
    // else if (!/^[a-zA-Z]+ [a-zA-Z]+$/i.test(fullName)) {
    //     newErrors.fullName =
    //         "Please enter your full name with at least two words.";
    // }

    // Validate email
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate message
    if (!message) {
      newErrors.message = "Message is required.";
    }

    // const phonePattern = /^\d{18}$/;
    // if (!phonePattern.test(contactNumber)) {
    if (!contactNumber) {
      // newErrors.contactNumber = "Please enter a valid 10-digit phone number.";
      newErrors.contactNumber = "Contact number is required.";
    }

    if (!isRobot) {
      newErrors.isRobot = "Please confirm that you're not a robot.";
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, update the state to display them
      setErrors(newErrors);
      return;
    }

    // Prepare the data to send to the API
    const requestData = {
      data: {
        full_name: fullName,
        email_id: email,
        contact_no: contactNumber,
        message,
      },
    };

    try {
      // Make the API POST request
      const response = await fetch(`${siteUrl}/api/contact-uses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // Handle non-successful response here (e.g., show an error message)
        console.error("API request failed:", response.statusText);
        return;
      } else {
        await fetch(`/api/contactMail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData?.data),
        });
      }

      // Reset form fields on successful submission
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        message: "",
        isRobot: false,
      });

      // ... (you can add additional logic here, like showing a success message)
      window.location.href = "/thank-you";
    } catch (error) {
      console.error("An error occurred while making the API request:", error);
    }
  };

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('API response data:', data); // Log the API response data
    //         if (data && data.data && data.data.length > 0) {
    //             const seoAttributes = data.data[27].attributes;
    //             setSeoData({
    //                 title: seoAttributes.title || '',
    //                 metaTitle: seoAttributes.metaTitle || '',
    //                 metaDescription: seoAttributes.metaDescription || '',
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching SEO data:', error);
    //     });
   
  }, []);

  return (
    <>
          <Seo SeoData={seodata} PageSlug={"contact-us"} />

      <Fragment>
        <NavBar siteUrl={siteUrl}/>
        {/* {seoData && (
          <Seo
            title={seoData.title}
            metaTitle={seoData.metaTitle}
            metaDescription={seoData.metaDescription}
          />
        )} */}

        <div className="top-section29-new">
          <section className="wrap-item-principal-se1 contactReaponsive">
            <div className="container">
              <h1 className="principal-mess lineHight">Contact</h1>
            </div>
          </section>
          <section className="first-sec-contact_us">
            <ContactAddress siteUrl={siteUrl} />
          </section>
          <section className="form-contact-us container mt-5">
            <div className="title-bottom-form">
              <h3 className="leave_msg_mob">Leave Us A Message</h3>
              <p className="para_after_leave">
                Want to get in touch with our team? Drop us a line.
              </p>
            </div>
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      className="input_certi"
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      placeholder="Full Name*"
                      onChange={handleChange}
                    />
                    <br></br>
                    {errors.fullName && (
                      <span className="error">{errors.fullName}</span>
                    )}
                    <input
                      className="input_certi"
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email ID*"
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}

                    <input
                      className="input_certi"
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={contactNumber}
                      placeholder="Contact Number*"
                      onChange={handleChange}
                    />
                    {errors.contactNumber && (
                      <span className="error">{errors.contactNumber}</span>
                    )}
                  </div>
                  <div className="col-sm-6">
                    <textarea
                      className="input_textarea-contact"
                      id="message"
                      name="message"
                      value={message}
                      placeholder="Message*"
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <span className="error">{errors.message}</span>
                    )}
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="labeltitle">
                    <input
                      type="checkbox"
                      name="isRobot"
                      checked={isRobot}
                      onChange={handleChange}
                    />
                    I'm not a robot
                  </label>
                  <br></br>
                  {errors.isRobot && (
                    <span className="error1">{errors.isRobot}</span>
                  )}
                </div>

                <button type="submit" className="submit-contact">
                  Submit
                </button>
                <p className="para_after-button">* All fields to be filled</p>
              </form>
            </div>
          </section>
        </div>
        <Footer siteUrl={siteUrl}/>
      </Fragment>
    </>
  );
};

export default ContactUs;
