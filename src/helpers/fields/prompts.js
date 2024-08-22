import types from './types.json';
import { equals } from 'ramda';

// Fields
const getPromptFields = ({ editable, data }) => {
	let fields = [
		{ name: 'prompt_text', 
      label: 'Text', 
      type: types.TEXT_INPUT, 
      value: '', 
      error: '' 
    },
		{ name: 'goal', 
      label: 'Goal', 
      type: types.TEXT_INPUT, 
      value: '', 
      error: '' 
    },
    {
			type: types.CHECK_BOXES,
			checkboxes: [
				{ name: 'isactive', label: 'Active', value: false },
			]
		},
	];

	if (editable && data) {
		fields = fields.map((e) => {
      if (equals(e.type, types.CHECK_BOXES)) {
				return {
					...e,
					checkboxes: e.checkboxes.map((x) => ({
						...x,
						value: data[x.name]
					}))
				};
			} else{
        return {
          ...e,
          value: data[e.name]
        };
      }
		});
	}

	return fields;
};

export { getPromptFields };
