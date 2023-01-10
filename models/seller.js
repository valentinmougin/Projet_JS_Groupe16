const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Seller extends Model {}

Seller.init(
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

seller.addHook("beforeCreate", async (seller) => {
  seller.password = await bcrypt.hash(seller.password, await bcrypt.genSalt());
});
seller.addHook("beforeUpdate", async (seller, { fields }) => {
  if (fields.includes("password")) {
    seller.password = await bcrypt.hash(seller.password, await bcrypt.genSalt());
  }
});

module.exports = Seller;