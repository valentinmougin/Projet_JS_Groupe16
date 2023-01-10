const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Admin extends Model {}

Admin.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    product: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ADMIN",
      validate: {
        isIn: ["USER", "ADMIN"],
      },
    },
  },
  {
    sequelize: connection,
  }
);

Admin.addHook("beforeCreate", async (Admin) => {
  Admin.password = await bcrypt.hash(Admin.password, await bcrypt.genSalt());
});
Admin.addHook("beforeUpdate", async (Admin, { fields }) => {
  if (fields.includes("password")) {
    Admin.password = await bcrypt.hash(Admin.password, await bcrypt.genSalt());
  }
});

module.exports = Admin;
