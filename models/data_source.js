"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class data_source extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			data_source.belongsTo(models.service);
			data_source.hasMany(models.metric, {});
		}
	}
	data_source.init(
		{
			name: DataTypes.STRING,
			featured: DataTypes.BOOLEAN,
			serviceId: {
				type: DataTypes.INTEGER,
				references: {
					model: "service",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "data_source",
		}
	);
	return data_source;
};
