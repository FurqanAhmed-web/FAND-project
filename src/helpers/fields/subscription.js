import types from './types.json';

// Fields
const getSubscriptionFields = ({ editable, data }) => {
	let fields = [
		{ name: 'type', label: 'Type', type: types.TEXT_INPUT, value: '', error: '' },
	];

	if (editable && data) {
		fields = fields.map((e) => {
      return {
        ...e,
        value: data[e.name]
      };
		});
	}

	return fields;
};

export { getSubscriptionFields };
