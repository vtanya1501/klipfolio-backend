const express = require("express");
const router = express.Router();
const {
	service: serviceModel,
	data_source: sourceModel,
	metric: metricModel,
	Sequelize,
} = require("../models");

// all routes in here are starting with /service
router.get("/", async (req, res) => {
	const { data, _q } = req.query;

	try {
		const results = [];

		if (data.includes("services")) {
			const services = await serviceModel.findAll({
				where: {
					name: { [Sequelize.Op.iLike]: `%${_q}%` },
				},
			});

			for (const service of services) {
				results.push({
					id: service.id,
					name: service.name,
					type: "Service",
				});
			}
		}

		if (data.includes("data-sources")) {
			const dataSources = await sourceModel.findAll({
				where: {
					name: { [Sequelize.Op.iLike]: `%${_q}%` },
				},
			});

			for (const dataSource of dataSources) {
				results.push({
					id: dataSource.id,
					name: dataSource.name,
					type: "Data Source",
				});
			}
		}

		if (data.includes("metrics")) {
			const metrics = await metricModel.findAll({
				where: {
					name: { [Sequelize.Op.iLike]: `%${_q}%` },
				},
			});

			for (const metric of metrics) {
				results.push({
					id: metric.id,
					name: metric.name,
					type: "Metric",
				});
			}
		}

		res.send(results);
	} catch (e) {
		console.error("Error in fetching resources", e);
		res.status(500).send();
	}
});

module.exports = router;
