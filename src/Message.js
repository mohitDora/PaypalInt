/* eslint-disable no-undef */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer to send emails using a transport
const transporter = nodemailer.createTransport({
  // Configure your email service provider here (e.g., Gmail, SendGrid, etc.)
  service: 'gmail',
  auth: {
    user: 'doramohitkumar@gmail.com',
    pass: 'Mohitdora21',
  },
});

// Function to send welcome email to new user
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    console.log("send")
  const email = user.email;
  const displayName = user.displayName || 'New User';

  const mailOptions = {
    from: 'doramohitkumar@gmail.com>',
    to: email,
    subject: 'Welcome to Our App!',
    text: `Hello ${displayName},\n\nWelcome to our app! We're thrilled to have you on board.\n\nBest regards,\nYour App Team`,
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('Welcome email sent to:', email);
    })
    .catch((error) => {
      console.error('Error sending welcome email:', error);
    });
});
