<script>
	export let files = [];

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

	let clicked = false;

	const toggle = () => {
		clicked = !clicked;
	};

	const handleSelect = async (event) => {
		let file = event.target.files[0];

		if (file && getFileType(file.type)) {
			files = [...files, file];
		}
		toggle();
	};
</script>

<div class="flex flex-row max-h-[40px] pb-0.5">
	<label
		class="w-10 h-10 bg-yellow rounded-full flex items-center justify-center cursor-pointer"
		for="upload-image"><img src="/images/icons/file-attachment.svg" alt="file attachment" /></label
	>
	<input
		on:change={handleSelect}
		type="file"
		name="upload-image"
		id="upload-image"
		hidden
		accept=".jpg, .jpeg, .png, .gif, .bmp, .mp3, .wav, .pdf"
	/>

	<!--
	<div class:hidden={!clicked} class="flex flex-row gap-4 items-center">
		<button class="w-10 pt-1"><img src="/images/icons/camera.svg" alt="camera" /></button>
		<label class="w-9 cursor-pointer" for="upload-image"
			><img src="/images/icons/media-2.svg" alt="media" /></label
		>
		<input
			on:change={handleSelect}
			type="file"
			name="upload-image"
			id="upload-image"
			hidden
			accept="image/*"
		/>
		<button class="w-[22px] h-8"><img src="/images/icons/microphone.svg" alt="microphone" /></button
		>
	</div>
  -->
</div>
