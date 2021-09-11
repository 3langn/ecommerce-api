const sgMail = require('@sendgrid/mail');
const config = require('../config/config');

sgMail.setApiKey(config.email.apikey);
const sendVerificationEmail = async (to, token) => {
  const verificationEmailUrl = `http://localhost:3000/verify-email?token=${token}`;
  const msg = {
    to,
    from: config.email.host, // Use the email address or domain you verified above
    subject: 'Please Verify Your Email',
    html: `<strong>Let's verify your email.</strong><br>
      ${to}<br>
      <a>${verificationEmailUrl}</a><br>
      Your link is active for ${config.jwt.verifyEmailExpirationMinutes} minutes. After that, you will need to resend the verification email
      `,
  };
  sgMail.send(msg);
};

module.exports = {
  sendVerificationEmail,
};
