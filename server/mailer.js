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
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
    <tr>
      <td>
        <center>
          <h1> Please, confirm your email to get access to all application features.</h1>
        </center>
      </td>
    </tr>
    
      <tr>
        <td>
          <center>
            <a href="${user.generateConfirmationUrl()}" style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; display: block; target="_blank">
            Confirm email
            </a>
          </center>
        </td>
      </tr>
    </table>
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
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0">
    <tr>
      <td>
        <center>
        <h1> <h1>To reset password follow this link:</h1> 
        </center>
      </td>
    </tr>
    
      <tr>
        <td>
          <center>
            <a href="${user.generateResetPasswordLink()}" style="color: #333333; font: 16px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; display: block; target="_blank">
            Reset password
            </a>
          </center>
        </td>
      </tr>
    </table>
    `,
  };

  transport.sendMail(email);
}
