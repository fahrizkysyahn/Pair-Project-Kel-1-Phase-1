const {
  User,
  Course,
  Categories,
  UserCourse,
  UserProfile,
} = require("../models/index");

class adminController {
  static async addForm(req, res) {
    try {
      let data = await Categories.findAll();
      //   res.send(data);
      res.render("addCourse", { data, errors: null });
    } catch (error) {
      res.send(error);
    }
  }

  static async postAdd(req, res) {
    try {
      const { CategoryId, name, description, duration } = req.body;

      await Course.create({
        name,
        description,
        duration,
        CategoryId,
      });

      res.redirect("/table");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => {
          return el.message;
        });
        let data = await Categories.findAll();
        res.render("addCourse", { data, errors });
      } else {
        res.send(error);
      }
    }
  }

  static async delete(req, res) {
    try {
      const { courseId } = req.params;

      await Course.destroy({
        where: {
          id: courseId,
        },
      });

      res.redirect("/table");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = adminController;
