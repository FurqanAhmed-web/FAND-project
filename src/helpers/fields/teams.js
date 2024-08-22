import { equals } from 'ramda';
import types from './types.json';

// Fields
const getTeamFields = ({ organizations, roles, editable, data }) => {
	let fields = [
		{
			name: 'organization_id',
			label: 'Organization',
			type: types.DROPDOWN,
			value: '',
			error: '',
      options: organizations
		},
		{
			name: 'first_name',
			label: 'First Name',
			type: types.TEXT_INPUT,
			value: '',
			error: '',
		},
		{
			name: 'last_name',
			label: 'Last Name',
			type: types.TEXT_INPUT,
			value: '',
			error: '',
		},
		{
			name: 'email',
			label: 'Email',
			type: types.EMAIL_INPUT,
			value: '',
			error: '',
		},
		{
			name: 'mobile_number',
			label: 'Mobile Number',
			type: types.NUMBER_INPUT,
			value: '',
			error: '',
		},
		{
			name: 'role',
			label: 'Role',
			type: types.DROPDOWN,
			value: '',
			error: '',
      options: roles
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'isactive', label: 'Active', value: false }
			]
		},
	];

	if (editable && data) {
		console.log(data);
		fields = fields.map((e) => { 
      if (equals(e.type, types.CHECK_BOXES)) {
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

export { getTeamFields };
