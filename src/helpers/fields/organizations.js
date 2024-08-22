import { equals } from 'ramda';
import types from './types.json';

// Fields
const getOrganizationFields = ({ plans, editable, data }) => {
	let fields = [
		{ name: 'name', label: 'Name of Organization', type: types.TEXT_INPUT, value: '', error: '' },
		{
			name: 'mobile_number',
			label: 'Mobile Number',
			type: types.NUMBER_INPUT,
			value: null,
			error: ''
		},
		{ name: 'description', label: 'Description', type: types.TEXT_AREA, value: '', error: '' },
		{ name: 'website', label: 'Website', type: types.TEXT_INPUT, value: '', error: '' },
		{
			name: 'plan',
			label: 'Plan',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: plans
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'isactive', label: 'Active', value: false },
				{
					name: 'ispaid',
					label: 'Paid',
					value: false
				}
			]
		},
    {
		 	name: 'profile_image_guid',
		  label: 'Upload Profile Image',
		 	type: types.FILE,
		 	value: '',
		  error: '',
		}
	];

	if (editable && data) {
		fields = fields.map((e) => {
			if (equals(e.type, types.HASHTAGS)) {
				return {
					...e,
					value:
						(data[e.name]?.includes(',') ? data[e.name].split(',') : data[e.name].split(' ')) || ''
				};
			} else if (equals(e.type, types.DATE_RANGE)) {
				const start_date = new Date(e.start_date);
				const start_value = {
					day: start_date.getDate(),
					month: start_date.getMonth() + 1,
					year: start_date.getFullYear()
				};

				const end_date = new Date(e.end_date);
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

export { getOrganizationFields };
