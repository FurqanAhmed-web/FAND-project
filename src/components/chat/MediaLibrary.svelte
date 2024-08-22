<script>
	export let mediaItems = [];

	let media = null;

	const handleCopy = (url, name) => () => {
		const textArea = document.createElement('textarea');
		textArea.value = url;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
		media = {
			url,
			name
		};
	};
</script>

<aside
	class="overflow-y-auto custom-scroll flex flex-col gap-7 w-[21.5%] px-8 py-8 border-l-[1px] border-gray-4"
>
	<div class="flex flex-col gap-2 items-center">
		<span class="text-[14px] 2xl:text-[18px] font-semibold leading-normal">Media Library</span>
		<span class="w-full border-b-[2px] 2xl:border-b-[3px] border-black" />
	</div>
	<div class="flex flex-col gap-8">
		{#each mediaItems as media, i}
			{#if media.type === 'image'}
				<!--
				<div class="relative overflow-hidden rounded-lg">
					<img
						class="object-cover object-top w-full min-h-[284px]"
						src={media.media_url}
						alt="media sample"
					/>
					<div class="absolute bottom-6 left-5 w-fit mx-auto w-fit flex flex-col gap-2">
						<span class="text-[14px] leading-4 font-semibold text-white">{media.name}</span>
						<div
							id="content-buttons"
							class="flex flex-row gap-4 text-black text-[10px] leading-[10px] font-semibold"
						>
							<button
								on:click={handleCopy(media.media_url, media.name)}
								class="p-2 bg-white w-[80px] min-h-[26px] rounded-md"
								>Copy Link
							</button>
						</div>
					</div>
				</div>
        -->
				<div class="flex flex-col gap-2">
					<span class="text-[12px] 2xl:text-[16px] font-medium leading-4"
						>{media.name.replace(/\.[^/.]+$/, '')}</span
					>
					<img
						class="object-cover object-top w-full min-h-[176px]"
						src={media.media_url}
						alt="media sample"
					/>
					<button
						on:click={handleCopy(media.media_url, media.name)}
						class="flex items-center justify-center text-[10px] 2xl:text-[12px] font-semibold leading-normal rounded-[6px] bg-yellow px-3 py-0.5 w-fit"
						><span class="h-fit w-fit">Copy Link</span>
					</button>
				</div>
			{:else if media.type === 'audio'}
				<div
					class="rounded-[5px] overflow-hidden flex flex-col h-full shrink-0 w-full min-h-[112px] max-h-[112px]"
				>
					<div class="pl-2 flex flex-row gap-2 items-center bg-black">
						<button class="w-full max-w-[36px] max-h-[36px]"
							><img
								class="w-full h-full"
								src="/images/icons/play-button-2.svg"
								alt="play button"
							/></button
						>
						<div class="flex flex-col gap-1 text-yellow w-full items-left overflow-hidden">
							<span
								class="text-[12px] 2xl:text-[14px] leading-[14px] 2xl:text-[16px] font-semibold whitespace-nowrap"
								>{media.name}</span
							>
							<span
								class="text-[10px] 2xl:text-[12px] leading-[14px] 2xl:leading-[16px] font-normal"
								>{media.published || ''}</span
							>
						</div>
						<img
							class="w-[61px] h-[64px] object-top object-cover"
							src="/images/icons/audio-2.svg"
							alt="audio"
						/>
					</div>
					<div
						class="pl-5 pt-2 pb-3 flex flex-row items-center justify-center gap-4 bg-yellow text-[10px] leading-normal font-semibold"
					>
						<button
							on:click={handleCopy(media.media_url, media.name)}
							class="mr-auto px-2 rounded-md w-full max-w-[80px] h-[28px] bg-white"
						>
							Copy Link
						</button>
					</div>
				</div>
			{:else}
				<div
					class="rounded-[5px] overflow-hidden flex flex-col h-full shrink-0 w-full min-h-[112px] max-h-[112px]"
				>
					<div class="pl-5 flex flex-row gap-2 items-center bg-black min-h-[63px] max-h-[63px]">
						<div class="flex flex-col gap-1 text-yellow w-full items-left overflow-hidden">
							<span
								class="text-[12px] 2xl:text-[14px] leading-[14px] 2xl:text-[16px] font-semibold whitespace-nowrap"
								>{media.name}</span
							>
							<span
								class="text-[10px] 2xl:text-[12px] leading-[14px] 2xl:leading-[16px] font-normal"
								>{media.published || ''}</span
							>
						</div>
					</div>
					<div
						class="pl-5 pt-2 pb-3 flex flex-row items-center justify-center gap-4 bg-yellow text-[10px] leading-normal font-semibold"
					>
						<button
							on:click={handleCopy(media.media_url, media.name)}
							class="mr-auto px-2 rounded-md w-full max-w-[80px] h-[28px] bg-white"
						>
							Copy Link
						</button>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</aside>

{#if media && media?.url}
	<div
		id="copy-link-container"
		class="absolute top-0 left-0 bottom-0 right-0 m-auto bg-[#333] overflow-hidden rounded-[16px] w-full h-fit max-w-[366px]"
	>
		<div class="flex flex-col gap-4 p-6">
			<div class="flex flex-row justify-between items-center text-white font-semibold leading-5">
				<div class="flex flex-row gap-2 items-center">
					<img class="max-w-5 max-h-5" src="/images/icons/check-green.svg" alt="check" />
					<span>Link to ‘{media.name}’ copied</span>
				</div>
				<button on:click={() => (media = null)} class="max-w-5 max-h-5"
					><img src="/images/icons/close-white.svg" alt="close" /></button
				>
			</div>
			<div class="flex flex-row gap-3">
				<input
					class="text-[14px] leading-6 w-full py-3 px-4 max-h-[44px] rounded-lg"
					type="text"
					value={media.url}
					readonly
				/>
				<button
					on:click={() => (media = null)}
					class="max-h-[44px] h-11 w-full max-w-[80px] rounded-md text-[12px] font-bold text-black bg-white"
					>Copy</button
				>
			</div>
		</div>
	</div>
{/if}
