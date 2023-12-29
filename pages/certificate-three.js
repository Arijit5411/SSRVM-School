import React, { Fragment, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CertificateThree = () => {
    const [formData, setFormData] = useState({
        registrationId: "",
        dateofbirth: "",
        fullName: "",
        email: "",
        contactNumber: "",
        academicYear: "",
        classes: "",
    });

    const [errors, setErrors] = useState({});

    const {
        datebirth,
        registrationId,
        fullName,
        email,
        contactNumber,
        academicYear,
        classes,
    } = formData;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: fieldValue,
        }));

        // Clear error for the field being edited
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        // Perform form validation
        if (!fullName) {
            errors.fullName = "Full Name is required.";
        }

        if (!contactNumber) {
            errors.contactNumber = "Contact Number is required.";
        } else if (isNaN(contactNumber) || contactNumber.length < 10) {
            errors.contactNumber = "Contact Number must be a valid 10-digit number.";
        }

        if (!datebirth) {
            errors.datebirth = "Date Of Birth is required.";
        } else {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datebirth.match(datePattern)) {
                errors.datebirth = "Date Of Birth must be in YYYY-MM-DD format.";
            }
        }

        if (!registrationId) {
            errors.registrationId = "Registration ID is required.";
        }

        if (!academicYear) {
            errors.academicYear = "Academic Year is required.";
        } else {
            const academicYearPattern = /^\d{4}-\d{4}$/;
            if (!academicYear.match(academicYearPattern)) {
                errors.academicYear =
                    'Academic Year must be in the format "YYYY-YYYY".';
            }
        }

        if (!classes) {
            errors.classes = "Class is required.";
        }

        // Additional validation for email
        if (!email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.match(emailPattern)) {
                errors.email = "Please enter a valid email address.";
            }
        }

        // Check if there are any errors
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Perform form submission logic here
        // ...

        // Reset form fields
        setFormData({
            registrationId: "",
            datebirth: "",
            fullName: "",
            email: "",
            contactNumber: "",
            academicYear: "",
            classes: "",
        });

        // Clear errors on successful form submission
        setErrors({});

        window.location.href = "/thank-you";
    };

    return (
        <>
            <NavBar />

            <div className="top-section1">
                {" "}
                <div className="container">
                    <h1 className="principal-mess">Transfer Certificate</h1>
                </div>
            </div>

            <section className="form-certi container mb-60">
                <div className="title-bottom-form">
                    <h5>Request Transfer Certificate</h5>
                </div>

                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-6">
                                {errors.fullName && <p className="error">{errors.fullName}</p>}
                                <input
                                    className="input_certi"
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={fullName}
                                    placeholder="Full Name*"
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            <div className="col-sm-6">
                                {errors.contactNumber && (
                                    <p className="error">{errors.contactNumber}</p>
                                )}
                                <input
                                    className="input_certi"
                                    type="tel"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={contactNumber}
                                    placeholder="Contact Number*"
                                    onChange={handleChange}
                                // required
                                />
                            </div>

                            <div className="col-sm-6">
                                {errors.datebirth && (
                                    <p className="error">{errors.datebirth}</p>
                                )}
                                <input
                                    className="input_certi"
                                    type="date"
                                    id="datebirth"
                                    name="datebirth"
                                    value={datebirth}
                                    placeholder="Date Of Birth*"
                                    onChange={handleChange}
                                // required
                                />
                            </div>

                            <div className="col-sm-6">
                                {errors.registrationId && (
                                    <p className="error">{errors.registrationId}</p>
                                )}
                                <input
                                    className="input_certi"
                                    type="text"
                                    id="registrationId"
                                    name="registrationId"
                                    value={registrationId}
                                    placeholder="Registration ID*"
                                    onChange={handleChange}
                                // required
                                />
                            </div>

                            <div className="col-sm-6">
                                {errors.email && <p className="error">{errors.email}</p>}
                                <input
                                    className="input_certi"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email ID*"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-sm-6">
                                {errors.academicYear && (
                                    <p className="error">{errors.academicYear}</p>
                                )}
                                <input
                                    className="input_certi"
                                    type="text"
                                    id="academicYear"
                                    name="academicYear"
                                    value={academicYear}
                                    placeholder="Academic Year* (e.g., 2020-2021)"
                                    onChange={handleChange}
                                // required
                                />
                            </div>

                            <div className="col-sm-6">
                                {errors.classes && <p className="error">{errors.classes}</p>}
                                <input
                                    className="input_certi"
                                    type="text"
                                    id="classes"
                                    name="classes"
                                    value={classes}
                                    placeholder="Class*"
                                    onChange={handleChange}
                                // required
                                />
                            </div>

                            <div className="col-sm-6">
                                <button
                                    type="submit"
                                    className="submit-certi wrap-certi-button-two"
                                >
                                    REQUEST
                                </button>
                                <p className="para_after-button">* All fields to be filled</p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <Footer/>
        </>
    );
};

export default CertificateThree;
