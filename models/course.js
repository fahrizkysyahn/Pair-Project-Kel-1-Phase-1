"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Categories);
      Course.belongsToMany(models.User, {
        through: models.UserCourse,
        foreignKey: "CourseId",
        otherKey: "UserId",
      });
    }
    //getter
    get formatDuration() {
      let totalMinutes = this.duration;
      if (totalMinutes >= 60) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (minutes === 0) {
          return `${hours} hour(s)`;
        }

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
          len: {
            args: [5, 100],
            msg: "Course name must be 5-100 characters",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Description is required" },
          notEmpty: { msg: "Description cannot be empty" },
          len: {
            args: [10, 255],
            msg: "Description must be at least 10 characters",
          },
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
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
    },
  );
  return Course;
};
