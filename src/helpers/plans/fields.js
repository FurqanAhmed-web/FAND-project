import types from '../../helpers/fieldTypes.json';

const getPlanFields = () => {
	let fields = [
		{
			name: 'type',
			label: 'Type',
			type: types.TEXT_INPUT,
			value: '',
			error: ''
		}
	];
	return fields;
};

export { getPlanFields };
