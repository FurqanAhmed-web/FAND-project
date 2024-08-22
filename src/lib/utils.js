import CryptoJS from 'crypto-js';
import {
	campaign_types,
	class_levels,
	clothing_sizes,
	genders,
	message_types,
	shoe_sizes,
	media_types
} from './data';
import { both, equals, hasPath, isNotNil } from 'ramda';
import { toastError, toastErrorText, toastSuccess, toastSuccessText } from './store';
import { goto } from '$app/navigation';

const asyncTryCatchToast = async (asyncFn, { message, redirect }) => {
	try {
		await asyncFn();

		if (message) {
			toastSuccess.set(true);
			toastSuccessText.set(message);
		}

		if (redirect) {
			goto(redirect);
		}
	} catch (error) {
		console.log(error);
		toastError.set(true);
		toastErrorText.set('Server Error');
	}
};

function formatNumber(number) {
	if (typeof number == 'number' && number >= 1000) {
		const suffixes = ['', 'k', 'M', 'B', 'T'];
		const suffixIndex = Math.floor(Math.log10(number) / 3);
		const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);
		return shortNumber + suffixes[suffixIndex];
	}
	return number?.toString() || 0;
}

const getHashOfImage = (file) => {
	const hash = CryptoJS.SHA256(file).toString();
	return hash;
};

function createFileTypeMap(data) {
	const fileTypeMap = {};

	// Iterate over the array of objects
	data.forEach((item) => {
		const { id, type } = item;
		fileTypeMap[type] = id;
	});

	return fileTypeMap;
}

function getMediaTypeIdFromFile(file) {
	// Define a map of file extensions to type IDs
	const fileTypeMap = createFileTypeMap(media_types);

	// Get the file name and extract its extension
	const fileName = file.name;
	const fileExtension = fileName?.split('.').pop().toLowerCase();

	// Check if the extension exists in the map
	if (fileTypeMap.hasOwnProperty(fileExtension)) {
		return fileTypeMap[fileExtension];
	} else {
		// Return a default type ID or handle unsupported types as needed
		return -1; // You can choose another value or behavior for unsupported types
	}
}

const isAuthenticated = (session) => {
	if (both(isNotNil, hasPath(['user', 'aud']))(session)) {
		return session.user.aud === 'authenticated';
	}

	return false;
};

let getType = (id, collections) => {
	if (id && Array.isArray(collections)) {
		const doc = collections.find((e) => equals(id, e.id));
		if (doc) {
			return doc?.type || doc?.name;
		}
	}
	return 'N/A';
};

function sortByUTCDate(a, b) {
	const dateA = new Date(a.created_at);
	const dateB = new Date(b.created_at);

	// Compare the dates
	if (dateA < dateB) return -1;
	if (dateA > dateB) return 1;
	return 0;
}

const getFormattedAthletes = (athletes) => {
	return athletes.map((e) => {
		return {
			...e,
			instagram_follower_count: formatNumber(e?.instagram_follower_count),
			clothing_top: getType(e?.clothing_top, clothing_sizes),
			clothing_bottom: getType(e?.clothing_bottom, clothing_sizes),
			clothing_shoe_size: getType(e?.clothing_shoe_size, shoe_sizes),
			clothing_gender: getType(e?.clothing_gender, genders),
			class: getType(e?.class, class_levels)
		};
	});
};

const timeFormatter = {
	chat: new Intl.DateTimeFormat('default', {
		weekday: 'short',
		hour: 'numeric',
		minute: 'numeric',
		month: 'short',
		day: 'numeric',
		hour12: true
	}),
	default: new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		weekday: 'short'
	})
};

const formatDate = (date) => {
	if (date) {
		return new Intl.DateTimeFormat('en-US', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			weekday: 'short'
		}).format(new Date(date));
	}
	return '';
};

const formatChatDate = (date) => {
	if (date) {
		return new Intl.DateTimeFormat('default', {
			weekday: 'short',
			hour: 'numeric',
			minute: 'numeric',
			month: 'short',
			day: 'numeric',
			hour12: true
		}).format(new Date(date));
	}
	return '';
};

const isAthleteMsgType = (id) => {
	if (id) {
		const e = message_types.find((e) => e.id == id);
		if (e) {
			return e.type == 'Athlete';
		}
	}
	return false;
};

const isCampaignManagerMsgType = (id) => {
	if (id) {
		const e = message_types.find((e) => e.id == id);
		if (e) {
			return e.type == 'Campaign-Manager';
		}
	}
	return false;
};

export {
	formatNumber,
	getHashOfImage,
	isAuthenticated,
	getFormattedAthletes,
	sortByUTCDate,
	timeFormatter,
	isAthleteMsgType,
	isCampaignManagerMsgType,
	asyncTryCatchToast,
	formatDate,
	formatChatDate,
	getType,
	getMediaTypeIdFromFile
};
