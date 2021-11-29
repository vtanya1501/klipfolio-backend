const express = require("express");
const router = express.Router();
const { service, data_source: source } = require("../models");

const { getDataFromFile, getDataSource } = require("../helpers/data_source");

// all routes in here are starting with /service
router.get("/", async (req, res) => {
	try {
		const services = await service.findAll();

		res.send(services);
	} catch (e) {
		console.error("Error in fetching services", e);
		res.status(500).send();
	}
});

// all routes in here are starting with /service/2
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const serviceInfo = await service.findOne({ where: { id } });

		if (!serviceInfo) {
			res.status(404).send("Service Not Found");
		}

		res.send(serviceInfo);
	} catch (e) {
		console.error("Error in fetching service", e);
		res.status(500).send();
	}
});

router.get("/:id/data-sources", async (req, res) => {
	const { id } = req.params;
	try {
		const dataSources = await source.findAll({ where: { serviceId: id } });
		res.send(dataSources);
	} catch (e) {
		console.error("Error in finding data sources", e);
		res.status(500).send();
	}
});

router.get("/:id/data-sources/:dataSourceId", async (req, res) => {
	const { id, dataSourceId } = req.params;

	try {
		const dataSourceInfo = await getDataSource(dataSourceId, id);

		if (!dataSourceInfo) {
			res.status(404).send("Data Source Not Found");
		}

		res.send(dataSourceInfo);
	} catch (e) {
		console.error("Error in finding data source for a service", e);
		res.status(500).send();
	}
});

router.get("/:id/data-sources/:dataSourceId/data", async (req, res) => {
	const { id, dataSourceId } = req.params;

	try {
		const dataSourceInfo = await getDataSource(dataSourceId, id);

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
