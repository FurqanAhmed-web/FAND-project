import { allPass, complement, either, equals, isEmpty, isNil, join, prop, pipe } from 'ramda';
import types from './types.json';

function dateToUTCString({ year, month, day }) {
	// Create a Date object using the provided year, month, and day
	const utcDate = new Date(Date.UTC(year, month - 1, day)); // Note: Months are 0-indexed in JavaScript

	// Generate the UTC string in the ISO format (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ")
	const utcString = utcDate.toISOString();

	return utcString;
}

const isNilOrEmpty = either(isNil, isEmpty);

const isValidDate = allPass([
	pipe(prop('day'), complement(isNilOrEmpty)),
	pipe(prop('month'), complement(isNilOrEmpty)),
	pipe(prop('year'), complement(isNilOrEmpty))
]);

export default (fields) => {
	console.log(fields);
	let error = '';
	let data = {};
	// Format data to database format
	fields = fields.map((e) => {
		const { name, value, type } = e;
		if (equals(type, types.DATE_RANGE)) {
			if (isValidDate(e.dates.start.value) && isValidDate(e.dates.start.value)) {
				data[e.dates.start.name] = dateToUTCString(e.dates.start.value);
				data[e.dates.end.name] = dateToUTCString(e.dates.start.value);
			} else {
				e.error = 'not_exist';
			}
		} else if (equals(type, types.CHECK_BOXES)) {
			e.checkboxes.forEach(({ name, value }) => {
				data[name] = value;
			});
		} else if (equals(type, types.HASHTAGS)) {
			if (e.value.length > 0) {
				data[name] = join(',')(e.value);
			} else {
				error = 'You must fill in all of the fields.';
				e.error = 'not_exist';
			}
		} else {
			if (value) {
				data[name] = value;
			} else {
				error = 'You must fill in all of the fields.';
				e.error = 'not_exist';
			}
		}

		return e;
	});

	return {
		data,
		error,
		fields
	};
};
