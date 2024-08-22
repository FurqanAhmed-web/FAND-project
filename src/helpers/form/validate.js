import { allPass, complement, either, equals, isEmpty, isNil, pipe, prop } from 'ramda';
import types from '../fieldTypes.json';

const isNilOrEmpty = either(isNil, isEmpty);

const isValidDate = allPass([
	pipe(prop('day'), complement(isNilOrEmpty)),
	pipe(prop('month'), complement(isNilOrEmpty)),
	pipe(prop('year'), complement(isNilOrEmpty))
]);

const validate = (fields) => {
	let error = '';
	fields = fields.map((e) => {
		const { value, type } = e;
		if (equals(type, types.DATE_RANGE)) {
			if (!(isValidDate(e.dates.start.value) && isValidDate(e.dates.start.value))) {
				error = 'Select dates';
				e.error = 'not_exist';
			}
		} else if (equals(type, types.CHECK_BOXES)) {
			// TODO
		} else if (equals(type, types.HASHTAGS)) {
			if (!Array.isArray(value) || value?.length <= 0) {
				error = 'You must fill in all of the fields.';
				e.error = 'not_exist';
			}
			/*
      } else if (equals(type, types.FILE)) {
        if (!Array.isArray(value) || value?.length <= 0) {
          error = 'You must upload a file.';
          e.error = 'not_exist';
        }
    */
		} else {
			if (!value) {
				console.log(e, value, 'You must fill in all of the fields.');
				error = 'You must fill in all of the fields.';
				e.error = 'not_exist';
			}
		}

		return e;
	});

	return {
		error,
		fields
	};
};

export default validate;
