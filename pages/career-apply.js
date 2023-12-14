import React, { Fragment, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import Seo from './Seo';
import Head from "next/head";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
  ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
  : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

export const getStaticProps = async () => {
  const res = await fetch(
    `${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`
  );

  const data = await res.json();

  return {
    props: {
      seodata: data,
    },
  };
};

const CareerApply = ({ seodata }) => {
  const [seoData, setSeoData] = useState({
    title: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [formData, setFormData] = useState({
    position: "",
    category: "",
    preferredLocation: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    permanentAddress: "",
    maritalStatus: "",
    mobileNumber: "",
    telephoneNumber: "",
    email: "",
    qualification: "",
    skills: "",
    employment: "",
    experience: "",
    hiringType: "",
    readyToRelocate: "",
    preferredLocation: "",
    reasonToJoin: "",
    resume: "",
    photograph: "",
    salaryExpectations: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [salaryExpectationsApi, setSalaryExpectation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${siteUrl}/api/career?populate=*`);
        const data = await response.json();
        console.log("data in carrierappy", data);
        setSalaryExpectation(data.data.attributes.Salary_Expectations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const {
    position,
    category,
    preferredLocation,
    telephoneNumber,
    fullName,
    gender,
    dateOfBirth,
    address,
    permanentAddress,
    maritalStatus,
    mobileNumber,
    email,
    qualification,
    skills,
    employment,
    experience,
    hiringType,
    readyToRelocate,
    reasonToJoin,
    resume,
    photograph,
    salaryExpectations,
  } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Clear error for the field being modified
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    if (type === "checkbox") {
      let updatedPreferredLocation;
      if (checked) {
        updatedPreferredLocation = [...formData.preferredLocation, value];
      } else {
        updatedPreferredLocation = formData.preferredLocation.filter(
          (location) => location !== value
        );
      }
      setFormData((prevData) => ({
        ...prevData,
        dateOfBirth: value,
      }));
    } else if (name.includes("dateOfBirth")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        dateOfBirth: value,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    if (!["submit", "file"].includes(type)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (type === "file") {
      // Handle file input
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the file object
      }));
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Validate mobile number format
  const isValidMobileNumber = (mobileNumber) => {
    const mobileNumberPattern = /^[0-9]{10}$/;
    return mobileNumberPattern.test(mobileNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation and errors handling
    const errors = {};

    if (!position) {
      errors.position = "Position is required.";
    }

    if (!category) {
      errors.category = "Category is required.";
    }

    if (!fullName) {
      errors.fullName = "Full Name is required.";
    }

    if (!gender) {
      errors.gender = "Gender is required.";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Select date of birth.";
    }

    if (!address) {
      errors.address = "Address is required.";
    }

    if (!permanentAddress) {
      errors.permanentAddress = "Permanent Address is required.";
    }

    if (!maritalStatus) {
      errors.maritalStatus = "Marital Status is required.";
    }

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile Number is required.";
    } else if (!isValidMobileNumber(mobileNumber)) {
      errors.mobileNumber = "Invalid mobile number format.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format.";
    }

    if (!qualification) {
      errors.qualification = "Qualification is required.";
    }

    

    

    if (!experience) {
      errors.experience = "Experience details are required.";
    }

    if (!hiringType) {
      errors.hiringType = "Hiring Type is required.";
    }

    if (!readyToRelocate) {
      errors.readyToRelocate = "Ready to relocate field is required.";
    }

    if (preferredLocation.length === 0) {
      errors.preferredLocation = "At least one preferred location is required.";
    }

    if (!reasonToJoin) {
      errors.reasonToJoin = "Reason to join is required.";
    }

    if (!resume) {
      errors.resume = "Resume is required.";
    } else if (resume.size > MAX_FILE_SIZE) {
      errors.resume = "Resume file size exceeds the limit.";
    }

    if (photograph && photograph.size > MAX_FILE_SIZE) {
      errors.photograph = "Photograph file size exceeds the limit.";
    }

    if (!salaryExpectations) {
      errors.salaryExpectations = "Salary expectations are required.";
    }

    // Set the form errors if any
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return true;
    }

    // Construct the formData object

    const data = {
      position_applied: position,
      preferred_location: preferredLocation,
      category: category,
      full_name: fullName,
      gender: gender,
      dob: dateOfBirth,
      address_for_communication: address,
      permanent_address: permanentAddress,
      marital_status: maritalStatus,
      contact_no: mobileNumber,
      telephone_number: telephoneNumber,
      email_id: email,
      qualifications: qualification,
      specialized_skills: skills,
      last_employment: employment,
      years_of_experience: experience,
      hiring_type: hiringType,
      ready_to_relocate: readyToRelocate,
      work_preferred_location: preferredLocation,
      reason_to_join: reasonToJoin,
      salary_expectations: salaryExpectations,
      // uploded_resume:resume.name,
      // upload_photograph:photograph.name

    };

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(data));
    formDataToSend.append("files.uploded_resume", formData.resume.name);
    formDataToSend.append("files.upload_photograph", formData.photograph.name);

    try {
      const response = await fetch(`${siteUrl}/api/career-applies`, {
        mode: 'no-cors',
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("API call successful");
        if (responseData.data) {
          const submittedData = responseData.data.attributes;
          await fetch(`/api/careerReqMail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submittedData),
          });
          console.log("Form submitted successfully:", submittedData);
          alert("Application submitted successfully!");

          // Clear the form data after successful submission
          setFormData({
            position: "",
            category: "",
            preferredLocation: "",
            fullName: "",
            gender: "",
            dateOfBirth: "",
            address: "",
            permanentAddress: "",
            maritalStatus: "",
            mobileNumber: "",
            telephoneNumber: "",
            email: "",
            qualification: "",
            skills: "",
            employment: "",
            experience: "",
            hiringType: "",
            readyToRelocate: "",
            reasonToJoin: "",
            resume: "",
            photograph: "",
            salaryExpectations: "",
          });

          window.open("/thank-you", "_self");
        }
      } else {
        // Handle error response
        console.error("API call failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // If all validations pass, submit the form
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
    // Fetch SEO data from your API
    // fetch(`${siteUrl}/api/seos?pagination[start]=0&pagination[limit]=50`) // Replace with the actual API endpoint
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('API response data:', data); // Log the API response data
    //         if (data && data.data && data.data.length > 0) {
    //             const seoAttributes = data.data[40].attributes;
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
      const seoAttributes = seodata.data[40].attributes;
      setSeoData({
        title: seoAttributes.title || "",
        metaTitle: seoAttributes.metaTitle || "",
        metaDescription: seoAttributes.metaDescription || "",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        {seoData.metaTitle && <meta name="title" content={seoData.metaTitle} />}
        {seoData.metaTitle && (
          <meta name="description" content={seoData.metaDescription} />
        )}
      </Head>
      <Fragment>
        <NavBar />
        {/* {seoData && (
                    <Seo
                        title={seoData.title}
                        metaTitle={seoData.metaTitle}
                        metaDescription={seoData.metaDescription}
                    />
                )} */}

        <div className="top-section25">
          <section className="wrap-item-principal-se1">
            <a className="backto-btn marginLeftlinks" href="/careers">
              <img src="assets/img/blog/13-arrow-left.png" alt="Transpro" />
              <span>Back to Careers</span>
            </a>
            <div className="container">
              <div className="wrap-item-text1 news-item">
                <h1 className="principal-mess">Careers</h1>
                <p>Kindly fill in the job opening form below.</p>
                <p>Our team member will get back to you at the earliest.</p>
              </div>
            </div>
          </section>
          <section>
            <div className="container job_posting">
              <form onSubmit={handleSubmit}>
                <div className="form_content_ca">
                  <h3 className="job_pos_head">Job Position</h3>
                  <div className="job-posttion-box">
                    <div>
                      <label className="job_position_first-sec">
                        Position*:<br></br>
                        <select
                          className="select_job_position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                        >
                          <option value="">Select position</option>
                          <option value="Software Engineer">
                            Software Engineer
                          </option>
                          <option value="Data Analyst">Data Analyst</option>
                          <option value="UI/UX Designer">UI/UX Designer</option>
                          {/* Add more options as needed */}
                        </select>
                      </label>
                      <br></br>
                      {formErrors.position && (
                        <span className="error">{formErrors.position}</span>
                      )}
                      <br></br>
                      <label className="job_position_first-sec">
                        Category*:<br></br>
                        <select
                          className="select_job_position"
                          name="category"
                          value={category}
                          onChange={handleChange}
                        >
                          <option value="">Select category</option>
                          <option value="IT">IT</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Finance">Finance</option>
                          {/* Add more options as needed */}
                        </select>
                      </label>
                      {formErrors.category && (
                        <span className="error">{formErrors.category}</span>
                      )}
                    </div>
                    <div className="pre-location">
                      <label className="job_position_first-sec">
                        Preferred Location*:<br></br>
                        <select
                          className="select_job_position"
                          name="preferredLocation"
                          value={preferredLocation}
                          onChange={handleChange}
                        >
                          <option value="">Select preferred location</option>
                          <option value="New York">New York</option>
                          <option value="San Francisco">San Francisco</option>
                          <option value="London">London</option>
                          {/* Add more options as needed */}
                        </select>
                      </label>
                      <br></br>
                      {formErrors.preferredLocation && (
                        <span className="error">
                          {formErrors.preferredLocation}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <br></br>
                    <h2 className="job_pos_head">Personal Details</h2>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Full Name*:
                        </label>
                        <br></br>
                        <input
                          className="input_personal"
                          type="text"
                          name="fullName"
                          placeholder="Full Name*"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                        {formErrors.fullName && (
                          <span className="error">{formErrors.fullName}</span>
                        )}
                      </div>
                      <div>
                        <label className="label_top job_position_first-sec">
                          Gender*:
                        </label>
                        <br></br>
                        <select
                          className="input_personal marital"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {formErrors.gender && (
                          <span className="error">{formErrors.gender}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="job_position_first-sec">
                        Date of Birth*:
                      </label>
                      <br />
                      <input
                        type="date"
                        className="input_personal marital"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                      <br></br>
                      {formErrors.dateOfBirth && (
                        <span className="error">{formErrors.dateOfBirth}</span>
                      )}
                    </div>

                    <br></br>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Address for communication*:
                        </label>
                        <br></br>
                        <textarea
                          className="input_personal adress_careers"
                          name="address"
                          placeholder="Address for communication*"
                          value={formData.address}
                          onChange={handleChange}
                        ></textarea>
                        {formErrors.address && (
                          <span className="error">{formErrors.address}</span>
                        )}
                      </div>
                      <div>
                        <label className="job_position_first-sec">
                          Permanent address*:
                        </label>
                        <br></br>
                        <textarea
                          className="input_personal adress_careers"
                          name="permanentAddress"
                          placeholder="Permanent address*"
                          value={formData.permanentAddress}
                          onChange={handleChange}
                        ></textarea>
                        {formErrors.permanentAddress && (
                          <span className="error">
                            {formErrors.permanentAddress}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Marital Status*:
                        </label>
                        <br></br>
                        <select
                          className="input_personal marital"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleChange}
                        >
                          <option value="">Select marital status</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                        {formErrors.maritalStatus && (
                          <span className="error">
                            {formErrors.maritalStatus}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="label_top job_position_first-sec">
                          Mobile Number*:
                        </label>
                        <br></br>
                        <input
                          className="input_personal"
                          type="text"
                          name="mobileNumber"
                          placeholder="Enter Your Mobile Number*"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                        />
                        {formErrors.mobileNumber && (
                          <span className="error">
                            {formErrors.mobileNumber}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Telephone Number:
                        </label>
                        <br></br>
                        <input
                          className="input_personal"
                          type="text"
                          placeholder="Enter Your Telephone Number*"
                          name="telephoneNumber"
                          value={formData.telephoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="job_position_first-sec">
                          Email ID*:
                        </label>
                        <br></br>
                        <input
                          className="input_personal"
                          placeholder="Enter your Email ID*"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {formErrors.email && (
                          <span className="error">{formErrors.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Qualification*:
                        </label>
                        <br></br>
                        <select
                          className="input_personal marital"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                        >
                          <option value="">Select your Qualification</option>
                          <option value="highschool">High School</option>
                          <option value="bachelors">Bachelor's Degree</option>
                          <option value="masters">Master's Degree</option>
                          <option value="doctorate">Doctorate</option>
                        </select>
                        {formErrors.qualification && (
                          <span className="error">
                            {formErrors.qualification}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="label_top job_position_first-sec">
                          Any other/specialized skills:
                        </label>
                        <br></br>
                        <input
                          className="input_personal any_other-skill"
                          name="skills"
                          placeholder="Enter Any other/specialized skills"
                          value={formData.skills}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Current/Last Employment:
                        </label>
                        <br></br>
                        <input
                          className="input_personal any_other-skill"
                          name="employment"
                          placeholder="Current/Last Employment"
                          value={formData.employment}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="no_exp label_top job_position_first-sec">
                          Number of years of experience with details*:
                        </label>
                        <br></br>
                        <input
                          className="input_personal any_other-skill"
                          name="experience"
                          placeholder="Enter Number of years of experience"
                          value={formData.experience}
                          onChange={handleChange}
                        />
                        {formErrors.experience && (
                          <span className="error">{formErrors.experience}</span>
                        )}
                      </div>
                    </div>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Hiring Type*:
                        </label>
                        <br></br>
                        <select
                          className="input_personal marital"
                          name="hiringType"
                          value={formData.hiringType}
                          onChange={handleChange}
                        >
                          <option value="">-- Select Hiring Type --</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                        {formErrors.hiringType && (
                          <span className="error">{formErrors.hiringType}</span>
                        )}
                      </div>
                      <div>
                        <label className="label_top job_position_first-sec">
                          Are you ready to relocate (if required)?*:
                        </label>
                        <br />
                        <select
                          className="input_personal marital"
                          name="readyToRelocate"
                          value={formData.readyToRelocate}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors.readyToRelocate && (
                          <span className="error">
                            {formErrors.readyToRelocate}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="job_position_first-sec">
                        Preferred Location*:
                      </label>
                      <br />
                      <select
                        name="preferredLocation"
                        className="input_personal marital"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                      >
                        <option value="">- Select Preferred Location -</option>
                        <option value="Anywhere">Anywhere</option>
                        <option value="Online/Remote">Online/Remote</option>
                        <option value="Institute's Location">
                          Institute's Location
                        </option>
                      </select>
                      <br></br>
                      {formErrors.preferredLocation && (
                        <span className="error">
                          {formErrors.preferredLocation}
                        </span>
                      )}
                    </div>

                    <br></br>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Why do you want to join us? Please describe briefly*:
                        </label>
                        <br />

                        <textarea
                          className="input_personal adress_careers"
                          name="reasonToJoin"
                          placeholder="Enter reasons to join us*"
                          value={formData.reasonToJoin}
                          onChange={handleChange}
                        />
                        {formErrors.reasonToJoin && (
                          <span className="error">
                            {formErrors.reasonToJoin}
                          </span>
                        )}
                      </div>

                      <div className="label_top">
                        <label className="job_position_first-sec">
                          Upload Resume*:
                        </label>
                        <br></br>
                        <input
                          type="file"
                          className="input_personal"
                          name="resume"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleChange}
                        />
                        {formErrors.resume && (
                          <span className="error">{formErrors.resume}</span>
                        )}
                      </div>
                    </div>
                    <div className="content_across_personal">
                      <div>
                        <label className="job_position_first-sec">
                          Upload Photograph (optional):
                        </label>
                        <br></br>
                        <input
                          className="input_personal"
                          type="file"
                          name="photograph"
                          id="photograph"
                          accept=".jpg,.png,.jpeg"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="label_top">
                        <label className="job_position_first-sec">
                          Salary Expectations (INR)*:
                        </label>
                        <br />
                        <select
                          className="input_personal marital"
                          name="salaryExpectations"
                          value={formData.salaryExpectations}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>

                          {salaryExpectationsApi?.map((option) => (
                            <option key={option} value={option.Salary}>
                              {option.Salary}
                            </option>
                          ))}
                        </select>
                        {formErrors.salaryExpectations && (
                          <span className="error">
                            {formErrors.salaryExpectations}
                          </span>
                        )}
                      </div>
                    </div>
                    <br></br>
                    <button className="submit_career-apply" type="submit">
                      Submit
                    </button>
                    <br></br>

                    <p className="line_after_submit">
                      Uploaded files should be maximum 2MB in size
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
        <Footer />
      </Fragment>
    </>
  );
};

export default CareerApply;
