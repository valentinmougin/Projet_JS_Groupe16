const Sequelize = require("sequelize");

const DATABASE = "mysql://root:root@localhost:3306/test_user"

const connection = new Sequelize(
  DATABASE
);

connection.authenticate().then(() => {
  console.log("Connection has been established.");
});

module.exports = connection;