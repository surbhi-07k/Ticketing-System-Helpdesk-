import nodemailer from "nodemailer";

const sendEmail = async (
  to,
  subject,
  text
) => {
  const testAccount =
    await nodemailer.createTestAccount();

  const transporter =
    nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

  const info =
    await transporter.sendMail({
      from:
        '"Helpdesk System" <helpdesk@test.com>',
      to,
      subject,
      text,
    });

  console.log(
    "Preview URL:",
    nodemailer.getTestMessageUrl(
      info
    )
  );

  return info;
};

export default sendEmail;