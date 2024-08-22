import { curry, equals } from 'ramda';
import types from '../fieldTypes.json';

function convertDateFormat(inputDate) {
	// Create a Date object from the input string
	const date = new Date(inputDate);

	// Check if the input date is valid
	if (isNaN(date)) {
		return 'Invalid Date';
	}

	// Get the year, month, and day components
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
	const day = String(date.getDate()).padStart(2, '0');

	// Create the new formatted date string
	const formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}

function isDateFormat(dateString) {
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	return dateRegex.test(dateString);
}

function isDateTimeString(inputString) {
	const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
	return dateTimePattern.test(inputString);
}

const populateDBToFields = (fields = [], dbData) => {
	return fields.map((e) => {
		if (equals(e.type, types.HASHTAGS)) {
			return {
				...e,
				value:
					(dbData[e.name]?.includes(',') ? dbData[e.name].split(',') : dbData[e.name].split(' ')) ||
					''
			};
		} else if (equals(e.type, types.DATE_RANGE)) {
			const start_date = new Date(dbData.start_date);
			const start_value = {
				day: start_date.getDate(),
				month: start_date.getMonth() + 1,
				year: start_date.getFullYear()
			};

			const end_date = new Date(dbData.end_date);
			const end_value = {
				day: end_date.getDate(),
				month: end_date.getMonth() + 1,
				year: end_date.getFullYear()
			};

			return {
				...e,
				dates: {
					start: { ...e.dates.start, value: start_value },
					end: { ...e.dates.end, value: end_value }
				}
			};
		} else if (equals(e.type, types.CHECK_BOXES)) {
			return {
				...e,
				checkboxes: e.checkboxes.map((x) => ({
					...x,
					value: dbData[x.name]
				}))
			};
		} else if (equals(e.type, types.DATE)) {
			console.log('checking date format', dbData[e.name]);
			return {
				...e,
				value: isDateFormat(dbData[e.name])
					? dbData[e.name]
					: isDateTimeString(dbData[e.name])
					? convertDateFormat(dbData[e.name])
					: dbData[e.name]
			};
		} else if (equals(e.type, types.FILE)) {
			if (dbData[e.name]) {
				return {
					...e,
					value: dbData[e.name]
				};
			} else
				return {
					...e,
					value: []
				};
		} else {
			return {
				...e,
				value: dbData[e.name]
			};
		}
	});
};

export default populateDBToFields;
