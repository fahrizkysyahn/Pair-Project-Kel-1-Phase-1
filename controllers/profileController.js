const { User, UserProfile } = require("../models/index");

class ProfileController {
  static async showProfile(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.session.userId },
        include: [{ model: UserProfile }],
      });

      res.render("profile", { user, errors: null });
    } catch (error) {
      res.send(error);
    }
  }

  static async editForm(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.session.userId },
        include: [{ model: UserProfile }],
      });

      res.render("editProfile", { user, errors: null });
    } catch (error) {
      res.send(error);
    }
  }

  static async postEdit(req, res) {
    try {
      const { fullName, phoneNumber, gender } = req.body;

      const existingProfile = await UserProfile.findOne({
        where: { UserId: req.session.userId },
      });

      if (existingProfile) {
        await UserProfile.update(
          { fullName, phoneNumber, gender },
          { where: { UserId: req.session.userId } }
        );
      } else {
        await UserProfile.create({
          fullName,
          phoneNumber,
          gender,
          UserId: req.session.userId,
        });
      }

      res.redirect("/profile");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((el) => el.message);
        const user = await User.findOne({
          where: { id: req.session.userId },
          include: [{ model: UserProfile }],
        });
        res.render("editProfile", { user, errors });
      } else {
        res.send(error);
      }
    }
  }
}

module.exports = ProfileController;