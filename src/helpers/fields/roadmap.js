import { equals } from 'ramda';
import types from './types.json';

// Fields
const getRoadmapFields = ({ status, editable, data }) => {
	let fields = [
		{
			name: 'title',
			label: 'Title',
			type: types.TEXT_INPUT,
			value: '',
			error: '',
		},
		{
			name: 'description',
			label: 'Description',
			type: types.TEXT_AREA,
			value: '',
			error: '',
		},
		{
			name: 'additional_notes',
			label: 'Additional Notes',
			type: types.TEXT_INPUT,
			value: '',
			error: '',
		},
		{
			name: 'status',
			label: 'Status',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: status
		},
		{
			name: 'tags',
			label: 'Tags',
			type: types.HASHTAGS,
			value: [],
			error: ''
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'ispublic', label: 'Public', value: false }
			]
		},
	];

	if (editable && data) {
		console.log(data);
		fields = fields.map((e) => {
			if (equals(e.type, types.HASHTAGS)) {
				return {
					...e,
					value:
						(data[e.name]?.includes(',') ? data[e.name].split(',') : data[e.name].split(' ')) || ''
				};
			} else if (equals(e.type, types.DATE_RANGE)) {
				const start_date = new Date(data.start_date);
				const start_value = {
					day: start_date.getDate(),
					month: start_date.getMonth() + 1,
					year: start_date.getFullYear()
				};

				const end_date = new Date(data.end_date);
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
						value: data[x.name]
					}))
				};
			} else {
				return {
					...e,
					value: data[e.name]
				};
			}
		});
	}

	return fields;
};

export { getRoadmapFields };
