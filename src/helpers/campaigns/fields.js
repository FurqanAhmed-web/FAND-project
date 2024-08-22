import types from '../../helpers/fieldTypes.json';
import { campaign_types } from '../../lib/data';
const getCampaignFields = ({ organizations, platforms }) => {
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
			options: campaign_types
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
				start: {
					name: 'start_date',
					label: 'Start Date',
					value: { day: null, month: null, year: null }
				},
				end: { name: 'end_date', label: 'End Date', value: { day: null, month: null, year: null } }
			},
			error: ''
		}
	];

	return fields;
};

export { getCampaignFields };
