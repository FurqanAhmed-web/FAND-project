import types from '../fieldTypes.json';

// Fields
const getUserMediaFields = ({ organizations }) => {
	let fields = [
		{
			name: 'organization_id',
			label: 'Organizations',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: organizations
		},
		{
			name: 'original_filename',
			label: 'File Upload',
			type: types.FILE,
			value: [],
			error: '',
			options: {
				removable: false,
				multiple: false
			}
		},
		{
			name: 'friendly_name',
			label: 'Name',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'friendly_filename',
			label: 'File Name',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{ name: 'tags', label: 'Tags', type: types.HASHTAGS, value: [], error: '' },
		{
			type: types.CHECK_BOXES,
			checkboxes: [{ name: 'isactive', label: 'Active', value: false }]
		}
	];

	return fields;
};

export { getUserMediaFields };
