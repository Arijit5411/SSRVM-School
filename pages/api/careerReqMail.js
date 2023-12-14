import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const isProduction = process.env.NODE_ENV === "production";

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    const response = await fetch(`${siteUrl}/api/email`)
    const data = await response.json()
    const mailList = data?.data?.attributes?.Career.split(",")

    const { full_name, email_id, contact_no, telephone_number, position_applied, preferred_location, category, gender, dob, address_for_communication, permanent_address,
        marital_status, qualifications, specialized_skills, last_employment, years_of_experience, hiring_type, ready_to_relocate, work_preferred_location,
        reason_to_join, salary_expectations,uploded_resume,upload_photograph
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
            // to: mailList,
            // to: 'husain.fakih@teampumpkin.com',
            to: "alka.rashinkar@teampumpkin.com",
            subject: `Career Apply Mail - ${full_name} - ${contact_no} `,
            text: `Career form`,
            html: `<p>Full Name: <b>${full_name}</b></p>
                    <p>Email ID: <b>${email_id}</b></p>
                    <p>Date of Birth: <b>${dob}</b></p>
                    <p>Contact Number: <b>${contact_no}</b></p>
                    <p>Telephone Number: <b>${telephone_number}</b></p>
                    <p>Position Applied: <b>${position_applied}</b></p>
                    <p>Preferred Location: <b>${preferred_location}</b></p>
                    <p>Category: <b>${category}</b></p>
                    <p>Gender: <b>${gender}</b></p>
                    <p>Address for Communication: <b>${address_for_communication}</b></p>
                    <p>Permanent Address: <b>${permanent_address}</b></p>
                    <p>Martial Status: <b>${marital_status}</b></p>
                    <p>Qualifications: <b>${qualifications}</b></p>
                    <p>Sepcialized Skills: <b>${specialized_skills}</b></p>
                    <p>Employment History: <b>${last_employment}</b></p>
                    <p>Experience: <b>${years_of_experience}</b></p>
                    <p>Hiring type: <b>${hiring_type}</b></p>
                    <p>Ready to relocate?: <b>${ready_to_relocate}</b></p>
                    <p>Preffered location for work: <b>${work_preferred_location}</b></p>
                    <p>Reason to join: <b>${reason_to_join}</b></p>
                    <p>Resume: <b>${uploded_resume}</b></p>
                    <p>Photograph: <b>${upload_photograph}</b></p>
                    <p>Expected Salary: <b>${salary_expectations}</b></p>`
                    
        });
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
}