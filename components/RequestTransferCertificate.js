import React, { useState } from "react";
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

const RequestTransferCertificate = () => {

    const [formValues, setFormValues] = useState({
        fullName: "",
        contactNumber: "",
        dateOfBirth: "",
        registrationId: "",
        email: "",
        academicYear: "",
        classType: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const isProduction = process.env.NODE_ENV === "production";

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateFormValues(formValues);
        setFormErrors(validationErrors);

        // If there are no validation errors, submit the form data
        if (Object.keys(validationErrors).length === 0) {
            const requestData = {
                data: {
                    full_name: formValues.fullName,
                    contact_no: formValues.contactNumber,
                    dob: formValues.dateOfBirth,
                    registration_Id: formValues.registrationId,
                    email_id: formValues.email,
                    class: formValues.classType,
                    academic_year: formValues.academicYear
                }
            };

            try {
                const response = await fetch(`${siteUrl}/api/request-transfer-certificates`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("API response:", responseData);

                    // Clear the form after successful submission
                    setFormValues({
                        fullName: "",
                        contactNumber: "",
                        dateOfBirth: "",
                        registrationId: "",
                        email: "",
                        academicYear: "",
                        classType: "",
                    });

                    window.location.href = "/thank-you";
                } else {
                    console.error("API request failed:", response.statusText);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };


    const validateFormValues = (data) => {
        const errors = {};

        // Validation for Full Name (should not be empty)
        if (!data.fullName.trim()) {
            errors.fullName = "Full Name is required.";
        }

        // Validation for Contact Number (should not be empty, must be numeric, and have a minimum length of 10)
        if (!data.contactNumber.trim()) {
            errors.contactNumber = "Contact Number is required.";
        } else if (
            !/^\d+$/.test(data.contactNumber) ||
            data.contactNumber.length < 10
        ) {
            errors.contactNumber =
                "Contact Number must be a minimum of 10 digits and contain only numbers.";
        }

        // Validation for Date of Birth (should not be empty)
        if (!data.dateOfBirth) {
            errors.dateOfBirth = "Date of Birth is required.";
        }

        // Validation for Registration ID (should not be empty)
        if (!data.registrationId.trim()) {
            errors.registrationId = "Registration ID is required.";
        }

        // Validation for Email (should be a valid email format)
        if (!data.email) {
            errors.email = "Email ID is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Invalid email format.";
        }

        // Validation for Academic Year (should not be empty)
        if (!data.academicYear.trim()) {
            errors.academicYear = "Academic Year is required.";
        }

        // Validation for Class Type (should not be empty)
        if (!data.classType.trim()) {
            errors.classType = "Class Type is required.";
        }

        return errors;
    };

    const academicYearOptions = [
        "2019-2020",
        "2020-2021",
        "2021-2022",
        "2022-2023",
    ];

    const classTypeOptions = [
        "Junior KG",
        "Senior KG",
        "Class I",
        "Class II",
        "Class III",
        "Class IV",
        "Class V",
        "Class VI",
        "Class VII",
        "Class VIII",
        "Class IX",
        "Class X",
        "Class XI",
        "Class XII",
    ];

    return (
        <>
            <section className="form-certi container">
                <div className="title-bottom-form">
                    <h5>Request Transfer Certificate</h5>
                </div>
                <div>
                    <div className="container">
                        <form onSubmit={handleFormSubmit}>
                            <div className="row">
                                <div className="col-sm-6">

                                    <input
                                        className="input_certi"
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formValues.fullName}
                                        placeholder="Full Name*"
                                        onChange={handleFormChange}
                                    // required
                                    />
                                    {formErrors.fullName && (
                                        <span className="error">
                                            {formErrors.fullName}
                                        </span>
                                    )}
                                </div>
                                <div className="col-sm-6">

                                    <input
                                        className="input_certi"
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formValues.contactNumber}
                                        placeholder="Contact Number*"
                                        onChange={handleFormChange}
                                    // required
                                    />
                                    {formErrors.contactNumber && (
                                        <span className="error">
                                            {formErrors.contactNumber}
                                        </span>
                                    )}

                                </div>

                                <div className="col-sm-6">
                                    <DatePicker
                                        className="input_certi"
                                        selected={formValues.dateOfBirth}
                                        onChange={(date) => handleFormChange({ target: { name: "dateOfBirth", value: date } })}
                                        placeholderText="Date Of Birth*"
                                        dateFormat="dd/MM/yyyy" // Date format for display
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    {formErrors.dateOfBirth && (
                                        <span className="error">
                                            {formErrors.dateOfBirth}
                                        </span>
                                    )}
                                </div>

                                <div className="col-sm-6">

                                    <input
                                        className="input_certi"
                                        type="text"
                                        id="registrationId"
                                        name="registrationId"
                                        value={formValues.registrationId}
                                        placeholder="Registration ID*"
                                        onChange={handleFormChange}
                                    // required
                                    />
                                    {formErrors.registrationId && (
                                        <span className="error">
                                            {formErrors.registrationId}
                                        </span>
                                    )}

                                </div>

                                <div className="col-sm-6">

                                    <input
                                        className="input_certi"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formValues.email}
                                        placeholder="Email ID*"
                                        onChange={handleFormChange}
                                    // required
                                    />
                                    {formErrors.email && (
                                        <span className="error">{formErrors.email}</span>
                                    )}
                                </div>

                                <div className="col-sm-6">

                                    <select
                                        className="input_certi"
                                        id="academicYear"
                                        name="academicYear"
                                        value={formValues.academicYear}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Select Academic Year*</option>
                                        {academicYearOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.academicYear && (
                                        <span className="error">{formErrors.academicYear}</span>
                                    )}
                                </div>


                                <div className="col-sm-6">

                                    <select
                                        className="input_certi"
                                        id="classType"
                                        name="classType"
                                        value={formValues.classType}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Select Your Class*</option>
                                        {classTypeOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.classType && (
                                        <span className="error">{formErrors.classType}</span>
                                    )}

                                </div>

                                <div className="col-sm-6">
                                    <button
                                        type="submit"
                                        className="submit-certi wrap-certi-button-two"
                                    >
                                        REQUEST
                                    </button>
                                    <p className="para_after-button">
                                        * All fields to be filled
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RequestTransferCertificate;
