import types from '../fieldTypes.json';
import milestone_types from '../../lib/data/milestone_types.json';

const getCampaignMilestoneFields = ({ campaigns }) => {
	let fields = [
		{
			name: 'campaign_id',
			label: 'Campaign',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: campaigns
				.filter((e) => e.name)
				.map((e) => ({ id: e.id, type: e.name }))
				.sort((a, b) => a.type.localeCompare(b.type))
		},
		{
			name: 'milestone_type',
			label: 'Type',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: milestone_types
		},
		{
			name: 'description',
			label: 'Description',
			type: types.TEXT_AREA,
			value: '',
			error: ''
		},
		{
			name: 'target_date',
			label: 'Target Date',
			type: types.DATE,
			value: null,
			error: ''
		},
		{
			name: 'actual_date',
			label: 'Actual Date',
			type: types.DATE,
			value: null,
			error: ''
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [{ name: 'isgenerativeai', label: 'Generative AI', value: false }]
		}
	];

	return fields;
};

export { getCampaignMilestoneFields };
