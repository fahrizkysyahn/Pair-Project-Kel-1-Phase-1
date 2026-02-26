"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/brycpt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Course, {
        through: models.UserCourse,
        foreignKey: "UserId",
        otherKey: "CourseId",
      });

      User.hasOne(models.UserProfile);
    }
  }
  (User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username already taken" },
        validate: {
          notNull: { msg: "Username is required" },
          notEmpty: { msg: "Username cannot be empty" },
          len: {
            args: [2, 32], // ini nyontek min-maxnya uname discord, kl mau diganti jg gpp
            msg: "Username must be 2-32 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already registered" },
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password cannot be empty" },
          len: {
            args: [8], // ini jg min maxnya asbun, kl mau disesuaiin ulang jg gpp
            msg: "Password must be at least 8 characters",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
  ), //hooks
    User.beforeCreate((u) => {
      u.role = "Standard";
      u.password = hashPassword(u.password);
    }));
  return User;
};
