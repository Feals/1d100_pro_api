const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: MAILADRESS,
    pass: PASSWORDMAIL,
  },
});

export const sendEmailToUsers = async (users, tableName) => {
  const template = fs.readFileSync("mailTableDeleted.ejs", "utf-8");

  for (const user of users) {
    const emailContent = ejs.render(template, {
      userName: user.firstname + user.lastname,
      tableName: tableName,
    });

    const mailOptions = {
      from: MAILADRESS,
      to: user.mail,
      subject: "Notification de suppression de table",
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`E-mail envoyé à ${user.mail}`);
    } catch (error) {
      console.error(`Erreur lors de l'envoi à ${user.mail}:`, error);
    }
  }
};
