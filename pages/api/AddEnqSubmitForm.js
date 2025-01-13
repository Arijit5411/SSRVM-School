import nodemailer from 'nodemailer';
import { determineStrapiUrl } from "@/utils/strapiUtils";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const host = req.headers.host;

    const siteUrl = determineStrapiUrl(host);

    const response = await fetch(`${siteUrl}/api/email`)
    const data = await response.json()
    const mailList = data?.data?.attributes?.Contact

    // console.log("mails from strapi", mailList)

    const { Parent_Name, Phone_Number, Email, WhatsApp_Consent } = req.body.data;

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
            to: 'arijit.chowdhury@teampumpkin.com',
            subject: `Enquiry Form (Apply Now Page) - ${Parent_Name} - ${Phone_Number} `,
            text: `Enquiry Form`,
            html: `<p>Full Name: <b>${Parent_Name}</b></p>
                    <p>Email ID: <b>${Email}</b></p>
                    <p>Phone Number: <b>${Phone_Number}</b></p>`
        });
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
}