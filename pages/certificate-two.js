import React, { Fragment, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from 'next/router';

import { determineStrapiUrl } from "@/utils/strapiUtils";
export const getServerSideProps = async (context) => {
    try {
      const siteUrl = determineStrapiUrl(context);
      return {
        props: {
          siteUrl,
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
const CertificateTwo = ({siteUrl}) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        registration: "",
        dateofbirth: "",
    });

    const [errors, setErrors] = useState({
        registration: "",
        dateofbirth: "",
    });

    const { registration, dateofbirth } = formData;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: fieldValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation logic here
        if (!registration || !dateofbirth) {
            setErrors({
                registration: registration ? "" : "Please enter Registration ID.",
                dateofbirth: dateofbirth ? "" : "Please enter Date of Birth.",
            });
            return;
        }

        // Additional validation for Registration ID
        if (!/^[A-Za-z0-9]+$/.test(registration)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                registration:
                    "Invalid Registration ID. It should contain only letters and numbers.",
            }));
            return;
        }
        if (registration.length < 6 || registration.length > 20) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                registration: "Registration ID should be between 6 and 20 characters.",
            }));
            return;
        }

        // Additional validation for Date of Birth
        const currentDate = new Date();
        const enteredDate = new Date(dateofbirth);
        if (enteredDate >= currentDate) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateofbirth: "Date of Birth cannot be in the future.",
            }));
            return;
        }
        const minDate = new Date("1900-01-01"); // You can set an appropriate minimum date
        if (enteredDate < minDate) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateofbirth: "Please enter a valid Date of Birth.",
            }));
            return;
        }

        // Your form submission logic goes here
        // ...

        // Reset form fields and errors
        setFormData({
            registration: "",
            dateofbirth: "",
        });
        setErrors({
            registration: "",
            dateofbirth: "",
        });

        window.location.href = "/thank-you";
    };
    
    return (
        <>
            <Fragment>
                <NavBar siteUrl={siteUrl}/>
                <div className="top-section1">
                    <div className="container">
                        <h1 className="principal-mess">Transfer Certificate</h1>
                    </div>

                    <section className="form-certi-two container margintop_certi_two mb-60">
                        <div className="title-bottom-form">
                            <h5>
                                Please enter your details to download the Transfer Certificate
                            </h5>
                        </div>
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <input
                                            className="input_certi"
                                            type="text"
                                            id="registration"
                                            name="registration"
                                            value={registration}
                                            placeholder="Registration ID*"
                                            onChange={handleChange}
                                        // required
                                        />

                                        {errors.registration && (
                                            <p className="error">{errors.registration}</p>
                                        )}
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            className="input_certi"
                                            type="date"
                                            id="dateofbirth"
                                            name="dateofbirth"
                                            value={dateofbirth}
                                            placeholder="Date Of Birth*"
                                            onChange={handleChange}
                                        // required
                                        />
                                        {errors.dateofbirth && (
                                            <p className="error">{errors.dateofbirth}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <button type="submit" className="submit-certi">
                                        SEARCH
                                    </button>
                                    <p className="para_after-button">* All fields to be filled</p>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
                <Footer siteUrl={siteUrl}/>
            </Fragment>
        </>
    );
};

export default CertificateTwo;
