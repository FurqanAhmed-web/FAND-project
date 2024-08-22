<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import AttachmentOptions from '../attachmentOptions.svelte';
	import BubbleAnimation from '../bubbleAnimation.svelte';
	import {
		getFormattedAthletes,
		isAthleteMsgType,
		isCampaignManagerMsgType,
		sortByUTCDate,
		timeFormatter
	} from '$lib/utils';

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

	const dispatch = createEventDispatcher();

	export let athlete;

	export let sending = false;

	export let files = [];

	export let messages = [];

	let athletes = getContext('athletes');

	let message;

	let chatTextArea;

	const getFormattedMessages = (id, arr) => {
		arr = arr
			.filter((e) => e.athlete_id == id)
			.map((e) => {
				return {
					...e,
					message_text: (e.message_text || '').replaceAll('+', ' '),
					athlete: {
						...($athletes.find((x) => x.id == e.athlete_id) || {})
					}
				};
			})
			.sort(sortByUTCDate);
		return arr;
	};

	const autosize = () => {
		setTimeout(function () {
			chatTextArea.style.cssText = 'height:0px';
			var height = Math.min(20 * 5, chatTextArea.scrollHeight);
			chatTextArea.style.cssText = 'height:' + height + 'px';
		}, 0);
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

	async function downloadImage(imageUrl) {
		const link = document.createElement('a');
		link.href = imageUrl;
		link.download = 'downloaded_image.jpg'; // Specify the filename for the downloaded image
		link.target = '_blank';
		link.click();
	}

	const removeUpload = (i) => {
		files.splice(i, 1);
		files = [...files];
	};
</script>

<div
	id="chat-window"
	class="flex flex-col-reverse flex-1 items-end w-full overflow-y-auto h-full custom-scroll"
>
	<div class="flex flex-col gap-7 py-9 pl-8 pr-12 w-full">
		<!-- <div class="max-w-[460px] flex flex-row gap-3">
			<span class="relative h-fit w-fit">
				<img class="w-[48px] h-[48px] rounded-full" src="/images/masai-russell.png" alt="avatar" />
				<img class="absolute bottom-0 right-0" src="/images/icons/online-indicator.svg" alt="" />
			</span>
			<div class="flex flex-col gap-4 w-[90%]">
				<div class="flex flex-row gap-2">
					<span class="text-md font-semibold leading-[16px] text-gray-11">Masai Russell</span>
					<small class="text-[12px] font-regular leading-[16px] text-gray-12">Friday 2:22pm</small>
				</div>
				<p
					class="w-fit text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-gray-10"
				>
					I’m ready!
				</p>
			</div>
		</div> -->

		<!-- <div class="flex flex-row gap-4 w-full">
			<div class="flex items-center justify-center relative bg-yellow w-12 h-12 rounded-full">
				<img class="w-7 h-[5px]" src="/images/fand-avatar-2.png" alt="avatar" />
				<img
					class="absolute bottom-0 right-0"
					src="/images/icons/online-indicator.svg"
					alt="indicator"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<div class="flex flex-row gap-2 items-center">
					<span class="font-semibold text-gray-11 leading-4">Insight Manager</span>
					<div
						class="flex flex-row items-center gap-1 py-1 px-2 bg-yellow rounded-[6px] text-[8px] font-bold leading-[8px]"
					>
						<img class="w-3 h-3" src="/images/icons/check-3.svg" alt="verified" />BOT
					</div>
					<div class="text-[12px] leading-4 text-gray-12">Friday 2:22pm</div>
				</div>
				<div
					class="rounded-b-[8px] bg-gray-10 rounded-r-[8px] p-4 text-gray-13 w-fit max-w-[428px]"
				>
					<span>Hi Imani, how may I help you?</span>
				</div>
			</div>
		</div> -->

		<!-- <div class="max-w-[460px] flex flex-row gap-3">
			<span class="relative h-fit w-fit">
				<img class="w-[48px] h-[48px] rounded-full" src="/images/masai-russell.png" alt="avatar" />
				<img class="absolute bottom-0 right-0" src="/images/icons/online-indicator.svg" alt="" />
			</span>
			<div class="flex flex-col gap-4 w-[90%]">
				<div class="flex flex-row gap-2">
					<span class="text-md font-semibold leading-[16px] text-gray-11">Masai Russell</span>
					<small class="text-[12px] font-regular leading-[16px] text-gray-12">Friday 2:22pm</small>
				</div>
				<p
					class="w-fit text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-gray-10"
				>
					Talk to Ms. Imani please
				</p>
			</div>
		</div>
		 -->
		<!-- <div class="flex flex-row gap-4 w-full">
			<div class="flex items-center justify-center relative bg-yellow w-12 h-12 rounded-full">
				<img class="w-7 h-[5px]" src="/images/fand-avatar-2.png" alt="avatar" />
				<img
					class="absolute bottom-0 right-0"
					src="/images/icons/online-indicator.svg"
					alt="indicator"
				/>
			</div>
			<div class="flex flex-col gap-3">
				<div class="flex flex-row gap-2 items-center">
					<span class="font-semibold text-gray-11 leading-4">Insight Manager</span>
					<div
						class="flex flex-row items-center gap-1 py-1 px-2 bg-yellow rounded-[6px] text-[8px] font-bold leading-[8px]"
					>
						<img class="w-3 h-3" src="/images/icons/check-3.svg" alt="verified" />BOT
					</div>
					<div class="text-[12px] leading-4 text-gray-12">Friday 2:22pm</div>
				</div>
				<div
					class="rounded-b-[8px] bg-gray-10 rounded-r-[8px] p-4 text-gray-13 w-fit max-w-[428px]"
				>
					<span>Directing you to Ms. Imani Davis..</span>
				</div>
			</div>
		</div> -->

		<!-- <div class="flex flex-row items-center gap-2">
			<span class="border-b-[1px] border-gray-15 w-full" />
			<span class="text-gray-14 text-[12px] leading-[16px] font-regular">TODAY</span>
			<span class="border-b-[1px] border-gray-15 w-full" />
		</div> -->

		<!-- <div class="max-w-[460px] flex flex-col gap-3 w-fit ml-auto">
			<div class="flex flex-row gap-2">
				<span class="text-md font-semibold leading-[16px] text-gray-11">You</span>
				<small class="text-[12px] font-regular leading-[16px] text-gray-12">Friday 2:23pm</small>
			</div>
			<p
				class="text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-yellow w-fit"
			>
				Excellent. Did you receive the hoodie to wear in your Instagram post?
			</p>
		</div> -->

		<!-- <div class="max-w-[460px] flex flex-row gap-3">
			<span class="relative h-fit w-fit">
				<img class="w-[48px] h-[48px] rounded-full" src="/images/masai-russell.png" alt="avatar" />
				<img class="absolute bottom-0 right-0" src="/images/icons/online-indicator.svg" alt="" />
			</span>
			<div class="flex flex-col gap-4 w-[90%]">
				<div class="flex flex-row gap-2">
					<span class="text-md font-semibold leading-[16px] text-gray-11">Masai Russell</span>
					<small class="text-[12px] font-regular leading-[16px] text-gray-12">Friday 2:22pm</small>
				</div>
				<p
					class="w-fit text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-gray-10"
				>
					Hi Imani, yes I recevied the hoodies! :)
				</p>
			</div>
		</div> -->

		<!-- <div class="max-w-[460px] flex flex-row gap-3">
			<span class="relative w-fit h-fit">
				<img class="w-[48px] h-[48px] rounded-full" src="/images/masai-russell.png" alt="avatar" />
				<img class="absolute bottom-0 right-0" src="/images/icons/online-indicator.svg" alt="" />
			</span>
			<div class="flex flex-col gap-4 w-[90%]">
				<div class="flex flex-row gap-2">
					<span class="text-md font-semibold leading-[16px] text-gray-11">Masai Russell</span>
					<small class="text-[12px] font-regular leading-[16px] text-gray-12">Friday 2:22pm</small>
				</div>
				<img class="w-[212px] h-[212px]" src="/images/sent-pic.jpg" alt="" />
				<p
					class="w-fit text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-gray-10"
				>
					Wanted to check before I do them all. Does this look good?
				</p>
			</div>
		</div> -->

		<!-- <div class="max-w-[460px] flex flex-col gap-3 w-fit ml-auto">
			<div class="flex flex-row gap-2">
				<span class="text-md font-semibold leading-[16px] text-gray-11">You</span>
				<small class="text-[12px] font-regular leading-[16px] text-gray-12">Friday 2:20pm</small>
			</div>
			<p
				class="text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-yellow w-fit"
			>
				Great! The signing instructions are in the box that shipped with the hoodies.
			</p>
		</div> -->
		{#each getFormattedMessages(athlete?.id, messages) as e (e.id)}
			{#if isAthleteMsgType(e.sender_is)}
				<div class="max-w-[460px] flex flex-row gap-3">
					<span class="relative h-fit w-fit">
						<img
							class="w-[48px] h-[48px] rounded-full"
							src="/images/masai-russell.png"
							alt="avatar"
						/>
						<img
							class="absolute bottom-0 right-0"
							src={`/images/icons/${e.athlete.isactive ? 'online' : 'offline'}-indicator.svg`}
							alt=""
						/>
					</span>
					<div class="flex flex-col gap-4 w-[90%]">
						<div class="flex flex-row gap-2">
							<span class="text-md font-semibold leading-[16px] text-gray-11"
								>{e.athlete.full_name}</span
							>
							<small class="text-[12px] font-regular leading-[16px] text-gray-12"
								>{timeFormatter.chat.format(new Date(e.created_at))}</small
							>
						</div>
						<div class="flex flex-col gap-3">
							<p
								class="w-fit text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-gray-10"
							>
								{decodeURIComponent(e.message_text)}
							</p>

							<!-- <button
								type="button"
								class="border-[1px] border-gray-16 w-[90%] rounded-xl overflow-hidden min-w-[316px] max-w-[316px]"
							>
								<div class="flex flex-row items-center gap-2 p-4">
									<div class="bg-gray-3 w-10 h-10 flex items-center justify-center rounded-full">
										<img class="w-6 h-6" src="/images/icons/file-3.svg" alt="uploaded file" />
									</div>
									<div class="flex flex-col text-[16px] font-semibold leading-5">
										<span>imani-stats.pdf</span>
										<div class="flex flex-row items-center gap-2 text-gray-21">
											<span>2.1 MB</span>
											<img class="w-5 h-5" src="/images/icons/download.svg" alt="download" />
										</div>
									</div>
								</div>
							</button> -->
						</div>
					</div>
				</div>
			{:else if isCampaignManagerMsgType(e.sender_is)}
				<div class="max-w-[460px] flex flex-col gap-3 w-fit ml-auto">
					<div class="flex flex-row gap-2">
						<span class="text-md font-semibold leading-[16px] text-gray-11">You</span>
						<small class="text-[12px] font-regular leading-[16px] text-gray-12"
							>{timeFormatter.chat.format(new Date(e.created_at))}</small
						>
					</div>
					<div class="flex flex-col gap-3 w-full">
						<p
							class="text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-yellow w-fit"
						>
							{decodeURIComponent(e.message_text)}
						</p>
						{#if e.media_url}
							<button
								type="button"
								class="border-[1px] border-gray-16 w-[90%] rounded-xl overflow-hidden min-w-[316px] max-w-[316px]"
							>
								<div class="flex flex-row items-center gap-2 p-4">
									<div class="bg-gray-3 w-10 h-10 flex items-center justify-center rounded-full">
										{#if isImage(e.media_url)}
											<img
												class="w-6 h-6"
												src={decodeURIComponent(e.media_url)}
												alt="uploaded file"
											/>
										{:else if isPDF(e.media_url)}
											<img class="w-6 h-6" src="/images/icons/file-2.svg" alt="uploaded file" />
										{:else if isAudio(e.media_url)}
											<img class="w-6 h-6" src="/images/icons/audio-2.svg" alt="uploaded file" />
										{/if}
									</div>
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<div
										on:click={() => downloadImage(decodeURIComponent(e.media_url))}
										class="flex flex-col text-[16px] font-semibold leading-5"
									>
										<span>{e.file_name || 'File'}</span>
										<div class="flex flex-row items-center gap-2 text-gray-21">
											<span>{formatFileSize(e.file_size) || ''}</span>
											<img class="w-5 h-5" src="/images/icons/download.svg" alt="download" />
										</div>
									</div>
								</div>
							</button>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
		{#if sending}
			<BubbleAnimation />
		{/if}
		<!-- <div class="max-w-[460px] flex flex-row gap-3">
						<span class="relative w-fit h-fit">
							<img
								class="w-[48px] h-[48px] rounded-full"
								src="/images/masai-russell.png"
								alt="avatar"
							/>
							<img
								class="absolute bottom-0 right-0"
								src="/images/icons/online-indicator.svg"
								alt=""
							/>
						</span>
						<div class="flex flex-col gap-4 w-[90%]">
							<div class="flex flex-row gap-2">
								<span class="text-md font-semibold leading-[16px] text-gray-11">Masai Russell</span>
								<small class="text-[12px] font-regular leading-[16px] text-gray-12"
									>Friday 2:22pm</small
								>
							</div>
							<img class="w-[212px] h-[212px]" src="/images/sent-pic.jpg" alt="" />
							<p
								class="w-fit text-gray-13 text-md font-regular leading-sm py-1 px-4 rounded-tr-lg rounded-b-lg bg-gray-10"
							>
								Thank you, Imani!
							</p>
						</div>
					</div> -->
	</div>
</div>
<footer class="flex flex-row gap-4 items-end border-t-[1px] border-gray-15 w-full p-6">
	<AttachmentOptions bind:files />
	<!--
          <input
            class="flex flex-grow rounded-lg border-[1px] border-gray-2 px-4 h-[35px] text-md leading-sm font-regular font-medium"
            type="text"
            on:keydown={(e) => {
              if (e.key == 'Enter') {
                handleSendMessage(e);
              }
            }}
            bind:value={message}
            placeholder="Send a message"
          />
        -->
	<div class="flex flex-col gap-1 w-full border-[1px] border-gray-2 py-2 px-3 rounded-lg">
		<textarea
			bind:this={chatTextArea}
			on:keydown={(e) => {
				if (e.key !== 'Enter') {
					autosize();
				}

				if (e.key == 'Enter') {
					chatTextArea.style.height = '24px';
					dispatch('send', {
						message,
						onComplete: () => {
							message = '';
							files = [];
						}
					});
				}
			}}
			class="w-full text-black p-0 m-0 border-0 outline-0 resize-none custom-scroll"
			placeholder="Send a message"
			bind:value={message}
			rows="1"
		/>
		{#if files.length !== 0}
			<div class="flex flex-row flex-wrap gap-2 overflow-auto max-h-[168px] custom-scroll">
				{#each files as file, i}
					<div class="border-[1px] border-gray-16 rounded-xl p-6 w-full max-w-[416px]">
						<div class="flex flex-row justify-between items-start">
							<div class="flex flex-row gap-2 items-center">
								<div class="flex items-center justify-center w-14 h-14 bg-gray-3 rounded-full">
									<img src="/images/icons/file-3.svg" alt="file attachment" />
								</div>
								<div class="flex flex-col gap-1 text-[16px]">
									<span class="font-semibold">{file.name}</span>
									<span class="font-medium text-gray-21">{formatFileSize(file.size)}</span>
								</div>
							</div>
							<button on:click={() => removeUpload(i)}
								><img src="/images/icons/remove-2.svg" alt="remove" /></button
							>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="flex items-end min-w-[40px] pb-0.5">
		<button
			disabled={!message || sending}
			on:click|preventDefault={() => {
				dispatch('send', {
					message,
					onComplete: () => {
						message = '';
						files = [];
					}
				});
			}}
			class="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow"
			><img class="h-5 w-5" src="/images/icons/send-message.svg" alt="send a message" /></button
		>
	</div>
</footer>
