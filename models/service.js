"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class service extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			service.hasMany(models.data_source, {});
		}
	}
	service.init(
		{
			name: DataTypes.STRING,
			iconUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "service",
		}
	);
	return service;
};
