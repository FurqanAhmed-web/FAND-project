import { equals } from 'ramda';
import types from './types.json';

// Fields
const getCampaignFields = ({ organizations, campaignTypes, platforms, editable, data }) => {
	let fields = [
		{
			name: 'name',
			label: 'Name',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'organization_id',
			label: 'Organization',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: organizations
		},
		{
			name: 'type',
			label: 'Type',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: campaignTypes
		},
		{
			name: 'platform',
			label: 'Platform',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: platforms
		},
		{
			name: 'industry',
			label: 'Industry',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{ name: 'description', label: 'Description', type: types.TEXT_AREA, value: '', error: '' },
		{ name: 'objectives', label: 'Objectives', type: types.TEXT_AREA, value: '', error: '' },
		{ name: 'deliverables', label: 'Deliverables', type: types.TEXT_AREA, value: '', error: '' },
		{ name: 'key_messages', label: 'Key Messages', type: types.TEXT_AREA, value: '', error: '' },
		{ name: 'do_these_things', label: `Do's`, type: types.TEXT_AREA, value: '', error: '' },
		{
			name: 'do_not_do_these_things',
			label: `Don'ts`,
			type: types.TEXT_AREA,
			value: '',
			error: ''
		},
		{ name: 'hashtags', label: 'Hashtags', type: types.HASHTAGS, value: [], error: '' },
		{
			name: 'per_athlete_compensation',
			label: 'Athlete Compensation',
			type: types.NUMBER_INPUT,
			value: null,
			error: ''
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'isactive', label: 'Active', value: false },
				{
					name: 'hasphysicalproduct',
					label: 'Physical Product',
					value: false
				},
				{ name: 'isgenerativeai', label: 'Generative AI', value: false }
			]
		},
		{
			type: types.DATE_RANGE,
			dates: {
				start: { name: 'start_date', label: 'Start Date', value: { day: '', month: '', year: '' } },
				end: { name: 'end_date', label: 'End Date', value: { day: '', month: '', year: '' } }
			},
			error: ''
		}
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

export { getCampaignFields };
