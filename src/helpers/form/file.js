import { StorageService } from '../../lib/supabase';
import { includes, is } from 'ramda';
import { v4 as guid } from 'uuid';

const uploadFileFromFields = async ({ supabase, bucket, fields, setFields = null }) => {
	const storageService = new StorageService(supabase, bucket);
	let _name;
	let path;
	let _error;
	const fileFields = fields.filter((e) => e.type == 'file');

	const setFilesStatus = (name, status) => {
		setFields &&
			setFields(
				fields.map((e) => {
					if (e.name == name) {
						return {
							...e,
							value: e.value.map((f) => {
								f.status = status;
								return f;
							})
						};
					}
					return e;
				})
			);
	};

	const getImageGuid = (path) => {
		if (path && is(String)(path)) {
			const isSignedURL = includes('token')(path);
			const isPublicURL = includes('storage/v1/object/public')(path);
			let guid = path;
			if (isSignedURL) {
				guid = path.split('?token')[0].split('/').pop();
			} else if (isPublicURL) {
				guid = path.split('/').pop();
			}
			return guid;
		} else {
			return null;
		}
	};

	if (fileFields.length && fileFields.length > 0) {
		const { name, value } = fileFields[0];
		_name = name;
		if (Array.isArray(value) && value.length > 0) {
			console.log('<= URL =>');
			const image_guid = guid();
			try {
				setFilesStatus(name, 'uploading');
				path = await storageService.addFile(image_guid, value[0]);
				setFilesStatus(name, 'uploaded');
			} catch (error) {
				_error = error;
				setFilesStatus(name, 'error');
			}
		} else if (is(String)(value)) {
			console.log('<= GUID =>');
			path = getImageGuid(value);
		}
	}
	return {
		name: _name,
		path,
		error: _error
	};
};

export { uploadFileFromFields };
