<script>
	import { SupabaseService, setupMessageChannel } from '$lib/supabase';
	import { getFormattedAthletes } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import AthletesMenu from '../../../components/athletesMenu.svelte';
	import Chat from '../../../components/chat/Chat.svelte';
	import MediaLibrary from '../../../components/chat/MediaLibrary.svelte';
	import Profile from '../../../components/chat/Profile.svelte';
	import { MediaService, sendMessage } from '$lib/supabase';
	import { getTypeFromURL } from '../../../lib/chat';
	import { timeFormatter } from '../../../lib/utils';

	export let data;

	let mediaService;

	let athletes = getContext('athletes');

	let athlete;
	let athleteLength;

	let messages = [];
	let mediaItems = [];
	let files = [];
	let sending = false;
	let datafetching = false;

	$: {
		mediaItems = messages
			.filter((e) => athlete?.id == e.athlete_id && e.media_url)
			.map((e) => ({
				media_url: e.media_url,
				type: getTypeFromURL(e.media_url),
				name: e.file_name,
				size: e.file_size,
				published: timeFormatter.chat.format(new Date(e.created_at))
			}));
	}

	// 14158001337

	const handleSendMessage = async ({ detail: { message, onComplete } }) => {
		try {
			sending = true;
			if (files.length > 0) {
				const file = files[0];
				const path = await mediaService.addUniqueFile(file);
				const url = mediaService.getPublicUrl(path, file.type);
				const response = await sendMessage({
					fromNumber: '+14158001337',
					toNumber: athlete.mobile_number,
					message,
					mediaURL: url,
					fileName: file.name,
					fileSize: file.size
				}).then((res) => res.json());

				console.log(response);
			} else {
				const response = await sendMessage({
					fromNumber: '+14158001337',
					toNumber: athlete.mobile_number,
					message
				}).then((res) => res.json());

				console.log(response);
			}
		} catch (error) {
			console.log(error);
		} finally {
			sending = false;
			onComplete();
		}
	};

	const handleAthleteSelect = ({ detail: { athlete } }) => {
		athlete = athlete;
	};

	onMount(async () => {
		mediaService = new MediaService(data.supabase, '/chat');
		const unsubscribe = setupMessageChannel(data.supabase, (e) => {
			if (e.new) {
				console.log('Adding to messages');
				messages = [...messages, e.new];
			}
		});
		try {
			const messageService = new SupabaseService(data.supabase, 'messages');
			messages = await messageService.get(50);
			datafetching = true;
			athlete = getFormattedAthletes([$athletes[0]])[0];
			datafetching = false;
		} catch (error) {
			console.log(error);
			datafetching = false;
		}
		return unsubscribe;
	});
</script>

<div class="w-full flex flex-row min-h-screen max-h-screen">
	<AthletesMenu bind:athlete bind:athleteLength on:select={handleAthleteSelect} />

	{#if !datafetching}
		<main class="flex flex-col w-[56%]">
			<Profile bind:athlete />
			<Chat bind:sending bind:files bind:athlete bind:messages on:send={handleSendMessage} />
		</main>

		<MediaLibrary bind:mediaItems />
	{:else}
		<div
			class="load absolute top-0 left-80 bottom-0 right-0 m-auto w-[100px] h-[100px] border-yellow border-tr-transparent border-[10px] rounded-full"
		/>
	{/if}
</div>
