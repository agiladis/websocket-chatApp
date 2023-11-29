const nodemailer = require('nodemailer');
const { SERVICE, SERVER_SMTP, EMAIL_SMTP, PASS_SMTP } = process.env;
const {
  activationTemplate,
  activatedTemplate,
} = require('../templates/mail.template.html');

const transporter = nodemailer.createTransport({
  host: SERVER_SMTP,
  service: SERVICE,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_SMTP,
    pass: PASS_SMTP,
  },
});

async function userActivation(email, activationLink) {
  const mailOptions = {
    from: EMAIL_SMTP,
    to: email,
    subject: 'Activate your chatApp account',
    html: activationTemplate(activationLink),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('response : ' + info.response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function activatedMailer(email) {
  const mailOptions = {
    from: EMAIL_SMTP,
    to: email,
    subject: 'Congratulations 🔥 Your account has been successfully activated!',
    html: activatedTemplate(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('response : ' + info.response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = { userActivation, activatedMailer };