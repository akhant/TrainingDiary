import nodemailer from 'nodemailer';

const from = '"Training Diary" <info@trdiary.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Let's start training",
    html: `
    <h1> Please, confirm your email. Click to "Confirm"</h1>

    <a href="${user.generateConfirmationUrl()}" >Confirm </a>
    `,
  };

  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Reset Password',
    html: `
    <h1>To reset password follow this link:</h1> 

    <a href="${user.generateResetPasswordLink()}">Reset<a>
    `,
  };

  transport.sendMail(email);
}
