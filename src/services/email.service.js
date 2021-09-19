import sgMail from '@sendgrid/mail';
import httpStatus from 'http-status';
import config from '../config/config.js';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';

sgMail.setApiKey(config.email.apikey);
const sendVerificationEmail = async (to, token) => {
  try {
    const verificationEmailUrl = `http://localhost:3000/v1/auth/verify-email?token=${token}`;
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
    await sgMail.send(msg);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Send mail verify failed');
  }
};
const sendResetPasswordEmail = async (to, token) => {
  try {
    const subject = 'Reset password';
    const resetPasswordUrl = `http://localhost:3000/v1/auth/reset-password?token=${token}`;
    const html = `Dear ${to}<br>,
To reset your password, click on this link: <a>${resetPasswordUrl}</a><br>
If you did not request any password resets, then ignore this email.`;

    const msg = {
      to,
      from: config.email.host,
      subject,
      html,
    };
    await sgMail.send(msg);
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Send mail reset password failed');
  }
};
export default { sendVerificationEmail, sendResetPasswordEmail };
