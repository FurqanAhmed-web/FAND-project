import { toastError, toastErrorText } from '../store';
import SupabaseService from './supabaseService';
import { v4 as guid } from 'uuid';

const getFileType = (type) => {
	const mediaTypes = {
		image: [
			'image/jpeg',
			'image/png',
			'image/webp',
			'image/gif',
			'image/gif',
			'image/bmp',
			'image/x-icon',
			'image/x-icon'
		],
		audio: ['audio/aiff', 'audio/mpeg', 'audio/midi', 'audio/wave'],
		pdf: ['application/pdf']
	};

	if (mediaTypes.image.includes(type)) {
		return 'image';
	} else if (mediaTypes.audio.includes(type)) {
		return 'audio';
	} else if (mediaTypes.pdf.includes(type)) {
		return 'pdf';
	} else {
		return undefined;
	}
};

class MediaService extends SupabaseService {
	#supabase;
	#path;
	constructor(supabaseClient, path = '') {
		super(supabaseClient, 'media');
		this.#supabase = supabaseClient;
		this.#path = path;
	}

	async addFile(file) {
		const { data, error } = await this.#supabase.storage
			.from(`media${this.#path}`)
			.upload(file.name, file, {
				contentType: 'media'
			});

		if (error) {
			const { statusCode } = error;
			if (statusCode == 409) {
				// Duplicate File
				toastError.set(true);
				toastErrorText.set('Duplicate file not allowed');
			}
			throw error;
		}

		return data.path;
	}

	async addUniqueFile(file) {
		const fileType = getFileType(file.type);
		if (fileType) {
			const { data, error } = await this.#supabase.storage
				.from(`media${this.#path}/${fileType}`)
				.upload(guid() + '.' + file.name.split('.')[1], file, {
					contentType: 'media'
				});

			if (error) {
				const { statusCode } = error;
				if (statusCode == 409) {
					// Duplicate File
					toastError.set(true);
					toastErrorText.set('Duplicate file not allowed');
				}
				throw error;
			}

			return data.path;
		}

		throw 'Unknown file type';
	}

	async deleteFile(fileName) {
		const { data, error } = await this.#supabase.storage
			.from(`media${this.#path}`)
			.remove([fileName]);

		if (error) {
			throw error;
		}

		return data;
	}

	getPublicUrl(pathname, type = '') {
		if (type) {
			const fileType = getFileType(type);
			if (fileType) {
				const { data, error } = this.#supabase.storage
					.from(`media${this.#path}/${fileType}`)
					.getPublicUrl(pathname);

				if (error) {
					throw error;
				}

				return data.publicUrl;
			}

			throw 'Unknown file type';
		} else {
			const { data, error } = this.#supabase.storage
				.from(`media${this.#path}`)
				.getPublicUrl(pathname);

			if (error) {
				throw error;
			}

			return data.publicUrl;
		}
	}
}

export default MediaService;
