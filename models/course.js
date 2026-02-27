"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Categories);
      Course.belongsToMany(models.User, {
        through: models.UserCourse,
        foreignKey: "CourseId",
        otherKey: "UserId",
      });
    }

    // ✅ Static method: ambil semua course berdasarkan category
    static getCoursesByCategory(categoryId) {
      return Course.findAll({
        where: { CategoryId: categoryId },
        include: [{ model: sequelize.models.Categories }],
      });
    }

    // ✅ Static method: search course by name or description
    static searchCourses(keyword) {
      return Course.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${keyword}%` } },
            { description: { [Op.iLike]: `%${keyword}%` } },
          ],
        },
        include: [{ model: sequelize.models.Categories }],
      });
    }

    // getter (tidak diubah)
    get formatDuration() {
      let totalMinutes = this.duration;
      if (totalMinutes >= 60) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (minutes === 0) return `${hours} hour(s)`;
        return `${hours} hour(s) ${minutes} min(s)`;
      }
      return `${totalMinutes} min(s)`;
    }
  }

  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Course name is required" },
          notEmpty: { msg: "Course name cannot be empty" },
          len: { args: [5, 100], msg: "Course name must be 5-100 characters" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required" },
          notEmpty: { msg: "Description cannot be empty" },
          len: { args: [10, 255], msg: "Description must be at least 10 characters" },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must be assigned to Category" },
          notEmpty: { msg: "Category cannot be empty" },
          isInt: { msg: "Invalid Category ID" },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Duration is required" },
          notEmpty: { msg: "Duration cannot be empty" },
          isInt: { msg: "Duration must be a number" },
          min: { args: [1], msg: "Duration must be at least 1 minute" },
        },
      },
    },
    { sequelize, modelName: "Course" }
  );

  return Course;
};