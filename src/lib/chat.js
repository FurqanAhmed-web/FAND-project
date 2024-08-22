const imageTypes = '.jpg, .jpeg, .png, .gif, .bmp';
const audioTypes = '.mp3, .wav';
const pdfTypes = '.pdf';

const isImage = (url = '') => {
	const segments = url.split('.');
	const ext = segments[segments.length - 1];

	return imageTypes.includes(ext);
};

const isAudio = (url = '') => {
	const segments = url.split('.');
	const ext = segments[segments.length - 1];

	return audioTypes.includes(ext);
};

const isPDF = (url = '') => {
	const segments = url.split('.');
	const ext = segments[segments.length - 1];

	return pdfTypes.includes(ext);
};

const getTypeFromURL = (url) => {
	return isImage(url) ? 'image' : isAudio(url) ? 'audio' : isPDF(url) ? 'pdf' : '';
};

const formatFileSize = (size) => {
	if (!size) return null;

	if (size < 1024) {
		return size + ' B';
	} else if (size < 1024 * 1024) {
		return (size / 1024).toFixed(2) + ' KB';
	} else if (size < 1024 * 1024 * 1024) {
		return (size / (1024 * 1024)).toFixed(2) + ' MB';
	} else {
		return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
	}
};

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

export { isImage, isAudio, isPDF, getFileType, getTypeFromURL, formatFileSize };
