// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// // Validation Schema
// const validationSchema = Yup.object({
//   parentName: Yup.string().required("Parent Name is required"),
//   mobileNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
//     .required("Mobile number is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   whatsappConsent: Yup.boolean().oneOf(
//     [true],
//     "You must agree to receive messages on WhatsApp"
//   ),
// });

// const AddEnqForm = ({ submitted = () => {}, siteUrl }) => {
//   const [thank, setThank] = useState(false);

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const enquiryData = {
//         Parent_Name: values.parentName,
//         Phone_Number: values.mobileNumber,
//         Email: values.email,
//         WhatsApp_Consent: values.whatsappConsent,
//       };

//       // Send form data to the Next.js API route
//       const res = await axios.post("/api/AddEnqSubmitForm", { data: enquiryData });

//       if (res.status === 200) {
//         setThank(true);
//         resetForm();
//         setTimeout(() => {
//           setThank(false);
//           submitted(); // Calls the passed function or does nothing if it's not provided
//         }, 3000);
//         window.location.href = '/thank-you';
//       }
//     } catch (error) {
//       console.log("Error sending data:", error);
//     }
//   };

//   return (
//     <div className="px-1 py-1">
//       <div className="text-center">
//         <h3>Enquire Now</h3>
//         <p>Fill the form below and we’ll get in touch shortly!</p>
//       </div>
//       <Formik
//         initialValues={{
//           parentName: "",
//           mobileNumber: "",
//           email: "",
//           whatsappConsent: true,
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form className="from-wrap-banner-a3 d-flex flex-column gap-lg-1 admission-query-form-a1">
//             {/* Parent Name */}
//             <div className="form-input">
//               <Field
//                 name="parentName"
//                 type="text"
//                 className="form-control"
//                 placeholder="Parent Name"
//               />
//               <ErrorMessage name="parentName" component="div" className="error" />
//             </div>

//             {/* Mobile Number */}
//             <div className="position-relative form-input">
//               <Field
//                 name="mobileNumber"
//                 type="tel"
//                 className="form-control pe-5"
//                 placeholder="Mobile Number"
//               />
//               <i className="fa-solid fa-phone position-absolute bottom-auto end-0 translate-middle-y me-3 text-muted" style={{top:"42%"}}></i>
//             </div>
//             <ErrorMessage name="mobileNumber" component="div" className="error" />

//             {/* Email */}
//             <div className="position-relative form-input">
//               <Field
//                 name="email"
//                 type="email"
//                 className="form-control pe-5"
//                 placeholder="Email Id"
//               />
//               <i className="fa-solid fa-envelope position-absolute bottom-auto end-0 translate-middle-y me-3 text-muted" style={{top:"42%"}}></i>
//             </div>
//             <ErrorMessage name="email" component="div" className="error" />

//             {/* WhatsApp Consent */}
//             <div className="form-check mb-4">
//               <Field
//                 name="whatsappConsent"
//                 type="checkbox"
//                 className="form-check-input"
//                 id="whatsappConsent"
//               />
//               <label className="fs-14 fw-500" htmlFor="whatsappConsent">
//                 I agree to receive messages on
//                 <i className="fa-brands fa-whatsapp text-success px-2"></i> WhatsApp
//               </label>
//             </div>
//             <ErrorMessage name="whatsappConsent" component="div" className="error" />

//             {/* Submit Button */}
//             <div className="submit-wrap">
//               <button
//                 type="submit"
//                 className="enquire-btn rounded-pill submit-btn02 d-flex align-items-center text-black gap-2 justify-content-center"
//                 disabled={isSubmitting}
//               >
//                 <span>{isSubmitting ? "Submitting..." : "Enquire Now"}</span>
//                 <i className="fa-solid fa-circle-arrow-right"></i>
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//       {thank && <div className="mt-4 text-center">Thanks for reaching out!</div>}
//     </div>
//   );
// };

// export default AddEnqForm;


import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

// Validation Schema
const validationSchema = Yup.object({
  parentName: Yup.string().required("Parent Name is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  whatsappConsent: Yup.boolean().oneOf(
    [true],
    "You must agree to receive messages on WhatsApp"
  ),
});

const AddEnqForm = ({ submitted = () => {}, siteUrl }) => {
  const [thank, setThank] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA");
      return;
    }

    try {
      const enquiryData = {
        Parent_Name: values.parentName,
        Phone_Number: values.mobileNumber,
        Email: values.email,
        WhatsApp_Consent: values.whatsappConsent,
        Recaptcha_Token: captchaValue, // Include captcha token
      };

      // Send form data to the Next.js API route
      const res = await axios.post("/api/AddEnqSubmitForm", { data: enquiryData });

      if (res.status === 200) {
        setThank(true);
        resetForm();
        setCaptchaValue(null); // Reset captcha
        setTimeout(() => {
          setThank(false);
          submitted();
        }, 3000);
        window.location.href = "/thank-you";
      }
    } catch (error) {
      console.log("Error sending data:", error);
    }
  };

  return (
    <div className="px-1 py-1">
      <div className="text-center">
        <h3>Enquire Now</h3>
        <p>Fill the form below and we’ll get in touch shortly!</p>
      </div>
      <Formik
        initialValues={{
          parentName: "",
          mobileNumber: "",
          email: "",
          whatsappConsent: true,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="from-wrap-banner-a3 d-flex flex-column gap-lg-1 admission-query-form-a1">
            {/* Parent Name */}
            <div className="form-input">
              <Field
                name="parentName"
                type="text"
                className="form-control"
                placeholder="Parent Name"
              />
              <ErrorMessage name="parentName" component="div" className="error" />
            </div>

            {/* Mobile Number */}
            <div className="position-relative form-input">
              <Field
                name="mobileNumber"
                type="tel"
                className="form-control pe-5"
                placeholder="Mobile Number"
              />
              <i className="fa-solid fa-phone position-absolute bottom-auto end-0 translate-middle-y me-3 text-muted" style={{ top: "42%" }}></i>
            </div>
            <ErrorMessage name="mobileNumber" component="div" className="error" />

            {/* Email */}
            <div className="position-relative form-input">
              <Field
                name="email"
                type="email"
                className="form-control pe-5"
                placeholder="Email Id"
              />
              <i className="fa-solid fa-envelope position-absolute bottom-auto end-0 translate-middle-y me-3 text-muted" style={{ top: "42%" }}></i>
            </div>
            <ErrorMessage name="email" component="div" className="error" />

            {/* WhatsApp Consent */}
            <div className="form-check mb-4">
              <Field
                name="whatsappConsent"
                type="checkbox"
                className="form-check-input"
                id="whatsappConsent"
              />
              <label className="fs-14 fw-500" htmlFor="whatsappConsent">
                I agree to receive messages on
                <i className="fa-brands fa-whatsapp text-success px-2"></i> WhatsApp
              </label>
            </div>
            <ErrorMessage name="whatsappConsent" component="div" className="error" />

            {/* Google reCAPTCHA */}
            <div className="my-2">
              <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your actual site key
                onChange={(token) => setCaptchaValue(token)}
                onExpired={() => setCaptchaValue(null)}
              />
            </div>

            {/* Submit Button */}
            <div className="submit-wrap">
              <button
                type="submit"
                className="enquire-btn rounded-pill submit-btn02 d-flex align-items-center text-black gap-2 justify-content-center"
                disabled={isSubmitting || !captchaValue}
              >
                <span>{isSubmitting ? "Submitting..." : "Enquire Now"}</span>
                <i className="fa-solid fa-circle-arrow-right"></i>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {thank && <div className="mt-4 text-center">Thanks for reaching out!</div>}
    </div>
  );
};

export default AddEnqForm;

