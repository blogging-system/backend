import Series from "../Model/series.model";

export const createSeries_service = async (data) => {
	// (1) Create series
	const series = new Series({ ...data });

	// (2) Save series
	await series.save();

	// (3) Return series
	return series;
};
