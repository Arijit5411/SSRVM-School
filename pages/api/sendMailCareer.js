import { determineStrapiUrl } from '@/utils/strapiUtils';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const host = req.headers.host;
    const siteUrl = determineStrapiUrl(host);

    const response = await fetch(`${siteUrl}/api/email`)
    const data = await response.json()
    const mailList = data?.data?.attributes?.Career
    // const mailList = "subhajit.karmakar@teampumpkin.com"

    const {
        categoryNew,
        position,
        locationSelect,
        fname,
        gender,
        DOB,
        address,
        pAddress,
        martialStatus,
        mobile,
        tele,
        email,
        qualification,
        skills,
        lastEmploy,
        experience,
        hiringType,
        relocation,
        preferLocation,
        whyJoin,
        salaryExp,
        resume,
        photo
    } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    let attachments = [];

    if (resume && photo) {
        attachments = [
            {
                filename: `${resume}`,
                path: process.cwd() + `/public/uploads/${resume}`
            },
            {
                filename: `${photo}`,
                path: process.cwd() + `/public/uploads/${photo}`
            }
        ];
    }

    try {
        await transporter.sendMail({
            // from: `${email} <${process.env.SMTP_USER}>`,
            from: process.env.SMTP_USER,
            to: mailList,
            // to: 'subhajit.karmakar@teampumpkin.com',
            // to: 'alka.rashinkar@teampumpkin.com',
            subject: `SSRVM Trust Career Form, for -->${categoryNew}, ${position}, ${locationSelect}`,
            text: `SSRVM Trust Career Form`,
            html: `
                    <p>Category: <b>${categoryNew}</b></p>
                    <p>Position: <b>${position}</b></p>
                    <p>Preferred Location: <b>${locationSelect}</b></p>
                    <p>Full Name: <b>${fname}</b></p>
                    <p>Gender: <b>${gender}</b></p>
                    <p>DOB: <b>${DOB}</b></p>
                    <p>Address: <b>${address}</b></p>
                    <p>Permanent Address: <b>${pAddress}</b></p>
                    <p>Martial Status: <b>${martialStatus}</b></p>
                    <p>Mobile: <b>${mobile}</b></p>
                    <p>Telephone: <b>${tele}</b></p>
                    <p>Email: <b>${email}</b></p>
                    <p>Qualification: <b>${qualification}</b></p>
                    <p>Skills: <b>${skills}</b></p>
                    <p>Last Employment: <b>${lastEmploy}</b></p>
                    <p>Experience: <b>${experience}</b></p>
                    <p>Hiring Type: <b>${hiringType}</b></p>
                    <p>Relocation: <b>${relocation}</b></p>
                    <p>Preferred Location: <b>${preferLocation.map(loc => loc)}</b></p>
                    <p>Joining reason: <b>${whyJoin}</b></p>
                    <p>Salary Expectations: <b>${salaryExp}</b></p>`,
            attachments: attachments,
        });
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
}