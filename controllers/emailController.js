const transporter = require("../config/mailer");

const EmailController = {
  async showForm(req, res) {
    try {
      res.render("email", { success: req.query.success || null, errors: null });
    } catch (error) {
      res.send(error.message);
    }
  },

  async sendEmail(req, res) {
    try {
      const { to, subject, message } = req.body;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        html: `<p>${message}</p>`,
      });

      res.redirect("/email?success=Email sent successfully!");
    } catch (error) {
      res.render("email", {
        success: null,
        errors: [error.message],
      });
    }
  },
};

module.exports = EmailController;