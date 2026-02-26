"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User);
    }
  }
  UserProfile.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: { msg: "Username already taken" },
        validate: {
          notNull: { msg: "Full name is required" },
          notEmpty: { msg: "Full name cannot be empty" },
          len: {
            args: [2, 100],
            msg: "Full name must be between 2-100 characters",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: { msg: "Username already taken" },
        validate: {
          notNull: { msg: "Phone number is required" },
          notEmpty: { msg: "Phone number cannot be empty" },
          len: {
            args: [2, 20],
            msg: "Phone number must be between 2-20 characters",
          },
        },
      },
      gender: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserProfile",
    },
  );
  return UserProfile;
};
