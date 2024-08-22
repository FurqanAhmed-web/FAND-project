import types from '../fieldTypes.json';
import { shoe_sizes, genders, clothing_sizes, school_levels } from '../../lib/data';
// Fields
const getAthleteFields = () => {
	let fields = [
		{
			name: 'full_name',
			label: 'Full Name',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'email',
			label: 'Email',
			type: types.EMAIL_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'mobile_number',
			label: 'Mobile Number',
			type: types.TEXT_INPUT,
			value: null,
			error: ''
		},
		{
			name: 'instagram_username',
			label: 'Instagram Username',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'instagram_follower_count',
			label: 'Instagram Follower Count',
			type: types.NUMBER_INPUT,
			value: null,
			error: ''
		},
		{
			name: 'hometown',
			label: 'Hometown',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'university',
			label: 'University',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},
		{
			name: 'conference',
			label: 'Conference',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		},

		{
			name: 'class',
			label: 'School Level',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: school_levels
		},
		{
			name: 'clothing_gender',
			label: 'Clothing Gender',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: genders
		},
		{
			name: 'clothing_top',
			label: 'Clothing Top',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: clothing_sizes
		},
		{
			name: 'clothing_bottom',
			label: 'Clothing Bottom',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: clothing_sizes
		},
		{
			name: 'clothing_shoe_size',
			label: 'Clothing Shoe Size',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: shoe_sizes
		},
		{
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'isactive', label: 'Active', value: false },
				{
					name: 'isoptedin',
					label: 'Opted in',
					value: false
				},
				{ name: 'isgenerativeai', label: 'Generative AI', value: false }
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

export { getAthleteFields };
