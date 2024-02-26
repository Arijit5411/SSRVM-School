import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";
import DatePicker from "react-datetime";
import moment from "moment";
import DropdownReason from "@/components/DropdownReason";

import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);

  const res1 = await fetch(`${siteUrl}/api/school-total-classes?populate=*`);
  const data = await res.json();
  const data1 = await res1.json();
  return {
    props: {
      seodata: data.data.attributes.Pages,
      classes: data1?.data,
      siteUrl
    },
  }
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        data: [],
      },
    };
  }
};

const initialFormState = {
  showChildDetails: true,
  showAdmissionDetails: false,
  showAdmission: true,
  showCallback: false,
  showTextBox: false,
  childStudying: "yes",
  fullName: "",
  email: "",
  contactNumber: "",
  selectedClass: "",
  admissionForChild: "",
  callbackAdmission: "yes",
  addmissionNumber: "",
  selectedReasion: "",
  anyOtherQuestion: "",
  anyOtherReason: "",
  preferedDate: new Date(),
};

const initialErrorState = {
  fullNameError: "",
  emailError: "",
  contactNumberError: "",
  selectedClassError: "",
  reasonError: "",
  dateError: "",
};

const AppointmentBooking = ({ seodata, classes ,siteUrl}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [selectedOption, setSelectedOption] = useState("");

  const [errorState, setErrorState] = useState(initialErrorState);
 

  const handleChange = (event) => {
    let reasonState = false;
    if (event.target.value === "Any other reason") reasonState = true;

    setFormState({
      ...formState,
      showTextBox: reasonState,
      selectedReasion: event.target.value,
    });
    setSelectedOption(event.target.value);
  };
  const handleChildStudyingChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      childStudying: value,
      showChildDetails: value === "yes",
    });
  };

  const handleAdmissionChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      admissionForChild: value,
      showAdmission: value === "yes",
    });
  };
  const handleChangeCallbackChange = (event) => {
    const value = event.target.value;
    setFormState({
      ...formState,
      callbackAdmission: value,
      showCallback: value === "yes",
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

  

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    const newErrorState = { ...initialErrorState };

    if (!formState.fullName) {
      newErrorState.fullNameError = "Please enter your Full Name";
      isValid = false;
    }

    if (!formState.email) {
      newErrorState.emailError = "Please enter your Email ID";
      isValid = false;
    }

    if (!formState.contactNumber) {
      newErrorState.contactNumberError = "Please enter your Contact Number";
      isValid = false;
    }

    if (!formState.selectedClass) {
      newErrorState.selectedClassError =
        "Please select the class your child is studying in";
      isValid = false;
    }

    if (!formState.preferedDate) {
      newErrorState.dateError = "Please select Appointment Date";
      isValid = false;
    }

    if (
      !formState.admissionForChild === "yes" &&
      !formState.admissionForChild
    ) {
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
            looking_for_admission: formState.admissionForChild,
            would_you_like_call_back: formState.callbackAdmission,
            addmition_number: formState.addmissionNumber,
            select_reasion: formState.selectedReasion,
            any_other_question: formState.anyOtherQuestion,
            any_other_reason: formState.anyOtherReason,
            prefered_date: formState.preferedDate,
          },
        };

        const response = await fetch(`${siteUrl}/api/appointment-bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          console.log("API call successful");
          const mailRes = await fetch(`/api/appointmentMail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData?.data),
          });

          if (mailRes.status === 200) {
            console.log("Mail send sucess!");
          } else {
            console.log(mailRes);
          }
          setFormState(initialFormState);
          setErrorState(initialErrorState);

          window.location.href = "/thank-you";
        } else {
          console.log("API call failed");
        }
      } catch (error) {
        console.error("API call error:", error);
      }
    }
  };
  let inputProps = {
    placeholder: "Select Appointment Date",
  };
  const handleInputChangeDate = (event) => {
    const value = event;
    setFormState({
      ...formState,
      preferedDate: value,
    });
  };
  return (
    <Fragment>
          <Seo SeoData={seodata} PageSlug={"appointment-booking"} />

      <NavBar siteUrl={siteUrl}/>
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
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formState.contactNumber}
                    onChange={handleInputChange}
                  />
                  <div className="error">{errorState.dateError}</div>
                  <DatePicker
                    timeFormat={false}
                    inputProps={inputProps}
                    name="preferedDate"
                    id="preferedDate"
                    isValidDate={disablePastDt}
                    value={formState.preferedDate}
                    onChange={(e) => {
                      handleInputChangeDate(e);
                    }}
                  />
                </div>
                <div className="col-sm-6">
                  <label className="labelSize">
                    Is your child studying in our school?
                  </label>
                  <span style={{ marginLeft: "25px" }}>
                    <label className="labelSize" style={{ marginLeft: "10px" }}>
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
                  </span>

                  {formState.showChildDetails ? (
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
                          {classes &&
                            classes.length > 0 &&
                            classes.map((c) => {
                              return (
                                <option value={c?.attributes?.name}>
                                  {c?.attributes?.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <textarea
                        className="input_contact_reason"
                        type="text"
                        id="addmissionNumber"
                        name="addmissionNumber"
                        placeholder="Enter Admission Number*"
                        value={formState.addmissionNumber}
                        onChange={handleInputChange}
                      />

                      <DropdownReason {...{ selectedOption, handleChange }} />

                      {formState.showTextBox && (
                        <textarea
                          className="input_contact_reason"
                          type="text"
                          id="anyOtherReason"
                          name="anyOtherReason"
                          placeholder="Any Other Reason*"
                          value={formState.anyOtherReason}
                          onChange={handleInputChange}
                        />
                      )}
                    </div>
                  ) : (
                    formState.childStudying === "no" && (
                      <>
                        <div>
                          <label className="mt-3">
                            Are you looking for admission for your child?
                          </label>
                          <span style={{ marginLeft: "20px" }}>
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
                          </span>
                        </div>

                        {formState.admissionForChild === "yes" ? (
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
                                {classes &&
                                  classes.length > 0 &&
                                  classes.map((c) => {
                                    return (
                                      <option value={c?.attributes?.name}>
                                        {c?.attributes?.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>

                            <div>
                              <label className="me-1">
                                Would you like us to call you back?
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="callbackAdmission"
                                  value="yes"
                                  checked={
                                    formState.callbackAdmission === "yes"
                                  }
                                  onChange={handleChangeCallbackChange}
                                />
                                Yes
                              </label>
                              <label>
                                <input
                                  className="ms-1"
                                  type="radio"
                                  name="callbackAdmission"
                                  value="no"
                                  checked={formState.callbackAdmission === "no"}
                                  onChange={handleChangeCallbackChange}
                                />
                                No
                              </label>
                            </div>

                            {formState.callbackAdmission === "yes" ? (
                              <textarea
                                className="input_contact_reason"
                                type="text"
                                id="anyOtherQuestion"
                                name="anyOtherQuestion"
                                placeholder="Any Other Question*"
                                value={formState.anyOtherQuestion}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <>
                                <div>
                                  <DropdownReason
                                    {...{ selectedOption, handleChange }}
                                  />
                                  {formState.showTextBox && (
                                    <textarea
                                      className="input_contact_reason"
                                      type="text"
                                      id="anyOtherReason"
                                      name="anyOtherReason"
                                      placeholder="Any Other Reason*"
                                      value={formState.anyOtherReason}
                                      onChange={handleInputChange}
                                    />
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div>
                            <DropdownReason
                              {...{ selectedOption, handleChange }}
                            />

                            {formState.showTextBox && (
                              <textarea
                                className="input_contact_reason"
                                type="text"
                                id="anyOtherReason"
                                name="anyOtherReason"
                                placeholder="Any Other Reason*"
                                value={formState.anyOtherReason}
                                onChange={handleInputChange}
                              />
                            )}
                          </div>
                        )}
                      </>
                    )
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
      <Footer siteUrl={siteUrl}/>
    </Fragment>
  );
};

export default AppointmentBooking;
