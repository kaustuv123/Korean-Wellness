import nodemailer from "nodemailer";

export const sendEmail = async ({ email, otp }: any) => {
  try {
    console.log("mail helper", email, " ", otp);

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      // host: "smtp.resend.com",
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: "techdynastysender@gmail.com",
        pass: "osqevecrduyftgum",
      },
    });

    console.log("transporter ", transporter);

    const mailOptions = {
      from: "techdynastysender@gmail.com",
      to: email,
      subject: `User Verification`,
      text: `
                          Verification OTP: ${otp}
                          The otp expires in 5 minutes
                      `,
    };

    console.log("mailoptions ", mailOptions);

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("error on mail", err);
  }
};
