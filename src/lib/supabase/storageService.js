import CryptoJS from 'crypto-js';
import { equals, has, hasPath, pipe, prop } from 'ramda';
import { toastError, toastErrorText } from '../store';

const getHash = (file) => {
	const hash = CryptoJS.SHA256(file).toString();
	return hash;
};

class StorageService {
	#supabase;
	#bucket;
	#path;
	constructor(supabase, bucket, path = '/') {
		this.#supabase = supabase;
		this.#bucket = bucket;
		this.#path = path;
	}

	async addFile(name, file) {
		const { data, error } = await this.#supabase.storage.from(this.#bucket).upload(name, file);

		if (error) {
			if (error?.statusCode && error?.statusCode == 409) {
				// Duplicate File
				toastError.set(true);
				toastErrorText.set('Duplicate file not allowed');
			}

			throw error;
		}

		return data.path;
	}

	async deleteFile(hash) {
		const { data, error } = await this.#supabase.storage.from(this.#bucket).remove([hash]);

		console.log(hash, data, error);

		if (error) {
			throw error;
		}

		return data;
	}

	async createSignedURL(pathname) {
		const { data, error } = await this.#supabase.storage
			.from(this.#bucket)
			.createSignedUrl(pathname, 1440);

		return data?.signedUrl;
	}

	async createSignedURLs(pathnames) {
		const { data, error } = await this.#supabase.storage
			.from(this.#bucket)
			.createSignedUrls(pathnames, 1440);

		return data;
	}
}

export default StorageService;
