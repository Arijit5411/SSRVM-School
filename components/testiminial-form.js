import React, { useState } from "react";

const TestimonialsForm = () => {
    const initialState = {
        fullName: '',
        email: '',
        contactNumber: '',
        message: '',
        isRobot: false,
        errors: {
            fullName: '',
            email: '',
            contactNumber: '',
            message: '',
            isRobot: ''
        }
    };

    const [formData, setFormData] = useState(initialState);

    const { fullName, email, contactNumber, message, isRobot } = formData;

    const isProduction = process.env.NODE_ENV === "production";

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        // Clear the error of the field being edited
        setFormData({
            ...formData,
            [name]: fieldValue,
            errors: {
                ...formData.errors,
                [name]: ''
            }
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, contactNumber, message, isRobot } = formData;
        const errors = {};

        // Validate Full Name
        if (!fullName.trim()) {
            errors.fullName = 'Full Name is required';
        }

        // Validate Email ID
        if (!email.trim()) {
            errors.email = 'Email ID is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid Email ID';
        }

        // Validate Contact Number
        if (!contactNumber.trim()) {
            errors.contactNumber = 'Contact Number is required';
        } else if (!/^\d{10}$/.test(contactNumber)) {
            errors.contactNumber = 'Invalid Contact Number (must be 10 digits)';
        }

        // Validate Message
        if (!message.trim()) {
            errors.message = 'Message is required';
        }

        // Validate "I'm not a robot" checkbox
        if (!isRobot) {
            errors.isRobot = 'Please confirm you are not a robot';
        }

        // Update the errors state
        setFormData({
            ...formData,
            errors
        });

        // If there are no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            try {
                const apiUrl = `${siteUrl}/api/ssa-testimonials`;

                const payload = {
                    data: {
                        full_name: fullName,
                        email_id: email,
                        contact_no: contactNumber,
                        message: message
                    }
                };

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    console.log('Form submitted successfully!');
                    // Reset the form after successful submission
                    setFormData(initialState);

                    window.location.href = "/thank-you";
                } else {
                    console.error('Form submission failed.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
    };
    return (
        <>
            <section className="form-feedback container mg-top-75">
                <div className="title-bottom-form">
                    <h3>Share feedback</h3>
                    <p>Have some feedback? Drop us a line.</p>
                </div>
                {/* <div>
                    <form onSubmit={handleSubmit}>
                        <div className="bottom-sec-contact">
                            <div>
                                <div>
                                    {formData.errors.fullName && <p className="error">{formData.errors.fullName}</p>}
                                    <input
                                        className="input_feedback"
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={fullName}
                                        placeholder="Full Name*"
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>

                                <div>
                                    {formData.errors.email && <p className="error">{formData.errors.email}</p>}
                                    <input
                                        className="input_feedback"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email ID*"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    {formData.errors.contactNumber && <p className="error">{formData.errors.contactNumber}</p>}
                                    <input
                                        className="input_feedback"
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={contactNumber}
                                        placeholder="Contact Number*"
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>

                                <div>
                                    <label className="labeltitle">
                                        <input
                                            type="checkbox"
                                            name="isRobot"
                                            checked={isRobot}
                                            onChange={handleChange}
                                        />
                                        I'm not a robot
                                    </label>
                                    {formData.errors.isRobot && <p className="error">{formData.errors.isRobot}</p>}
                                </div>
                            </div>

                            <div>
                                <div>
                                    {formData.errors.message && <p className="error">{formData.errors.message}</p>}
                                    <textarea
                                        className="input_textarea-contact input_feedback"
                                        id="message"
                                        name="message"
                                        value={message}
                                        placeholder="Message*"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="submit-contact">
                            Submit
                        </button>
                        <p className="para_after-button">* All fields to be filled</p>
                    </form>
                </div> */}
                  <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
               
                                    <input
                                        className="input_feedback"
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={fullName}
                                        placeholder="Full Name*"
                                        onChange={handleChange}
                                    // required
                                    />
                                       {formData.errors.fullName && <p className="error">{formData.errors.fullName}</p>}
                                    <input
                                        className="input_feedback"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email ID*"
                                        onChange={handleChange}
                                    />
                    {formData.errors.email && <p className="error">{formData.errors.email}</p>}

                                    <input
                                        className="input_feedback"
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={contactNumber}
                                        placeholder="Contact Number*"
                                        onChange={handleChange}
                                    // required
                                    />
                                    {formData.errors.contactNumber && <p className="error">{formData.errors.contactNumber}</p>}

                  </div>
                  <div className="col-sm-6">
                                    <textarea
                                        className="input_textarea-contact input_feedback"
                                        id="message"
                                        name="message"
                                        value={message}
                                        placeholder="Message*"
                                        onChange={handleChange}
                                    />
                                                      {formData.errors.message && <p className="error">{formData.errors.message}</p>}

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
                                    {formData.errors.isRobot && <p className="error">{formData.errors.isRobot}</p>}
                </div>

                <button type="submit" className="submit-contact">
                  Submit
                </button>
                <p className="para_after-button">* All fields to be filled</p>
              </form>
            </div>
            </section>
        </>
    )
}
export default TestimonialsForm;