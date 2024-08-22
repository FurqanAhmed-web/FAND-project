<script>
	import MediaNav from './mediaNav.svelte';
	import Pagination from '../pagination.svelte';
	import { paginateData } from '$lib/paginate';
	import { getContext, onMount } from 'svelte';
	import { MediaService } from '$lib/supabase';
	import { asyncTryCatchToast } from '$lib/utils';
	import SearchFilter from '../searchFilter.svelte';
	import { media_types } from '../../lib/data';
	import { page } from '$app/stores';

	export let data;
	export let activeTypes;

	let media = getContext('media');
	let mediaService;
	let users = getContext('users');

	let editedMediaName = '';

	let editNameContainer, tagContainer, copyLinkContainer, deleteContainer;

	let value;

	const itemsPerPage = 10;
	let currentPage = 1;

	let totalItems;
	let totalPages;
	let displayedData;

	let videoElement = {};
	let videoStatus = {};

	const playVideo = (hash) => {
		if (videoElement[hash]) {
			videoStatus[hash] = 1;
			videoElement[hash].play();
		}
	};

	const getAddURL = () => {
		let currentPageRoute = window.location.pathname;
		return currentPageRoute.replace('browse', 'add');
	};

	const pauseVideo = (hash) => {
		videoStatus[hash] = 0;
	};

	// Helper function to get public URL for an asset in a public bucket
	const getPublicAssetUrl = (path) => {
		const url = data.supabase.storage.from('media').getPublicUrl(path);
		return url.data;
	};

	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			displayedData = paginateData(media, currentPage, itemsPerPage);
		}
	};

	//handle name change
	const handleEditName = (index) => {
		if (tagContainer != index && copyLinkContainer != index && deleteContainer != index) {
			editNameContainer = index;
		}
	};
	const hideEditName = (prevName) => {
		editNameContainer = -1;
		editedMediaName = prevName;
	};
	const confirmEditName = (newName, id) => {
		if (newName.length !== 0) {
			let editableMedia = $media.find((e) => e.id === id);
			editableMedia.friendly_name = newName;
			delete editableMedia.id;

			asyncTryCatchToast(
				async () => {
					await mediaService.update(id, { ...editableMedia, updated_at: new Date().toISOString() });
					media.set(await mediaService.get());
					editNameContainer = -1;
				},
				{
					message: 'Media Name Updated Successfully'
				}
			);
		}
	};

	function copyToClipboard() {
		const linkInput = document.getElementById('mediaLinkInput');
		linkInput.select();
		document.execCommand('copy');
	}

	//handle copy link
	const handleCopyLink = (index) => {
		if (tagContainer != index && editNameContainer != index && deleteContainer != index) {
			copyLinkContainer = index;
		}
	};
	const hideCopyLink = () => {
		copyLinkContainer = -1;
	};

	//handle delete
	const handleDelete = (index) => {
		if (tagContainer != index && copyLinkContainer != index && editNameContainer != index) {
			deleteContainer = index;
		}
	};
	const hideDelete = () => {
		deleteContainer = -1;
	};
	const confirmDelete = (id) => {
		asyncTryCatchToast(
			async () => {
				await mediaService.delete(id);
				media.set(await mediaService.get());
			},
			{
				message: 'Media Deleted'
			}
		);
	};

	//remove tag
	const removeTag = (id, tagIndex) => {
		let mediaIndex = $media.findIndex((i) => i.id === id);

		if (mediaIndex !== -1) {
			let updatedTags = $media[mediaIndex].tags.split(' ');

			if (tagIndex >= 0 && tagIndex < updatedTags.length && updatedTags.length > 1) {
				updatedTags.splice(tagIndex, 1);

				$media[mediaIndex].tags = updatedTags.join(' ');
				media.set([...$media]);
			}
		}
	};

	//handle tag
	const handleTag = (index) => {
		if (editNameContainer != index && copyLinkContainer != index && deleteContainer != index) {
			tagContainer = index;
		}
	};
	const saveTag = (id) => {
		tagContainer = -1;

		let editableMedia = $media.find((e) => e.id === id);
		delete editableMedia.id;

		asyncTryCatchToast(
			async () => {
				await mediaService.update(id, { ...editableMedia, updated_at: new Date().toISOString() });
				media.set(await mediaService.get());
				tagContainer = -1;
			},
			{
				message: 'Media Tags Updated Successfully'
			}
		);
	};
	const cancelTag = async () => {
		tagContainer = -1;
		media.set(await mediaService.get());
	};

	const handleTagInput = (id) => (e) => {
		let mediaTags = $media.find((i) => i.id === id);
		let updatedTags = mediaTags.tags.split(' ');

		if (e.key === ' ' || e.key === 'Enter') {
			let inputValue = e.target.value.trim();
			if (inputValue !== '') {
				updatedTags.push(inputValue);
				mediaTags.tags = updatedTags.join(' ');
				media.set($media.map((e) => (e.id === id ? mediaTags : e)));
				value = '';
			}
		}
	};

	const handleTagInputBlur = (id) => (e) => {
		let mediaTags = $media.find((e) => e.id === id);
		let updatedTags = mediaTags.tags.split(' ');

		if (value && value.trim() !== '') {
			updatedTags.push(e.target.value.trim());
			mediaTags.tags = updatedTags.join(' ');
			media.set($media.map((e) => (e.id === id ? mediaTags : e)));
			value = '';
		}
	};

	const getType = (id) => {
		if (id) {
			const el = media_types?.find((e) => e.id == id);
			if (el) {
				return el.name || el.type;
			}
			return '';
		}
		return '';
	};

	const formatMedia = (arr) => {
		return arr
			.map((e) => {
				const user = $users.find((user) => user.id === e.user_id);
				return {
					...e,
					type: getType(e.type),
					tags: e.tags.split(' '),
					user_id: user ? user.first_name : null,
					src: getPublicAssetUrl(e.original_filename).publicUrl
				};
			})
			.sort((a, b) => b.id - a.id);
	};

	const setPaginatedData = () => {
		totalItems = $media.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);
		let filteredMedia = formatMedia($media).filter(
			(m) => activeTypes.some((a) => a === m.type) || activeTypes.length === 0
		);
		displayedData = paginateData(filteredMedia, currentPage, itemsPerPage);
	};

	const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			const filteredMedia = await mediaService.get();
			$media = filteredMedia.filter((mediaItem) => {
				const friendlyName = mediaItem.friendly_name.toLowerCase();
				const searchTerm = keyword.toLowerCase();
				return friendlyName.includes(searchTerm);
			});
		} else {
			$media = await mediaService.get();
		}
	};

	$: {
		if ($media) {
			setPaginatedData();
		}
	}

	onMount(async () => {
		mediaService = new MediaService(data.supabase);
	});
