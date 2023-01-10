const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Visitor extends Model {}

visitor.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    prod_bought: DataTypes.STRING,
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
      defaultValue: "USER",
      validate: {
        isIn: ["USER", "ADMIN"],
      },
    },
  },
  {
    sequelize: connection,
  }
);

Visitor.addHook("beforeCreate", async (Visitor) => {
  Visitor.password = await bcrypt.hash(Visitor.password, await bcrypt.genSalt());
});
Visitor.addHook("beforeUpdate", async (Visitor, { fields }) => {
  if (fields.includes("password")) {
    Visitor.password = await bcrypt.hash(Visitor.password, await bcrypt.genSalt());
  }
});

module.exports = Buyer;
