import { curry, equals } from 'ramda';
import types from './types.json';

const populateDBToFields = curry((fields = [], dbData) => {
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
		} else {
			return {
				...e,
				value: dbData[e.name]
			};
		}
	});
});

export default populateDBToFields;
