const { User, Course, Categories, UserCourse, UserProfile } = require("../models/index");
const transporter = require("../config/mailer");

class adminController {
  static async addForm(req, res) {
    try {
      let data = await Categories.findAll();
      res.render("addCourse", { data, errors: null });
    } catch (error) {
      res.send(error);
    }
  }

  static async postAdd(req, res) {
    try {
      const { CategoryId, name, description, duration } = req.body;
      await Course.create({ name, description, duration, CategoryId });
      res.redirect("/courselist");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        let data = await Categories.findAll();
        res.render("addCourse", { data, errors });
      } else {
        res.send(error);
      }
    }
  }

  // ✅ Promise chaining: delete course → send email notification
  static async delete(req, res) {
    try {
      const { courseId } = req.params;

      // Ambil detail course sebelum didelete (untuk isi email)
      const course = await Course.findByPk(courseId);
      if (!course) return res.redirect("/courselist");

      const adminEmail = req.session.username; // atau bisa pakai email dari session

      Course.destroy({ where: { id: courseId } })
        .then(() => {
          return transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_FROM, // kirim notifikasi ke admin sendiri
            subject: "Course Deleted Notification",
            html: `
              <h2>Course Deletion Notice</h2>
              <p>Course <strong>"${course.name}"</strong> has been successfully deleted.</p>
              <p>Deleted by: ${req.session.username}</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            `,
          });
        })
        .then(() => {
          res.redirect("/courselist");
        })
        .catch((error) => {
          console.error("Delete/email error:", error);
          res.send(error);
        });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = adminController;