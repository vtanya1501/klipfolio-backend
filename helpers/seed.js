const {
	service: serviceModel,
	metric: metricModel,
	data_source: sourceModel,
} = require("../models");

const seedData = {
	services: [
		{
			name: "Facebook",
			iconUrl: "mdi-facebook",
			dataSources: [
				{
					name: "Followers",
					metrics: [
						{
							name: "Growth",
							chart: "line",
						},
						{
							name: "Retention Rate",
							chart: "line",
						},
					],
				},
				{
					name: "Sales",
					metrics: [
						{
							name: "Revenue",
							chart: "line",
						},
						{
							name: "Profit Margin",
							chart: "line",
						},
						{
							name: "Profit",
							chart: "line",
						},
					],
				},
			],
		},
		{
			name: "Dropbox",
			iconUrl: "mdi-dropbox",
			dataSources: [
				{
					name: "Files",
					metrics: [
						{
							name: "File Changes",
							chart: "line",
						},
						{
							name: "Usage",
							chart: "line",
						},
					],
				},
			],
		},
		{
			name: "Slack",
			iconUrl: "mdi-slack",
			dataSources: [
				{
					name: "Messages",
					metrics: [
						{
							name: "Number of Messages",
							chart: "line",
						},
						{
							name: "Usage",
							chart: "line",
						},
					],
				},
			],
		},
		{
			name: "Google",
			iconUrl: "mdi-google",
			dataSources: [
				{
					name: "Links",
					metrics: [
						{
							name: "Click Through Rate",
							chart: "line",
						},
						{
							name: "Open Rate",
							chart: "line",
						},
					],
				},
			],
		},
	],
};

const PROBABILITY_RATE = 0.3;

async function init() {
	for (const service of seedData.services) {
		const createdService = await serviceModel.create({
			name: service.name,
			iconUrl: service.iconUrl,
		});

		for (const dataSource of service.dataSources) {
			const createdDataSource = await sourceModel.create({
				name: dataSource.name,
				featured: true,
				serviceId: createdService.id,
			});

			for (const metric of dataSource.metrics) {
				await metricModel.create({
					name: metric.name,
					chart: metric.chart,
					featured: Math.random() < PROBABILITY_RATE,
					dataSourceId: createdDataSource.id,
				});
			}
		}
	}
}

init();
