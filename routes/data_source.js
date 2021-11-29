const express = require("express");
const router = express.Router();
const { data_source: source } = require("../models");
const { getDataFromFile, getDataSource } = require("../helpers/data_source");

router.get("/", async (req, res) => {
	try {
		const dataSources = await source.findAll({
			...(req.query !== {} && { where: req.query }),
		});
		res.send(dataSources);
	} catch (e) {
		console.error("Error in finding data sources", e);
		res.status(500).send();
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const dataSourceInfo = await getDataSource(id);

		if (!dataSourceInfo) {
			res.status(404).send("Data Source Not Found");
		}

		res.send(dataSourceInfo);
	} catch (e) {
		console.error("Error in finding data source", e);
		res.status(500).send();
	}
});

router.get("/:id/data", async (req, res) => {
	const { id } = req.params;

	try {
		const dataSourceInfo = await getDataSource(id);

		if (!dataSourceInfo) {
			res.status(404).send("Data Source Not Found");
		}

		const fileName =
			`${dataSourceInfo.service.name}_${dataSourceInfo.name}`.toLowerCase();

		const fileData = getDataFromFile(fileName);

		res.send(fileData);
	} catch (e) {
		console.error("Error in getting data", e);
		res.send(500);
	}
});

module.exports = router;
