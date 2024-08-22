import types from '../fieldTypes.json';
import { plans } from '../../lib/data';
// Fields
const getOrganizationFields = ({ subscriptions = plans }) => {
	let fields = [
		{
			name: 'name',
			label: 'Name',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'mobile_number',
			label: 'Mobile Number',
			type: types.NUMBER_INPUT,
			value: null,
			error: ''
		},
		{
			name: 'description',
			label: 'Description',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'website',
			label: 'Website',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'plan',
			label: 'Plan',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: subscriptions
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'isactive', label: 'Active', value: false },
				{ name: 'ispaid', label: 'Paid', value: false }
			]
		},
		{
			name: 'profile_image_guid',
			label: 'Upload Profile Image',
			type: types.FILE,
			value: [],
			error: '',
			options: {
				multiple: false
			}
		}
	];

	return fields;
};

export { getOrganizationFields };
