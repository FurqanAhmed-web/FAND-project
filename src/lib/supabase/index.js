import { signInWithEmail, signOut } from './auth';
import { sendMessage, setupMessageChannel } from './chat';
import { getHashOfImage } from '../utils';

import SupabaseService from './supabaseService';
import StorageService from './storageService';
import MediaService from './mediaService';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

const getPublicBucketUrl = (path) => {
	return `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

const getAllRecords = async (supabase, name) => {
	try {
		const { data, error } = await supabase.from(name).select('*');
		if (error) {
			throw error;
		}
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getAthleteCampaigns = async (supabase, athlete_id) => {
	try {
		const { data, error } = await supabase
			.from('athletes_campaigns')
			.select(
				`
        athlete_id,
        campaign_id,
        campaigns (id, isactive, objectives)
      `
			)
			.filter('athlete_id', 'eq', athlete_id)
			.filter('campaigns.isactive', 'eq', true);
		if (error) {
			throw error;
		}
		return data
			.filter((e) => e.campaigns)
			.map((e) => e.campaigns.objectives)
			.join(', ');
	} catch (error) {
		console.error('Error fetching active campaigns:', error.message);
		return null;
	}
};

const uploadImageToSupabase = async (supabase, fileName, fileData) => {
	try {
		console.log('media/' + fileName.split('.')[1]);
		// const { data, error } = await supabase.storage
		//   .from("athletes")
		//   .upload(fileName, fileData, {
		//     upsert: true,
		//     contentType: "image/" + fileName.split(".")[1],
		//     cacheControl: "public",
		//   });

		const hash = getHashOfImage(fileData);

		console.log(hash.toString());

		const res = await supabase.storage.from('media/affan').upload(hash.toString(), fileData, {
			contentType: 'media/' + fileName.split('.')[1]
		});

		console.log('error ==== >', res.error);

		if (res.error) {
			if (res.error.statusCode == 409) {
				console.log('Duplicated File');
			}
			throw error;
		}

		return res;
	} catch (error) {
		console.error('Error uploading image:', error.message);
		return null;
	}
};

export {
	StorageService,
	SupabaseService,
	MediaService,
	signInWithEmail,
	signOut,
	getAllRecords,
	sendMessage,
	setupMessageChannel,
	uploadImageToSupabase,
	getPublicBucketUrl
};
