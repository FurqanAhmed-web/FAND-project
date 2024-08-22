import { equals } from 'ramda';
import types from './types.json';

// Fields
const getMilestoneFields = ({ campaigns, milestoneTypes, editable, data }) => {
	let fields = [
    {
      name: 'campaign_id',
      label: 'Campaign',
      type: types.DROPDOWN,
      value: '',
      error: '',
      options: campaigns
    },
		{
			name: 'milestone_type',
			label: 'Milestone Type',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: milestoneTypes
		},
		{ name: 'description', label: 'Description', type: types.TEXT_AREA, value: '', error: '' },
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'isgenerativeai', label: 'Generative AI', value: false }
			]
		},
    {
			name: 'actual_date',
			label: 'Actual Date',
			type: types.DATE,
			value: '',
			error: '',
		},
    {
      name: 'target_date',
			label: 'Target Date',
			type: types.DATE,
			value: '',
			error: '',
    },
    {
      name: 'date',
			label: 'Date',
			type: types.DATE,
			value: '',
			error: '',
    },
	];

	if (editable && data) {
		fields = fields.map((e) => {
      if (equals(e.type, types.DATE_RANGE)) {
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

export { getMilestoneFields };
