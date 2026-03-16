const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// @desc    Submit contact form
const submitContactForm = async (req, res) => {
    try {
        const { user_name, user_email, subject, message, captchaToken } = req.body;

        // Verify reCAPTCHA
        if (process.env.RECAPTCHA_SECRET_KEY) {
            if (!captchaToken) {
                return res.status(400).json({ message: 'Please complete the reCAPTCHA' });
            }
            
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
            const response = await fetch(verifyUrl, { method: 'POST' });
            const data = await response.json();
            
            if (!data.success) {
                return res.status(400).json({ message: 'reCAPTCHA verification failed' });
            }
        }

        const newContact = new Contact({ user_name, user_email, subject, message });
        await newContact.save();

        if (process.env.SMTP_HOST && process.env.SMTP_USERNAME) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.SMTP_USERNAME,
                to: process.env.SMTP_USERNAME, // sending it to admin's email
                replyTo: user_email,
                subject: `New Inquiry: ${subject} from ${user_name}`,
                text: `You have received a new message from your website contact form.\n\nName: ${user_name}\nEmail: ${user_email}\nSubject: ${subject}\n\nMessage:\n${message}`
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all contact messages (Admin only)
const getContacts = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark message as read (Admin only)
const markContactRead = async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete message (Admin only)
const deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    submitContactForm,
    getContacts,
    markContactRead,
    deleteContact
};
