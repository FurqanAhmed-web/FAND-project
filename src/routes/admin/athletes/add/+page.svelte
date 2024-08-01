<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import AddPage from '../../../../components/layouts/AddPage.svelte';
	import { getAthleteFields } from '../../../../helpers/athletes';
	import { SupabaseService } from '$lib/supabase';
	import { asyncTryCatchToast } from '$lib/utils';
	import { uploadFileFromFields } from '../../../../helpers/form';

	export let data;
	const browseUrl = $page.url.pathname.replace('add', 'browse');

	let athleteService;

	// contexts
	let athletes = getContext('athletes');

	let fields = [];

	const handleUploadFile = async (_data) => {
		const { name, path, error } = await uploadFileFromFields({
			fields,
			bucket: 'athletes',
			supabase: data.supabase,
			setFields: (value) => (fields = value)
		});

		if (error) {
			throw error;
		}
		if (name) {
			if (path) {
				_data[name] = path;
			} else {
				delete _data[name];
			}
		}

		return _data;
	};

	const handleAdd = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				let { data, onComplete } = detail;
				data = await handleUploadFile(data); // Handle file upload
				await athleteService.add({ ...data, created_at: new Date().toISOString() });
				athletes.set(await athleteService.get());
				onComplete();
			},
			{
				message: 'Athlete Information Added',
				redirect: browseUrl
			}
		);

	onMount(() => {
		athleteService = new SupabaseService(data.supabase, 'athletes');
		fields = getAthleteFields();
	});
</script>

<AddPage title="Athletes" bind:fields on:add={handleAdd} />
