const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Buyer extends Model {}

Buyer.init(
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

Buyer.addHook("beforeCreate", async (Buyer) => {
  Buyer.password = await bcrypt.hash(Buyer.password, await bcrypt.genSalt());
});
Buyer.addHook("beforeUpdate", async (Buyer, { fields }) => {
  if (fields.includes("password")) {
    Buyer.password = await bcrypt.hash(Buyer.password, await bcrypt.genSalt());
  }
});

module.exports = Buyer;