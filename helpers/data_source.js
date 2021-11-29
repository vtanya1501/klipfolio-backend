const path = require("path");
const fs = require("fs");
const { data_source: source, service } = require("../models");

function getDataFromFile(fileName) {
	const csvData = fs.readFileSync(
		path.resolve(__dirname, `../csv/${fileName}.csv`),
		"utf-8"
	);

	const rows = csvData.split("\n");

	let returnData = {
		headers: [],
		data: [],
	};

	for (let i = 0; i < rows.length; i++) {
		const column = rows[i].split(",");
		if (i === 0) {
			returnData.headers = column;
		} else {
			returnData.data.push(column);
		}
	}

	return returnData;
}

async function getDataSource(dataSourceId, serviceId) {
	try {
		const dataSourceInfo = await source.findOne({
			include: [{ model: service }],
			where: { id: dataSourceId, ...(serviceId && { serviceId }) },
		});

		return dataSourceInfo;
	} catch (e) {
		console.error("Error in fetching data source", e);
		throw new Error(e);
	}
}

module.exports = { getDataFromFile, getDataSource };
