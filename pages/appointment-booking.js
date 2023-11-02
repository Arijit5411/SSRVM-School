import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
// import Seo from './Seo';

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
    const res = await fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)

    const data = await res.json()

    return {
        props: {
            seodata: data
        }
    }
}


const initialFormState = {
    childStudying: "",
    showChildDetails: false,
    showAdmissionDetails: false,
    fullName: "",
    email: "",
    contactNumber: "",
    selectedClass: "",
    admissionForChild: "",
};

const initialErrorState = {
    fullNameError: "",
    emailError: "",
    contactNumberError: "",
    selectedClassError: "",
    reasonError: "",
};

const AppointmentBooking = ({ seodata }) => {
    const [formState, setFormState] = useState(initialFormState);
    const [errorState, setErrorState] = useState(initialErrorState);
    const [seoData, setSeoData] = useState({
        title: '',
        metaTitle: '',
        metaDescription: '',
    });

    const handleChildStudyingChange = (event) => {
        const value = event.target.value;
        setFormState({
            ...formState,
            childStudying: value,
            showChildDetails: value === "yes",
            showAdmissionDetails: false,
        });
    };

    const handleAdmissionChange = (event) => {
        setFormState({
            ...formState,
            admissionForChild: event.target.value,
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        setErrorState({
            ...errorState,
            [`${name}Error`]: "",
        });
    };

    useEffect(() => {
        // Fetch SEO data from your API
        // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log('API response data:', data);
        //         if (data && data.data && data.data.length > 0) {
        //             const seoAttributes = data.data[47].attributes;
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
        if (seodata && seodata?.data && seodata?.data?.length > 0) {
            const seoAttributes = seodata.data[47].attributes;
            setSeoData({
                title: seoAttributes.title || '',
                metaTitle: seoAttributes.metaTitle || '',
                metaDescription: seoAttributes.metaDescription || '',
            })
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let isValid = true;
        const newErrorState = { ...initialErrorState };

        if (!formState.fullName) {
            newErrorState.fullNameError = "Please enter your full name.";
            isValid = false;
        }

        if (!formState.email) {
            newErrorState.emailError = "Please enter your email.";
            isValid = false;
        }

        if (!formState.contactNumber) {
            newErrorState.contactNumberError = "Please enter your contact number.";
            isValid = false;
        }

        if (formState.childStudying === "yes" && !formState.selectedClass) {
            newErrorState.selectedClassError =
                "Please select the class your child is studying in.";
            isValid = false;
        }

        if (formState.showChildDetails && !formState.reason) {
            newErrorState.reasonError = "Please provide a reason.";
            isValid = false;
        }

        if (!formState.showChildDetails && !formState.admissionForChild) {
            isValid = false;
        }

        if (!isValid) {
            setErrorState(newErrorState);
        } else {
            try {
                const requestData = {
                    data: {
                        full_name: formState.fullName,
                        email_id: formState.email,
                        contact_no: formState.contactNumber,
                        studying_in_our_school: formState.childStudying,
                        yes_studying_class: formState.selectedClass,
                        appointment_reason: formState.reason,
                        looking_for_admission: formState.admissionForChild,
                    },
                };

                const response = await fetch(
                    `${siteUrl}/api/appointment-bookings`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestData),
                    }
                );

                const mailRes = await fetch(
                    `/api/appointmentMail`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestData?.data)
                })

                if (mailRes.status === 200) {
                    console.log('Mail send sucess!');
                } else {
                    console.log(mailRes);
                }

                if (response.ok) {
                    // The API call was successful, you can perform further actions here
                    console.log("API call successful");
                    // Clear form fields after successful submission
                    setFormState(initialFormState);
                    setErrorState(initialErrorState);

                    window.location.href = "/thank-you";
                } else {
                    // Handle API call error
                    console.log("API call failed");
                }
            } catch (error) {
                console.error("API call error:", error);
            }
        }
    };

    return (
        <Fragment>
            <Head>
                <title>{seoData.title}</title>
                {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
                {seoData.metaTitle && <meta name="description" content={seoData.metaDescription} />}
            </Head>
            <NavBar />

            {/* {seoData && (
                <Seo
                    title={seoData.title}
                    metaTitle={seoData.metaTitle}
                    metaDescription={seoData.metaDescription}
                />
            )} */}

            <div className="top-section1">
                <div className="container">
                    <h1 className="principal-mess">Appointment Booking</h1>
                </div>
                <section className="form-contact-us container appoinmentStyle">
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="error">{errorState.fullNameError}</div>
                                    <input
                                        className="input_certi"
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formState.fullName}
                                        onChange={handleInputChange}
                                    />

                                    <div className="error">{errorState.emailError}</div>
                                    <input
                                        className="input_certi"
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email ID"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                    />

                                    <div className="error">{errorState.contactNumberError}</div>
                                    <input
                                        className="input_certi"
                                        type="tel"
                                        maxLength={10}
                                        id="contactNumber"
                                        name="contactNumber"
                                        placeholder="Contact Number"
                                        value={formState.contactNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label className="labelSize">
                                        Is your child studying in our school?
                                    </label>
                                    <br />
                                    <label className="labelSize">
                                        <input
                                            type="radio"
                                            value="yes"
                                            checked={formState.childStudying === "yes"}
                                            onChange={handleChildStudyingChange}
                                        />
                                        Yes
                                    </label>
                                    <label className="labelSize marginLrtLabel">
                                        <input
                                            type="radio"
                                            value="no"
                                            checked={formState.childStudying === "no"}
                                            onChange={handleChildStudyingChange}
                                        />
                                        No
                                    </label>

                                    {formState.showChildDetails && (
                                        <div>
                                            <div className="error">
                                                {errorState.selectedClassError}
                                            </div>
                                            <div className="input_contact_popup">
                                                <select
                                                    id="classDropdown"
                                                    name="selectedClass"
                                                    value={formState.selectedClass}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Select Class*</option>
                                                    <option value="Junior KG">Junior KG</option>
                                                    <option value="Senior KG">Senior KG</option>
                                                    <option value="class I">Class I</option>
                                                    <option value="class II">Class II</option>
                                                    <option value="class III">Class III</option>
                                                    <option value="class IV">Class IV</option>
                                                    <option value="class V">Class V</option>
                                                    <option value="class VI">Class VI</option>
                                                    <option value="class VII">Class VII</option>
                                                    <option value="class VIII">Class VIII</option>
                                                    <option value="class IX">Class IX</option>
                                                    <option value="class X">Class X</option>
                                                    <option value="class XI">Class XI</option>
                                                    <option value="class XII">Class XII</option>
                                                </select>
                                            </div>
                                            <div className="error">{errorState.reasonError}</div>
                                            <input
                                                className="input_contact_reason"
                                                type="text"
                                                id="reason"
                                                name="reason"
                                                placeholder="Reason*"
                                                value={formState.reason}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    )}

                                    {!formState.showChildDetails && (
                                        <div>
                                            <label className="me-1">
                                                Are you looking for admission for your child?
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="admissionForChild"
                                                    value="yes"
                                                    checked={formState.admissionForChild === "yes"}
                                                    onChange={handleAdmissionChange}
                                                />
                                                Yes
                                            </label>
                                            <label>
                                                <input
                                                    className="ms-1"
                                                    type="radio"
                                                    name="admissionForChild"
                                                    value="no"
                                                    checked={formState.admissionForChild === "no"}
                                                    onChange={handleAdmissionChange}
                                                />
                                                No
                                            </label>
                                        </div>
                                    )}

                                    {formState.showAdmissionDetails && (
                                        <div>{/* ... (Admission details) */}</div>
                                    )}

                                    <button type="submit" className="submit-contact">
                                        Submit
                                    </button>
                                    <p className="para_after-button">* All fields are required</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
            <Footer />
        </Fragment>
    );
};

export default AppointmentBooking;
