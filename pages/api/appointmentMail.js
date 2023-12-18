import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const isProduction = process.env.NODE_ENV === "production";

  const siteUrl = isProduction
    ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
    : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

  const response = await fetch(`${siteUrl}/api/email`);
  const data = await response.json();
  const mailList = data?.data?.attributes?.Appointment.split(",");

  const {
    full_name,
    email_id,
    contact_no,
    studying_in_our_school,
    yes_studying_class,
    looking_for_admission,
    addmition_number,
    select_reasion,
    any_other_question,
    any_other_reason,
    prefered_date
  } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `<${process.env.SMTP_USER}>`,
      to: mailList,
      // to: 'husain.fakih@teampumpkin.com',
      // to: "alka.rashinkar@teampumpkin.com",
      subject: `Appointment - ${full_name} - ${contact_no} `,
      text: `Appointment Information`,
      html: `<p>Full Name: <b>${full_name}</b></p>
                    <p>Email ID: <b>${email_id}</b></p>
                    <p>Contact Number: <b>${contact_no}</b></p>
                    <p>Studying in our School: <b>${studying_in_our_school}</b></p>
                    <p>Class: <b>${
                      yes_studying_class
                        ? yes_studying_class
                        : "No Class Selected"
                    }</b></p>
                  
                    <p>Looking for Addmission: <b>${
                      looking_for_admission ? looking_for_admission : "No"
                    }</b></p>

                    <p>Admission Number: <b>${
                      addmition_number
                        ? addmition_number
                        : "Admission Number not Entered"
                    }</b></p>
                    <p>Selected Reason: <b>${
                      select_reasion
                        ? select_reasion
                        : "Not Selected Any Reasion"
                    }</b></p>
                    <p>Any Other Text Reason: <b>${
                      any_other_reason
                        ? any_other_reason
                        : "Not Any Reasion Text"
                    }</b></p>
                    <p>Any Other Questions: <b>${
                      any_other_question
                        ? any_other_question
                        : "No Any Question"
                    }</b></p>
                    <p>Appointment Date: <b>${
                      prefered_date ? prefered_date : "No Date Selected"
                    }</b></p>
                    

                    </p>`,
    });
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
}