</script>

<div class="relative mx-auto max-w-[1440px]">
	<div id="container" class="flex flex-col gap-10 px-10">
		<div class="flex flex-col gap-10 py-10 bg-white sticky top-0 z-20">
			<div class="w-full flex flex-row justify-between items-center">
				<span class="text-[36px] font-bold leading-8">Media Library</span>
				<a
					href={getAddURL()}
					class="text-[13px] font-semibold rounded-md flex flex-row gap-0 items-center justify-center w-full max-w-[88px] h-10 bg-yellow"
				>
					<img src="/images/icons/plus-black.svg" alt="plus" />
					<span class="mt-0.5">Add</span>
				</a>
			</div>
			<div class="flex flex-col gap-9">
				<MediaNav />
				<div class="flex flex-row gap-10 justify-between items-center">
					<!--
            <input 
              class="py-3 max-h-[44px] w-full px-4 rounded-lg border-[1px] border-gray-2" 
              type="text" placeholder="Search"
            >
          -->
					<SearchFilter on:search={handleSearch} placeholder="Search Media" />
					<button
						class="flex flex-row gap-0.5 justify-center items-center text-[13px] leading-normal font-semibold bg-yellow rounded-md w-full max-w-[88px] py-2 h-10"
					>
						<img src="/images/icons/search-black.svg" alt="Search" />
						<span>Search</span>
					</button>
				</div>
			</div>
		</div>
		<div class="flex flex-col mt-1 gap-11">
			<div id="content-container" class="grid grid-cols-3 gap-8">
				{#each displayedData as media, index}
					<div
						id={index}
						class="relative flex flex-col relative w-full h-auto rounded-md bg-yellow min-h-[408px] max-h-[408px] overflow-hidden"
					>
						<div class="relative px-1 pt-1 max-h-[278px] w-full">
							{#if media.src}
								<div class="flex justify-center items-center w-full min-h-[278px] bg-white">
									{#if media.type === 'mp3'}
										<img
											class="h-[78px] max-h-[78px] max-w-[78px] w-full"
											src="/images/audio.svg"
											alt="sample media"
										/>
									{:else if media.type === 'mp4'}
										<video
											bind:this={videoElement[media.id]}
											width="100%"
											height="auto"
											controls
											on:ended={pauseVideo(media.id)}
											on:pause={pauseVideo(media.id)}
											on:play={playVideo(media.id)}
										>
											<source src={media.src} type="video/mp4" />
										</video>
									{:else if media.type === 'png' || media.type === 'jpg'}
										<img
											class="h-[278px] max-h-[278px] object-cover object-center w-full"
											src={media.src}
											alt="sample media"
										/>
									{:else}
										<img
											class="h-[78px] max-h-[78px] max-w-[78px] w-full"
											src="/images/document.svg"
											alt="sample media"
										/>
									{/if}
								</div>
							{:else}
								<div class="flex justify-center items-center w-full min-h-[278px] bg-white">
									{#if media.type === 'mp3'}
										<img
											class="h-[78px] max-h-[78px] max-w-[78px] w-full"
											src="/images/audio.svg"
											alt="sample media"
										/>
									{:else if media.type === 'mp4'}
										<img
											class="h-[78px] max-h-[78px] max-w-[78px] w-full"
											src="/images/icons/video-2.svg"
											alt="sample media"
										/>
									{:else if media.type === 'png' || media.type === 'jpg'}
										<img
											class="h-[78px] max-h-[78px] max-w-[78px] w-full"
											src="/images/icons/image-2.svg"
											alt="sample media"
										/>
									{:else}
										<img
											class="h-[78px] max-h-[78px] max-w-[78px] w-full"
											src="/images/document.svg"
											alt="sample media"
										/>
									{/if}
								</div>
							{/if}
							{#if media.type === 'mp3' || media.type === 'mp4'}
								{#if videoStatus[media.id] != 1}
									<button
										class="absolute top-0 right-0 bottom-0 left-0 m-auto w-fit h-fit"
										on:click={playVideo(media.id)}
										><img src="/images/icons/play-button-4.svg" alt="play button" /></button
									>
								{/if}
							{/if}
						</div>
						<div class="flex flex-col p-4 justify-between h-full">
							<div class="flex flex-row justify-between">
								<div class="flex flex-row gap-4 items-center">
									{#if media.type === 'png' || media.type === 'jpg'}
										<img class="w-6" src="/images/icons/image-2.svg" alt="icon" />
									{:else if media.type === 'mp3'}
										<img class="w-6" src="/images/icons/audio-2.svg" alt="icon" />
									{:else if media.type === 'pdf' || media.type === 'txt'}
										<img class="w-6" src="/images/icons/file-2.svg" alt="icon" />
									{:else if media.type === 'mp4'}
										<img class="w-6" src="/images/icons/video-2.svg" alt="icon" />
									{/if}
									<span class="text-black font-medium">{media.friendly_name}</span>
									<button on:click={() => handleEditName(index)}
										><img class="max-w-[16px]" src="/images/icons/edit-3.svg" alt="edit" /></button
									>
								</div>
								<button on:click={() => handleCopyLink(index)}
									><img class="" src="/images/icons/copy.svg" alt="copy" /></button
								>
							</div>
							<div class="text-[12px] text-gray font-medium">
								<span class="font-semibold">Published by:</span>
								{media.user_id}
							</div>
							<div class="flex flex-row justify-between items-center">
								<div class="flex flex-row gap-4 items-center max-w-[262px] overflow-hidden">
									<div
										class="flex flex-row gap-2 text-[12px] text-[#333] font-medium overflow-hidden"
									>
										{#each media.tags as tag, i}
											{#if i >= media.tags.length - 3}
												<div
													class="flex flex-row gap-2 py-1 px-2 items-center bg-white rounded-[30px] max-w-[102px]"
												>
													<span class="max-w-[66px] truncate">
														{tag}
													</span>
												</div>
											{/if}
										{/each}
									</div>
									<button on:click={() => handleTag(index)}
										><img src="/images/icons/plus-gray-2.svg" alt="plus" /></button
									>
								</div>
								<button on:click={() => handleDelete(index)} class="w-[18px] h-5"
									><img src="/images/icons/delete-gray.svg" alt="delete" /></button
								>
							</div>
						</div>

						{#if tagContainer === index}
							<div
								id="tag-container"
								class="absolute top-0 left-0 bottom-0 right-0 m-auto bg-[#333] overflow-hidden rounded-[16px] w-full h-fit max-w-[276px]"
							>
								<div class="flex flex-col gap-4 p-6 pb-7">
									<span class="text-white font-semibold">Tags</span>
									<div class="relative">
										<input
											bind:value
											on:keydown={handleTagInput(media.id)}
											on:blur={handleTagInputBlur(media.id)}
											type="text"
											name="tag"
											id="tag"
											class="w-full h-[44px] py-[10px] pl-12 pr-[14px] rounded-lg"
											placeholder="Add a tag..."
										/>
										<img
											class="top-0 bottom-0 left-4 m-auto absolute"
											src="/images/icons/tag.svg"
											alt="tags"
										/>
									</div>
									<div
										class="flex flex-row flex-wrap gap-1 gap-y-2 items-center text-[#333] text-[10px] font-medium w-full"
									>
										{#each media.tags as tag, i}
											<div
												class="flex flex-row items-center gap-2 px-2 py-[6px] bg-white rounded-[16px] max-h-[24px] max-w-[228px]"
											>
												<span class="max-w-[186px] truncate">
													{tag}
												</span>
												<button on:click={() => removeTag(media.id, i)}>
													<img class="w-[10px]" src="/images/icons/remove.svg" alt="remove" />
												</button>
											</div>
										{/each}
									</div>
									<div
										class="flex flex-row justify-center w-full gap-4 text-black text-[14px] font-semibold"
									>
										<button
											on:click={() => cancelTag()}
											class="bg-white py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]"
										>
											Cancel
										</button>
										<button
											on:click={saveTag(media.id)}
											class="bg-yellow py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]"
										>
											Save
										</button>
									</div>
								</div>
							</div>
						{:else if copyLinkContainer === index}
							<div
								id="copy-link-container"
								class="absolute top-0 left-0 bottom-0 right-0 m-auto bg-[#333] overflow-hidden rounded-[16px] w-full h-auto max-w-[366px] max-h-[120px]"
							>
								<div class="flex flex-col gap-4 p-6">
									<div
										class="flex flex-row justify-between items-center text-white font-semibold leading-5"
									>
										<div class="flex flex-row gap-2 items-center">
											<img
												class="max-w-5 max-h-5"
												src="/images/icons/check-green.svg"
												alt="check"
											/>
											<span>Copy Media Link</span>
										</div>
										<button on:click={hideCopyLink} class="max-w-5 max-h-5"
											><img src="/images/icons/close-white.svg" alt="close" /></button
										>
									</div>
									<div class="flex flex-row gap-3">
										<input
											id="mediaLinkInput"
											class="text-[14px] leading-6 w-full py-3 px-4 max-h-[44px] rounded-lg"
											type="text"
											value={media.src}
											readonly
										/>
										<button
											class="max-h-[44px] h-11 w-full max-w-[80px] rounded-md text-[12px] font-bold text-black bg-white"
											on:click={copyToClipboard}>Copy</button
										>
									</div>
								</div>
							</div>
						{:else if editNameContainer === index}
							<div
								id="edit-name-container"
								class="absolute top-0 left-0 bottom-0 right-0 m-auto bg-[#333] overflow-hidden rounded-[16px] w-full h-auto max-w-[276px] max-h-[232px]"
							>
								<div class="flex flex-col gap-4 p-6 pb-7">
									<span class="text-white font-semibold">Edit Name</span>
									<input
										type="text"
										name="name"
										id={editedMediaName}
										class="w-full h-[44px] py-[10px] px-4 rounded-lg"
										placeholder="Enter here"
										on:input={(e) => (editedMediaName = e.target.value)}
										value={media.friendly_name}
									/>
									<span class="text-[12px] text-white font-semibold"
										>Please confirm to save changes</span
									>
									<div
										class="flex flex-row justify-center w-full gap-4 text-black text-[14px] font-semibold"
									>
										<button
											on:click={hideEditName(media.friendly_name)}
											class="bg-white py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]"
											>Cancel</button
										>
										<button
											on:click={confirmEditName(editedMediaName, media.id)}
											class="bg-yellow py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]"
											>Save
										</button>
									</div>
								</div>
							</div>
						{:else if deleteContainer === index}
							<div
								id="delete-container"
								class="border-[2px] border-black absolute top-0 left-0 bottom-0 right-0 m-auto bg-[#333] overflow-hidden rounded-[16px] w-full h-fit max-w-[286px]"
							>
								<div class="flex flex-col gap-4 p-4 text-white font-semibold">
									<span>Delete</span>
									<span class="text-[12px] whitespace-nowrap"
										>Are you sure you want to delete this image?</span
									>
									<div
										class="w-full flex flex-row justify-end items-center gap-2 text-[10px] text-black"
									>
										<button
											on:click={hideDelete}
											class="bg-white flex items-center justify-center rounded-lg w-full max-w-[50px] max-h-[24px] h-6"
										>
											Cancel
										</button>
										<button
											on:click={confirmDelete(media.id)}
											class="bg-yellow flex items-center justify-center rounded-lg w-full max-w-[40px] max-h-[24px] h-6"
										>
											OK
										</button>
									</div>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="sticky bottom-0 w-full bg-white">
		<Pagination {currentPage} {totalPages} {goToPage} />
	</div>
</div>
