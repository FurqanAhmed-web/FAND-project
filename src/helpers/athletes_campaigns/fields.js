import types from '../fieldTypes.json';

// Fields
const getCampaignAthleteFields = ({ athletes, campaigns }) => {
	let fields = [
		{
			name: 'athlete_id',
			label: 'Athletes',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: athletes.map((e) => ({ id: e.id, type: e.full_name }))
		},
		{
			name: 'campaign_id',
			label: 'Campaigns',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: campaigns
				.filter((e) => e.name)
				.map((e) => ({ id: e.id, type: e.name }))
				.sort((a, b) => a.type.localeCompare(b.type))
		},
		{
			name: 'athlete_compensation',
			label: 'Athlete Compensation',
			type: types.NUMBER_INPUT,
			value: null,
			error: ''
		},
		{
			name: 'date_agreement_signed',
			label: 'Date Agreement Signed',
			type: types.DATE,
			value: null,
			error: ''
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'terms_accepted', label: 'Terms Accepted', value: false },
				{
					name: 'is_agreement_signed',
					label: 'Agreement Signed',
					value: false
				}
			]
		}
	];

	return fields;
};

export { getCampaignAthleteFields };
