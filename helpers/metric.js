const { DateTime } = require("luxon");

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomDataGenerator() {
	let randomData = [];

	for (let i = 6; i >= 0; i--) {
		const date = DateTime.now().minus({ days: i }).toFormat("dd-LL-yyyy");
		const value = randomIntFromInterval(0, 500);
		randomData.push({
			date,
			value,
		});
	}

	return randomData;
}

module.exports = { randomDataGenerator };
