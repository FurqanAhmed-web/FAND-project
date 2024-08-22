<script>
	import { page } from '$app/stores';
	import { equals, includes, is, isEmpty } from 'ramda';
	import { v4 as uid } from 'uuid';

	let isDrag = false;

	const maxLimit = 6000000;

	export let files; // can be url, uuid or array
	export let label;
	export let error;
	export let options = {
		multiple: false,
		removable: false
	};

	const isPDF = includes('pdf');
	const isText = includes('text');
	const isAudio = includes('audio');
	const isVideo = includes('video');

	const isFileUploaded = includes('uploaded');
	const isFileUploading = includes('uploading');
	const isFileError = includes('error');

	const getFileTypeImage = (type) => {
		if (isPDF(type) || isText(type)) {
			return 'file.svg';
		} else if (isAudio(type)) {
			return 'audio.svg';
		} else if (isVideo(type)) {
			return 'video.svg';
		} else {
			return 'file.svg';
		}
	};

	//for upload/drag and drop
	const formatFileSize = (size) => {
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

	const handleSelectedFiles = (_files) => {
		for (const file of _files) {
			if (file.size > maxLimit) {
				error = 'exceed_max_limit';
			} else {
				file.id = uid();
				file.status = '';
				if (options.multiple) {
					files = [...files, file];
				} else {
					files = [file];
				}
			}
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		isDrag = true;
	};
	const handleDragLeave = () => {
		isDrag = false;
	};
	const handleDrop = (event) => {
		event.preventDefault();
		isDrag = false;
		handleSelectedFiles(event.dataTransfer.files);
	};
	const handleClick = async (event) => {
		event.preventDefault();
		isDrag = false;
		handleSelectedFiles(event.target.files);
	};

	const handleDelete = (id) => {
		files = files.filter((file) => file.id !== id);
	};

	const resetFile = () => {
		files = [];
	};

	$: {
		if (Array.isArray(files) && files?.length > 0) {
			error = '';
		}
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-col gap-3">
		<span class="text-[16px] font-bold leading-5 text-gray-11">{label}</span>
		<label
			for="file-drop"
			class="rounded-lg cursor-pointer flex flex-col items-center text-center justify-center gap-3 px-6 py-8 w-full border-[1px]
      {error == 'not_exist' ? 'border-error' : 'border-gray-2'}"
			on:dragover={handleDragOver}
			on:dragleave={handleDragLeave}
			on:drop={handleDrop}
		>
			<div
				class="flex items-center justify-center rounded-full w-full h-[40px] max-w-[40px] border-[6px] border-gray-20 bg-gray-4"
			>
				<img class="" src="/images/icons/upload.svg" alt="upload" />
			</div>
			<div class="flex flex-col gap-1 {error == 'not_exist' ? 'text-error' : 'text-gray-5'}">
				<div class="text-[16px] leading-5">
					<span class={error == 'not_exist' ? 'text-error font-normal' : 'text-black font-bold'}
						>Click to Upload</span
					> or drag and drop
				</div>
				<p class="text-[12px] leading-4">Image, Video, Audio or Document (max. 6mb)</p>
			</div>
			<input
				type="file"
				name=""
				id="file-drop"
				accept=""
				multiple={options.multiple}
				hidden
				on:change={handleClick}
			/>
		</label>
		{#if !isEmpty(error)}
			<span class="text-error -mt-1.5">
				{#if equals('exceed_max_limit')(error)}
					Your selected file is exceeding file size limit (max. 6mb)
				{:else}
					Please upload your profile image
				{/if}
			</span>
		{/if}

		<div class="flex flex-col gap-3">
			{#if Array.isArray(files)}
				{#each files as file (file.id)}
					{#if isFileError(file.status)}
						<div
							class="text-[14px] text-error-3 leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-error w-full bg-[#FFFBFA]"
						>
							<div
								class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-error-4 bg-error-4"
							>
								<img src="/images/icons/image-fail.svg" alt="file" />
							</div>
							<div class="flex flex-row gap-3 w-full">
								<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
									<div class="flex flex-col">
										<span class="font-medium">Upload Failed. Please try again.</span>
										<span class="text-error-2">File type</span>
									</div>
									<button class="font-semibold leading-5 w-fit">Try Again</button>
								</div>
								<div class="flex flex-col h-auto justify-between items-end">
									<button type="button" on:click={handleDelete(file.id)} class="w-fit"
										><img
											class="w-[20px] h-[20px]"
											src="/images/icons/delete-fail.svg"
											alt="delete"
										/></button
									>
									<span class="hidden relative top-1.5 text-[14px] leading-5 font-medium">Try</span>
								</div>
							</div>
						</div>
					{:else if isFileUploading(file.status)}
						<div
							class="text-[16px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-gray-2 w-full"
						>
							<div
								class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
							>
								<img src={`/images/icons/${getFileTypeImage(file.type)}`} alt={file.type} />
							</div>
							<div class="flex flex-row gap-3 w-full">
								<div class="flex flex-col gap-[10px] w-full text-[16px] leading-5">
									<div class="flex flex-col">
										<span class="font-medium">{file.name}</span>
										<span>{formatFileSize(file.size)}</span>
									</div>
									<span class="h-2 w-full bg-black rounded-md" />
								</div>
								<div class="flex flex-col h-auto justify-between items-end">
									<!-- <button on:click|preventDefault={handleDelete(file.id)} class="w-fit"
								><img
									class="w-[20px] h-[20px]"
									src="/images/icons/delete.svg"
									alt="delete"
								/></button
							> -->
									<span class="relative top-1.5 text-[16px] leading-5 font-medium"> ... </span>
								</div>
							</div>
						</div>
					{:else if isFileUploaded(file.status)}
						<div
							class="text-[16px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] w-full border-black-3"
						>
							<div
								class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
							>
								<img src={`/images/icons/${getFileTypeImage(file.type)}`} alt={file.type} />
							</div>
							<div class="flex flex-row gap-3 w-full">
								<div class="flex flex-col gap-[10px] w-full text-[16px] leading-5">
									<div class="flex flex-col">
										<span class="font-medium">{file.name}</span>
										<span>{formatFileSize(file.size)}</span>
									</div>
									<span class="h-2 w-full bg-black rounded-md" />
								</div>
								<div class="flex flex-col h-auto justify-between items-end">
									<!-- <button on:click|preventDefault={handleDelete(file.id)} class="w-fit"
								><img
									class="w-[20px] h-[20px]"
									src="/images/icons/delete.svg"
									alt="delete"
								/></button
							> -->
									<span class="relative top-1.5 text-[16px] leading-5 font-medium"> 100% </span>
								</div>
							</div>
						</div>
					{:else}
						<div
							class="text-[16px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] w-full border-black-3"
						>
							<div
								class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
							>
								<img src={`/images/icons/${getFileTypeImage(file.type)}`} alt={file.type} />
							</div>
							<div class="flex flex-row gap-3 w-full">
								<div class="flex flex-col gap-[10px] w-full text-[16px] leading-5">
									<div class="flex flex-col">
										<span class="font-medium">{file.name}</span>
										<span>{formatFileSize(file.size)}</span>
									</div>
									<!-- <span class="h-2 w-full bg-black rounded-md" /> -->
								</div>
								<div class="flex flex-col h-auto justify-between items-end">
									<button on:click|preventDefault={handleDelete(file.id)} class="w-fit"
										><img
											class="w-[20px] h-[20px]"
											src="/images/icons/delete.svg"
											alt="delete"
										/></button
									>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			{:else if is(String)(files)}
				<div
					class="text-[16px] leading-5 flex flex-row items-center justify-between gap-4 p-4 rounded-[12px] border-[1px] w-full border-black-3"
				>
					<div
						class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
					>
						{#if files.includes('token') || files.includes('storage/v1/object/public')}
							<img src={files} alt="fand" />
						{:else}
							<img src="/images/icons/athletes.svg" alt="fand" />
						{/if}
					</div>
					<div class="flex flex-row gap-3">
						<div class="flex flex-col h-auto justify-between items-end">
							<button on:click|preventDefault={resetFile} class="w-fit"
								><img
									class="w-[20px] h-[20px]"
									src="/images/icons/delete.svg"
									alt="delete"
								/></button
							>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- If upload success -->
<!-- <div
		class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-black-3 w-full"
	>
		<div
			class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
		>
			<img src="/images/icons/file.svg" alt="file" />
		</div>
		<div class="flex flex-row gap-3 w-full">
			<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
				{#each fileArr as file}
					<div class="flex flex-col">
						<span class="font-medium">{file.name}</span>
						<span>{formatFileSize(file.size)}</span>
					</div>
					<span class="h-2 w-full bg-black rounded-md" />
				{/each}
			</div>
			<div class="flex flex-col h-auto justify-between items-end">
				<button type="button" on:click={handleDelete(files.id)} class="w-fit"
					><img class="w-[20px] h-[20px]" src="/images/icons/delete.svg" alt="delete" /></button
				>
				<span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
			</div>
		</div>
	</div> -->

<!-- If file still uploading -->
<!-- <div
		class="text-[14px] leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-gray-2 w-full"
	>
		<div
			class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-gray-20 bg-gray-4"
		>
			<img src="/images/icons/file.svg" alt="file" />
		</div>
		<div class="flex flex-row gap-3 w-full">
			<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
				{#each fileArr as file}
					<div class="flex flex-col">
						<span class="font-medium">{file.name}</span>
						<span>{formatFileSize(file.size)}</span>
					</div>
					<span class="h-2 w-full bg-black rounded-md" />
				{/each}
			</div>
			<div class="flex flex-col h-auto justify-between items-end">
				<button type="button" on:click={handleDelete(files.id)} class="w-fit"
					><img class="w-[20px] h-[20px]" src="/images/icons/delete.svg" alt="delete" /></button
				>
				<span class="relative top-1.5 text-[14px] leading-5 font-medium">100%</span>
			</div>
		</div>
	</div> -->

<!-- If upload failed -->
<!-- <div
		class="text-[14px] text-error-3 leading-5 flex flex-row items-start gap-4 p-4 rounded-[12px] border-[1px] border-error w-full bg-[#FFFBFA]"
	>
		<div
			class="flex items-center justify-center rounded-full w-full h-[32px] max-w-[32px] border-[6px] border-error-4 bg-error-4"
		>
			<img src="/images/icons/image-fail.svg" alt="file" />
		</div>
		<div class="flex flex-row gap-3 w-full">
			<div class="flex flex-col gap-[10px] w-full text-[14px] leading-5">
				<div class="flex flex-col">
					<span class="font-medium">Upload Failed. Please try again.</span>
					<span class="text-error-2">File type</span>
				</div>
				<button class="font-semibold leading-5 w-fit">Try Again</button>
			</div>
			<div class="flex flex-col h-auto justify-between items-end">
				<button type="button" on:click={handleDelete(files.id)} class="w-fit"
					><img
						class="w-[20px] h-[20px]"
						src="/images/icons/delete-fail.svg"
						alt="delete"
					/></button
				>
				<span class="hidden relative top-1.5 text-[14px] leading-5 font-medium">Try</span>
			</div>
		</div>
	</div> -->
