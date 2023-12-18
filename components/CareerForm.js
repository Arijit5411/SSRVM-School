import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import NavBar from "./NavBar";
import Link from "next/link";

const isProduction = process.env.NODE_ENV === "production";

const siteUrl = isProduction
  ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
  : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;
const CareerForm = () => {
  const [inputKey, setInputKey] = useState("");
  const [salaryExpectationsApi, setSalaryExpectation] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);

  setJobRole;
  const initialValues = {
    categoryNew: "",
    position: "",
    locationSelect: "",
    fname: "",
    gender: "",
    DOB: "",
    address: "",
    pAddress: "",
    martialStatus: "",
    mobile: "",
    tele: "",
    email: "",
    qualification: "",
    skills: "",
    lastEmploy: "",
    experience: "",
    hiringType: "",
    relocation: "",
    preferLocation: [],
    whyJoin: "",
    resume: null,
    photo: null,
    salaryExp: "",
  };

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    position: Yup.string().required("Position is required"),
    locationSelect: Yup.string().required("Preferred Location is required"),
    fname: Yup.string().required("Full Name is required"),
    gender: Yup.string().required("Gender is required"),
    DOB: Yup.string().required("Date of Birth is required"),
    address: Yup.string().required("Address for Communication is required"),
    pAddress: Yup.string().required("Permanent Address is required"),
    martialStatus: Yup.string().required("Marital Status is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[0-9]{10}$/, "Mobile must be exactly 10 numeric digits"),
    tele: Yup.string()
      .required("Telephone Number is required")
      .matches(
        /^[0-9]{10}$/,
        "Telephone Number must be exactly 10 numeric digits"
      ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email ID is required"),
    qualification: Yup.string().required("Qualification is required"),
    skills: Yup.string().required("Skills are required"),
    lastEmploy: Yup.string().required("Current/Last Employment is required"),
    experience: Yup.string().required("Experience is required"),
    hiringType: Yup.string().required("Hiring Type is required"),
    relocation: Yup.string().required("Relocation is required"),
    preferLocation: Yup.array().min(
      1,
      "Select at least one Preferred Location"
    ),
    whyJoin: Yup.string().required("Why do you want to join is required"),
    salaryExp: Yup.string(),

    resume: Yup.mixed()
      .required("Resume is required")
      .test("fileSize", "Resume size must be less than 5MB", (value) => {
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024;
      })
      .test(
        "fileType",
        "Invalid file type. Only DOCX, PDF allowed.",
        (value) => {
          if (!value) return true;
          return [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(value.type);
        }
      ),
    photo: Yup.mixed()
      .required("Photograph is required")
      .test("fileSize", "Photo size must be less than 2MB", (value) => {
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024;
      })
      .test(
        "fileType",
        "Invalid file type. Only PNG, JPEG, JPG allowed.",
        (value) => {
          if (!value) return true;
          return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
        }
      ),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const resumeData = await fileUpload(values.resume);
      const photoData = await fileUpload(values.photo);

      const updatedValues = { ...values, resume: resumeData, photo: photoData };

      await axios.post("/api/sendMailCareer", updatedValues);

      toast.success("Email sent Successfully!");
      resetForm();

      // =========== resetForm is not Reset resume and photo
      document.getElementById("uploadResume").value = "";
      document.getElementById("uploadPhoto").value = "";

      if (resumeData) {
        await axios.delete("/api/deleteFile", {
          data: { filename: resumeData },
        });
      }

      if (photoData) {
        await axios.delete("/api/deleteFile", {
          data: { filename: photoData },
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong, Try again!");
    } finally {
      setSubmitting(false);
    }
  };

  const fileUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      return await axios
        .post("/api/upload", formData)
        .then(({ data: { done, name } }) => (done === "ok" ? name : null))
        .catch((error) => {
          console.error("Err:", error);
          throw error;
        });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    fetch(`${siteUrl}/api/careers-pages?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setJobRole(data?.data[0]?.attributes);
        setLocation(data?.data[0]?.attributes);
        setCategory(data?.data[0]?.attributes);
        setSalaryExpectation(data?.data[0]?.attributes);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <section className="section pt-0">
        <div className="container">
          <section className="wrap-item-principal-se1 back-to-ca">
            <Link
              className="backto-btn d-inline-flex align-items-center gap-2 position-relative"
              style={{ zIndex: "99" }}
              href="/careers"
            >
              <img src="assets/img/blog/13-arrow-left.png" alt="Transpro" />
              <span>Back to Careers</span>
            </Link>
            <div className="container">
              <div className="wrap-item-text1 news-item">
                <h1 className="principal-mess">Careers</h1>
                <p>Kindly fill in the job opening form below.</p>
                <p>Our team member will get back to you at the earliest.</p>
              </div>
            </div>
          </section>
          <div className="from-box p17s3-from">
            <form
              className="def-form"
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
            >
              <div className="from-inn p17s3-inn-f1">
                <div className="from-title">
                  <h3 className="fs-18 fs-md-20 fs-lg-22 fw-600 mb-3 color-1">
                    Careers
                  </h3>
                </div>
                <div className="row g-3 g-lg-4">
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Position <span className="text-danger">*</span>
                      </label>
                      <select
                        className="fw-600 color-1"
                        name="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Position</option>
                        {jobRole?.Job_Role?.map(function (d) {
                          if (d.Job_Role !== null) {
                            return <option key={d.id}>{d.Job_Role}</option>;
                          }
                        })}
                      </select>

                      {formik.touched.position && formik.errors.position && (
                        <div className="error-message ms-3">
                          {formik.errors.position}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Preferred Location{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        className="fw-600 color-1"
                        name="locationSelect"
                        value={formik.values.locationSelect}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Location</option>

                        {location?.Preferred_Locations?.map(function (d) {
                          if (d.Preferred_Locations !== null) {
                            return <option key={d.id}>{d.Location}</option>;
                          }
                        })}
                      </select>
                      {formik.touched.locationSelect &&
                        formik.errors.locationSelect && (
                          <div className="error-message ms-3">
                            {formik.errors.locationSelect}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className="fw-600 color-1"
                        name="categoryNew"
                        value={formik.values.categoryNew}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select category</option>
                        {category?.Job_Categories?.map(function (d) {
                          if (d.Job_Categories !== null) {
                            return <option key={d.id}>{d.Category}</option>;
                          }
                        })}
                        {/* <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option> */}
                      </select>
                      {formik.touched.category && formik.errors.category && (
                        <div className="error-message ms-3">
                          {formik.errors.category}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Personal Details */}
              <div className="from-inn p17s3-inn-f2">
                <div className="from-title">
                  <h3 className="fs-18 fs-md-20 fs-lg-22 fw-600 mb-3 color-1">
                    Personal Details
                  </h3>
                </div>
                <div className="row g-3 g-lg-4">
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="fname"
                        value={formik.values.fname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.fname && formik.errors.fname && (
                        <div className="error-message ms-3">
                          {formik.errors.fname}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        className="fw-600 color-1"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {formik.touched.gender && formik.errors.gender && (
                        <div className="error-message ms-3">
                          {formik.errors.gender}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex gap-2">
                        <input
                          type="date"
                          name="DOB"
                          value={formik.values.DOB}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.DOB && formik.errors.DOB && (
                        <div className="error-message ms-3">
                          {formik.errors.DOB}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6"></div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Address for Communication{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <textarea
                        type="text-area"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.address && formik.errors.address && (
                        <div className="error-message ms-3">
                          {formik.errors.address}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Permanent Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        type="text-area"
                        name="pAddress"
                        value={formik.values.pAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.pAddress && formik.errors.pAddress && (
                        <div className="error-message ms-3">
                          {formik.errors.pAddress}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Marital Status <span className="text-danger">*</span>
                      </label>
                      <select
                        className="fw-600 color-1"
                        name="martialStatus"
                        value={formik.values.martialStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select marital status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                      {formik.touched.martialStatus &&
                        formik.errors.martialStatus && (
                          <div className="error-message ms-3">
                            {formik.errors.martialStatus}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Mobile <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.mobile && formik.errors.mobile && (
                        <div className="error-message ms-3">
                          {formik.errors.mobile}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Telephone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="tele"
                        value={formik.values.tele}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.tele && formik.errors.tele && (
                        <div className="error-message ms-3">
                          {formik.errors.tele}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="error-message ms-3">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Qualification*:
                      </label>
                      <br></br>
                      <select
                        className="fw-600 color-1"
                        name="qualification"
                        value={formik.values.qualification}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select your Qualification</option>
                        <option value="highschool">High School</option>
                        <option value="bachelors">Bachelor's Degree</option>
                        <option value="masters">Master's Degree</option>
                        <option value="doctorate">Doctorate</option>
                      </select>
                      {formik.errors.qualification && (
                        <span className="error-message ms-3">
                          {formik.errors.qualification}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Any Other / Specialized Skills{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formik.values.skills}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.skills && formik.errors.skills && (
                        <div className="error-message ms-3">
                          {formik.errors.skills}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Current / Last Employment{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastEmploy"
                        value={formik.values.lastEmploy}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.lastEmploy &&
                        formik.errors.lastEmploy && (
                          <div className="error-message ms-3">
                            {formik.errors.lastEmploy}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Number of years of experience with details{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.experience &&
                        formik.errors.experience && (
                          <div className="error-message ms-3">
                            {formik.errors.experience}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Hiring Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="fw-600 color-1"
                        name="hiringType"
                        value={formik.values.hiringType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">-- Select Hiring Type --</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                      {formik.touched.hiringType &&
                        formik.errors.hiringType && (
                          <div className="error-message ms-3">
                            {formik.errors.hiringType}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Are you ready to relocate (if required)?*:
                      </label>
                      <br />
                      <select
                        className="input_personal marital"
                        name="relocation"
                        value={formik.values.relocation}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      {formik.touched.relocation &&
                        formik.errors.relocation && (
                          <div className="error-message ms-3">
                            {formik.errors.relocation}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-inline-block fs-16 fs-lg-16 fw-700 color-1 mb-2">
                      Preferred Location <span className="text-danger">*</span>
                    </div>
                    <div className="d-flex flex-column gap-3 flex-md-row gap-md-4 align-items-md-center">
                      <div
                        className={`checkbox-wrap ${
                          formik.values.preferLocation.includes("Anywhere")
                            ? "checked"
                            : ""
                        }`}
                      >
                        <input
                          className="d-none"
                          id="checkbox-1"
                          type="checkbox"
                          name="preferLocation"
                          value="Anywhere"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.preferLocation.includes(
                            "Anywhere"
                          )}
                        />
                        <label
                          htmlFor="checkbox-1"
                          className={`d-flex align-items-center gap-2 fs-16 fs-lg-16 fw-700 color-1 ${
                            formik.values.preferLocation.includes("Anywhere")
                              ? "checked"
                              : ""
                          }`}
                        >
                          <div className="rounded-checkbox"></div>
                          <span>Anywhere</span>
                        </label>
                      </div>

                      <div
                        className={`checkbox-wrap ${
                          formik.values.preferLocation.includes("OnlineRemote")
                            ? "checked"
                            : ""
                        }`}
                      >
                        <input
                          className="d-none"
                          id="checkbox-2"
                          type="checkbox"
                          name="preferLocation"
                          value="OnlineRemote"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.preferLocation.includes(
                            "OnlineRemote"
                          )}
                        />
                        <label
                          htmlFor="checkbox-2"
                          className="d-flex align-items-center gap-2 fs-16 fs-lg-16 fw-700 color-1"
                        >
                          <div className="rounded-checkbox"></div>
                          <span>Online / Remote</span>
                        </label>
                      </div>

                      <div
                        className={`checkbox-wrap ${
                          formik.values.preferLocation.includes(
                            "InstitutesLocation"
                          )
                            ? "checked"
                            : ""
                        }`}
                      >
                        <input
                          className="d-none"
                          id="checkbox-3"
                          type="checkbox"
                          name="preferLocation"
                          value="InstitutesLocation"
                          onChange={formik.handleChange}
                          checked={formik.values.preferLocation.includes(
                            "InstitutesLocation"
                          )}
                        />
                        <label
                          htmlFor="checkbox-3"
                          className="d-flex align-items-center gap-2 fs-16 fs-lg-16 fw-700 color-1"
                        >
                          <div className="rounded-checkbox"></div>
                          <span>Institutes Location</span>
                        </label>
                      </div>
                    </div>
                    {formik.touched.preferLocation &&
                      formik.errors.preferLocation && (
                        <div className="error-message ms-3 ms-0 mt-3">
                          {formik.errors.preferLocation}
                        </div>
                      )}
                  </div>

                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Why do you want to join us? Please describe briefly.{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="whyJoin"
                        value={formik.values.whyJoin}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.whyJoin && formik.errors.whyJoin && (
                        <div className="error-message ms-3">
                          {formik.errors.whyJoin}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="input-wrap color-1">
                      <div className="d-inline-block fs-16 fs-lg-16 fw-700 color-1 mb-2">
                        Upload Resume <span className="text-danger">*</span>
                      </div>
                      <label
                        className="file-input-label w-100 d-flex align-items-center"
                        htmlFor="uploadResume"
                      >
                        <input
                          className="h-auto border-0"
                          key={inputKey}
                          type="file"
                          id="uploadResume"
                          name="resume"
                          accept=".pdf,.docx"
                          onChange={(event) =>
                            formik.setFieldValue(
                              "resume",
                              event.currentTarget.files[0]
                            )
                          }
                          onBlur={formik.handleBlur}
                        />
                      </label>
                      <p className="fs-14 mt-1 ms-3 text-dark">
                        Accepted file types: pdf, doc, docx, Max. file size:
                        5MB.
                      </p>
                      {formik.touched.resume && formik.errors.resume && (
                        <div className="error-message ms-3">
                          {formik.errors.resume}
                        </div>
                      )}
                    </div>
                  </div>
                
                    <div className="col-12 col-md-6 col-lg-6">
                      <div className="input-wrap color-1">
                        <div className="d-inline-block fs-16 fs-lg-16 fw-700 color-1 mb-2">
                          Upload Photograph{" "}
                          <span className="text-danger">*</span>
                        </div>
                        <label
                          className="file-input-label w-100 d-flex align-items-center"
                          htmlFor="uploadPhoto"
                        >
                          <input
                            className="h-auto border-0"
                            key={inputKey}
                            type="file"
                            id="uploadPhoto"
                            name="photo"
                            accept=".png, .jpg, .jpeg"
                            onChange={(event) =>
                              formik.setFieldValue(
                                "photo",
                                event.currentTarget.files[0]
                              )
                            }
                            onBlur={formik.handleBlur}
                          />
                        </label>
                        <p className="fs-14 mt-1 ms-3 text-dark">
                          Accepted file types: jpg, png, Max. file size: 5MB.
                        </p>
                        {formik.touched.photo && formik.errors.photo && (
                          <div className="error-message ms-3">
                            {formik.errors.photo}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                      <div className="input-wrap color-1">
                        <label className="fs-16 fs-lg-16 fw-700 color-1 mb-2">
                          Salary Expectations (INR)*:
                        </label>
                        <br />
                        <select
                          className=" fw-600 color-1"
                          name="salaryExp"
                          value={formik.values.salaryExp}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select an option</option>

                          {salaryExpectationsApi?.Salary_Expectations?.map(
                            function (d) {
                              if (d.Salary_Expectations !== null) {
                                return <option key={d.id}>{d.Salary}</option>;
                              }
                            }
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-12 col-lg-6">
                    <button
                      className="carr-submit-btn"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <div
                          className="spinner-border text-primary"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span type="submit">Submit</span>
                      )}
                    </button>
                  </div>
                </div>
              
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerForm;
