import populateDBToFields from './populateDBToFields';
import types from './types.json';

// Fields
const getAthleteFields = ({ shoeSizes, genders, clothingSizes, classLevels, editable, data }) => {
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
			type: types.NUMBER_INPUT,
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
			options: classLevels
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
			options: clothingSizes
		},
		{
			name: 'clothing_bottom',
			label: 'Clothing Bottom',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: clothingSizes
		},
		{
			name: 'clothing_shoe_size',
			label: 'Clothing Shoe Size',
			type: types.DROPDOWN,
			value: '',
			error: '',
			options: shoeSizes
		},
		{
			name: 'profile_image_guid',
			label: 'Upload Profile Image',
			type: types.FILE,
			value: '',
			error: ''
		}
	];

	if (editable && data) {
		fields = populateDBToFields(fields, data);
	}

	return fields;
};

export { getAthleteFields };
