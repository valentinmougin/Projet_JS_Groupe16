const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class ADMIN extends Model {}

ADMIN.init(
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

ADMIN.addHook("beforeCreate", async (ADMIN) => {
  ADMIN.password = await bcrypt.hash(ADMIN.password, await bcrypt.genSalt());
});
ADMIN.addHook("beforeUpdate", async (ADMIN, { fields }) => {
  if (fields.includes("password")) {
    ADMIN.password = await bcrypt.hash(ADMIN.password, await bcrypt.genSalt());
  }
});

module.exports = ADMIN;