import { PUBLIC_FUNCTION_URL } from '$env/static/public';

// const sendMessage = ({
// 	fromNumber,
// 	toNumber,
// 	message,
// 	mediaURL = '',
// 	fileSize = 0,
// 	fileName = ''
// }) =>
// 	fetch(PUBLIC_FUNCTION_URL, {
// 		method: 'POST',
// 		body: JSON.stringify({ fromNumber, toNumber, message, mediaURL, fileSize, fileName })
// 	});

const sendMessage = ({ fromNumber, toNumber, message, mediaURL = '', fileSize, fileName }) =>
	fetch(`${PUBLIC_FUNCTION_URL}/send-sms`, {
		method: 'POST',
		body: JSON.stringify({ fromNumber, toNumber, message, mediaURL, fileSize, fileName })
	});

const setupMessageChannel = (supabase, callback) => {
	const channel = supabase
		.channel('message-changes')
		.on(
			'postgres_changes',
			{
				event: 'INSERT',
				schema: 'public',
				table: 'messages'
			},
			callback
		)
		.subscribe();
	return () => channel.unsubscribe();
};

export { sendMessage, setupMessageChannel };
