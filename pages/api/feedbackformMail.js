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
    const mailList = data?.data?.attributes?.Feedback.split(",")

    const { full_name, email_id, contact_no, message } = req.body.data;

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
            subject: `Feedback Mail - ${full_name} - ${contact_no} `,
            text: `Feedback form`,
            html: `<p>Full Name: <b>${full_name}</b></p>
                    <p>Email ID: <b>${email_id}</b></p>
                    <p>Contact Number: <b>${contact_no}</b></p>
                    <p>Message: <b>${message}</b></p>`
        });
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
}