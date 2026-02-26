"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCourse.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      UserCourse.belongsTo(models.Course, {
        foreignKey: "CourseId",
      });
    }
  }
  UserCourse.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID required" },
          isInt: { msg: "Invalid User ID" },
        },
      },
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Course ID required" },
          isInt: { msg: "Invalid Course ID" },
        },
      },
    },
    {
      sequelize,
      modelName: "UserCourse",
    },
  );
  return UserCourse;
};
