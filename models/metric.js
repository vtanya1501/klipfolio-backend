"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class metric extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			metric.belongsTo(models.data_source);
		}
	}
	metric.init(
		{
			name: DataTypes.STRING,
			chart: DataTypes.STRING,
			featured: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "metric",
		}
	);
	return metric;
};
