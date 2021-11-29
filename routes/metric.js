const express = require("express");
const router = express.Router();
const { metric: metricModel } = require("../models");
const { randomDataGenerator } = require("../helpers/metric");

router.get("/", async (req, res) => {
	try {
		const metrics = await metricModel.findAll({
			...(req.query !== {} && { where: req.query }),
		});
		res.send(metrics);
	} catch (e) {
		console.error("Error in finding metrics", e);
		res.status(500).send();
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const metricInfo = await metricModel.findOne({ where: { id } });

		if (!metricInfo) {
			res.status(404).send("Metric Not Found");
		}

		res.send(metricInfo);
	} catch (e) {
		console.error("Error in finding metric", e);
		res.status(500).send();
	}
});

router.get("/:id/data", async (req, res) => {
	const { id } = req.params;

	try {
		const metricInfo = await metricModel.findOne({ where: { id } });

		if (!metricInfo) {
			res.status(404).send("Metric Not Found");
		}

		res.send(randomDataGenerator());
	} catch (e) {
		console.error("Error in finding metric", e);
		res.status(500).send();
	}
});

module.exports = router;
