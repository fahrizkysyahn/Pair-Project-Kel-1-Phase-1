const { User, Course, Categories, UserCourse, UserProfile } = require("../models/index");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/brycpt");

class Controller {
  static async login(req, res) {
    try {
      const { errors } = req.query;
      res.render("landing", { errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postLogin(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user || !comparePassword(password, user.password)) {
        return res.redirect("/?errors=Invalid username or password");
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;

      res.redirect("/courselist");
    } catch (error) {
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      res.render("register", { errors: null });
    } catch (error) {
      res.send(error);
    }
  }

  static async postRegister(req, res) {
    try {
      const { username, email, password } = req.body;
      await User.create({ username, email, password });
      res.redirect("/?msg=register success, please login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        res.render("register", { errors });
      } else {
        res.send(error);
      }
    }
  }

  // ✅ showTable dengan fitur search menggunakan Sequelize Op
  static async showTable(req, res) {
    try {
      const { role } = req.session;
      const { search } = req.query;

      // Kondisi where untuk search
      const whereCondition = search
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${search}%` } },
              { description: { [Op.iLike]: `%${search}%` } },
            ],
          }
        : {};

      let data = await Categories.findAll({
        include: {
          model: Course,
          where: whereCondition,
          required: false,
        },
      });

      res.render("showCourses", { data, role, search: search || "" });
    } catch (error) {
      res.send(error);
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;