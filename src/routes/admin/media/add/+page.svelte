<script>
	import { getContext, onMount } from 'svelte';
	import Fields from '../../../../components/formUnits/fields.svelte';
	import { getUserMediaFields } from '../../../../helpers/user-media';
	import { MediaService, SupabaseService } from '../../../../lib/supabase';
	import { toastError, toastErrorText } from '../../../../lib/store';
	import { populateFieldsToDB, validate } from '../../../../helpers/form';
	import {
		asyncTryCatchToast,
		getHashOfImage,
		getMediaTypeIdFromFile
	} from '../../../../lib/utils';
	import slugify from 'slugify';
	import { media_types } from '../../../../lib/data';

	export let data;

	let mediaService;
	let mediaStorageService;
	let session;

	let media = getContext('media');
	let organizations = getContext('organizations');
	let users = getContext('users');
	let loading = false;
	let cancel = false;
	let fields = [];

	function getMediaType(filename) {
		const extension = filename.split('.').pop().toLowerCase();
		const fileType = media_types.find((type) => type.type === extension);
		return fileType ? fileType.id : 'Unknown';
	}
	//for submit/save
	const handleSubmit = async () => {
		const e = validate(fields);

		console.log(e);

		if (e.error) {
			fields = e.fields;
			toastError.set(true);
			toastErrorText.set(e.error);
			return;
		}

		loading = true;

		let data = populateFieldsToDB(fields);

		const fileFields = fields.filter((e) => e.type == 'file');

		const setFilesStatus = (name, status) => {
			fields = fields.map((e) => {
				if (e.name == name) {
					return {
						...e,
						value: e.value.map((f) => {
							f.status = status;
							return f;
						})
					};
				}
				return e;
			});
		};

		asyncTryCatchToast(
			async () => {
				if (fileFields.length) {
					const { name, value } = fileFields[0];
					console.log(getMediaTypeIdFromFile(value));
					try {
						setFilesStatus(name, 'uploading');
						const path = await mediaStorageService.addFile(value[0]);
						data[name] = path;
						setFilesStatus(name, 'uploaded');
						// console.log({
						// 	...data,
						// 	created_at: new Date().toISOString(),
						// 	updated_at: new Date().toISOString(),
						// 	description: '',
						// 	user_id: 38,
						// 	hash: getHashOfImage(value),
						// 	friendly_slug: slugify(path),
						// 	type: getMediaType(data.friendly_filename),
						// 	isactive: true
						// });
						await mediaService.add({
							...data,
							created_at: new Date().toISOString(),
							updated_at: new Date().toISOString(),
							description: '',
							user_id: 44,
							hash: getHashOfImage(value),
							friendly_slug: slugify(path).slice(0, 4),
							type: getMediaType(data.friendly_filename),
							isactive: true
						});
						media.set(await mediaService.get());
					} catch (error) {
						setFilesStatus(name, 'error');
						setFilesStatus(name, 'removed');
						await mediaStorageService.deleteFile(value[0].name);
						console.log(error, 'errr');
						throw new Error('Failed to add');
					}
					//await mediaService.add({ ...data, created_at: new Date().toISOString(), user_id: session.data.user.id, });
					// media.set(await mediaService.get());
				}
			},
			{
				message: 'Media Added Successfully',
				redirect: '/admin/media/browse'
			}
		);
	};

	onMount(async () => {
		mediaService = new SupabaseService(data.supabase, 'media');
		mediaStorageService = new MediaService(data.supabase);
		session = await data.supabase.auth.getUser();
		fields = getUserMediaFields({ organizations: $organizations });
	});

	const setOriginalFilename = (_fields) => {
		let file;
		_fields.forEach(({ name, type, value }) => {
			if (type == 'file' && Array.isArray(value) && value?.length) {
				file = value[0];
			}
		});

		if (file)
			fields = fields.map((e) => {
				if (e.name == 'friendly_filename') {
					return {
						...e,
						value: file.name
					};
				}
				return e;
			});
	};

	$: {
		setOriginalFilename(fields);
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
	on:keydown={(e) => e.key == 'Enter' && e.preventDefault()}
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col gap-8 p-12"
	novalidate
>
	<div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
		<a href="/media/browse" class="text-gray-3">Media</a>
		<span><img src="/images/icons/slash-divider.svg" alt="divider" /></span>
		<button class="text-black">Add</button>
	</div>
	<div class="flex flex-row justify-between items-start w-full gap-20">
		<span class="text-[36px] font-semibold leading-8 w-full">Media</span>
		<div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
			<button
				on:click={() => (cancel = true)}
				type="button"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md"
			>
				<img src="/images/icons/cancel.svg" alt="exit" /> Cancel
			</button>
			<button
				type="submit"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md"
			>
				<img src="/images/icons/save.svg" alt="save" /> Save
			</button>
		</div>
	</div>
	<div class="flex flex-col gap-10">
		<fieldset class="flex flex-col gap-8">
			<Fields bind:fields />
		</fieldset>
	</div>
</form>

<div class:hidden={!cancel} class="absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
	<div
		class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6"
	>
		<div class="flex flex-col gap-1">
			<span class="text-[18px] text-gray-13 leading-7 font-semibold">Cancel</span>
			<span class="text-[14px] text-gray-12 leading-5"
				>Are you sure you want to cancel adding a record?</span
			>
		</div>
		<div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
			<button
				on:click={() => (cancel = false)}
				class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3"
				>Decline</button
			>
			<a
				href="/athletes/browse"
				class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow"
				>Confirm</a
			>
		</div>
	</div>
</div>
