import { equals, join } from 'ramda';
import types from '../fieldTypes.json';

function dateToUTCString({ year, month, day }) {
	// Create a Date object using the provided year, month, and day
	const utcDate = new Date(Date.UTC(year, month - 1, day)); // Note: Months are 0-indexed in JavaScript

	// Generate the UTC string in the ISO format (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ")
	const utcString = utcDate.toISOString();

	return utcString;
}

const populateFieldsToDB = (fields) => {
	let data = {};

	fields.forEach((e) => {
		const { name, value, type } = e;
		if (equals(type, types.DATE_RANGE)) {
			data[e.dates.start.name] = dateToUTCString(e.dates.start.value);
			data[e.dates.end.name] = dateToUTCString(e.dates.end.value);
		} else if (equals(type, types.CHECK_BOXES)) {
			e.checkboxes.forEach(({ name, value }) => {
				data[name] = value;
			});
		} else if (equals(type, types.HASHTAGS)) {
			data[name] = join(',')(value);
		} else {
			data[name] = value;
		}
	});

	return data;
};

export default populateFieldsToDB;
