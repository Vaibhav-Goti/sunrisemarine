# Sunrise Marine Website

A professional website for Sunrise Marine, featuring contact forms, quote requests, and product showcases.

## Setup Instructions

1. Clone the repository:
```bash
git clone [your-repository-url]
cd waterboat-master
```

2. Install dependencies:
```bash
composer install
```

3. Environment Configuration:
- Copy `.env.example` to `.env`
- Update the `.env` file with your credentials:
  - SMTP settings for email
  - reCAPTCHA keys
  - Recipient email address

4. Server Requirements:
- PHP 7.4 or higher
- Composer
- XAMPP or similar web server

5. Email Configuration:
- Gmail SMTP is configured by default
- Make sure to:
  - Enable 2FA on your Gmail account
  - Generate an App Password for SMTP access
  - Update SMTP credentials in .env

6. reCAPTCHA Setup:
- Visit [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
- Register your site
- Add your domain
- Copy the site key and secret key to .env

## Features
- Product Showcase
- Contact Form with reCAPTCHA
- Quote Request System
- Responsive Design
- Email Notifications

## Security
- Environment variables for sensitive data
- reCAPTCHA protection on forms
- Secure email configuration
- Input sanitization

## File Structure
- `/css` - Stylesheets
- `/js` - JavaScript files
- `/images` - Image assets
- `/vendor` - Composer dependencies
- `/fonts` - Font files

## Contributing
1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Contact
For support or queries, contact [your-contact-info]
