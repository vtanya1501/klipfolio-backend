const Sequelize = require("sequelize");
require("dotenv").config();
var parse = require("pg-connection-string").parse;

const connectionString = process.env.DATABASE_URL;

const parsedConnectionString = parse(connectionString);

module.exports = new Sequelize(
	parsedConnectionString.database,
	parsedConnectionString.user,
	parsedConnectionString.password,
	{
		host: parsedConnectionString.host,
		dialect: "postgres",
		operatorAliases: false,

		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);
