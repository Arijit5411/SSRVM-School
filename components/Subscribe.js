import React, { useState, useEffect } from "react";

const Subscribe = ({ siteUrl }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    setErrorMessage();
  };

  useEffect(() => {
    // Initialize fnames and ftypes as empty arrays
    const fnames = [];
    const ftypes = [];

    // Your Mailchimp script code here
    (function ($) {
      window.fnames = fnames;
      window.ftypes = ftypes;
      fnames[0] = 'EMAIL';
      ftypes[0] = 'email';
      fnames[1] = 'FNAME';
      ftypes[1] = 'text';
      fnames[2] = 'LNAME';
      ftypes[2] = 'text';
      fnames[3] = 'ADDRESS';
      ftypes[3] = 'address';
      fnames[4] = 'PHONE';
      ftypes[4] = 'phone';
      fnames[5] = 'BIRTHDAY';
      ftypes[5] = 'birthday';
    })(window.jQuery);

    // Make sure to replace this URL with your actual Mailchimp script URL
    const scriptUrl = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';

    // Load the Mailchimp script dynamically
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      try {
        const response = await fetch(
          `${siteUrl}/api/email-subscribes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { email_id: email } }),
          }
        );

        if (response.ok) {
          setErrorMessage("");

          setEmail("");

          window.location.href = "/thank-you";
        } else {
          const errorData = await response.json();
          setErrorMessage(
            errorData.message || "An error occurred during submission."
          );
        }
      } catch (error) {
        setErrorMessage("An error occurred during submission.");
      }
    }
  };

  return (
    <>
      <div className="footer-top">
        <div className="container">
          <div className="row align-self-center">
            <div className="col-sm-6">
              <div className="media-left">
                <h3 className="footertext">Stay connected!</h3>
                <p className="footerP">
                  Subscribe to our monthly newsletter<br></br>
                  and know all that’s happening at SSRVM Trust.
                </p>
              </div>
            </div>

            <div className="col-sm-6 media-body widget widget_subscribe">
              {/* <form onSubmit={handleSubmit}>
                <div className="single-subscribe-inner">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email id"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errorMessage && (
                    <p style={{ color: "red", marginBottom: "4px" }}>
                      {errorMessage}
                    </p>
                  )}
                  <div>
                    <button className="footerbtn">Subscribe</button>
                  </div>
                </div>
              </form> */}
              <div id="mc_embed_shell">
                <link
                  href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <style type="text/css">

                </style>
                <div id="mc_embed_signup">
                  <form
                    action="https://ssrvm.us20.list-manage.com/subscribe/post?u=f6e983437895addec78cd7e1c&amp;id=f24c618601&amp;f_id=003d5ee6f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    onSubmit={handleSubmit}
                  >
                    <div id="mc_embed_signup_scroll">
                      {/* <h2>Subscribe</h2> */}
                      {/* <div className="indicates-required">
                        <span className="asterisk">*</span> indicates required
                      </div> */}
                      <div className="mc-field-group">
                        {/* <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label> */}
                        <input
                          type="email"
                          name="EMAIL"
                          className="required email"
                          id="mce-EMAIL"
                          required=""
                          value={email} // Bind the input value to the email state
                          placeholder="Email ID"
                          onChange={handleEmailChange} // Attach the change handler
                        />

                        <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
                      </div>
                      <div id="mce-responses m-0 w-100" className="clear foot">
                        <div className="response pt-0" id="mce-error-response" style={{ display: 'none' }}></div>
                        <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                      </div>
                      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                        <input type="text" name="b_f6e983437895addec78cd7e1c_f24c618601" tabIndex="-1" value="" />
                      </div>
                      <div className="optionalParent">
                        <div className="clear foot">
                          <input
                            type="submit"
                            name="subscribe"
                            id="mc-embedded-subscribe"
                            className="button"
                            value="Subscribe"
                          />
                          <p style={{ margin: '0px auto' }}>
                            <a
                              href="https://eepurl.com/hRxQdf"
                              title="Mailchimp - email marketing made easy and fun"
                            >
                            </a>

                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
