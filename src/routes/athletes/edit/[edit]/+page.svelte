<script>
	import { page } from '$app/stores';
	import { SupabaseService } from '$lib/supabase';
	import { asyncTryCatchToast } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import EditPage from '../../../../components/layouts/EditPage.svelte';
	import { getAthleteFields } from '../../../../helpers/athletes';
	import { populateDBToFields, uploadFileFromFields } from '../../../../helpers/form';

	export let data;
	let { supabase } = data;

	// Slug
	const editID = $page.params.edit;
	const browseUrl = $page.url.pathname.split('edit').shift() + 'browse';
	const readUrl = $page.url.pathname.replace('edit', 'read');

	let athleteService;

	// contexts
	let athletes = getContext('athletes');

	let loading = false;
	let fields = [];

	const handleUploadFile = async (_data) => {
		const { name, path, error } = await uploadFileFromFields({
			fields,
			bucket: 'athletes',
			supabase: supabase,
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

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				let { data, onComplete } = detail;
				data = await handleUploadFile(data); // Handle file upload
				await athleteService.update(editID, { ...data, updated_at: new Date().toISOString() });
				athletes.set(await athleteService.get());
				onComplete();
			},
			{
				message: 'Athlete Information Updated',
				redirect: readUrl
			}
		);

	onMount(() => {
		athleteService = new SupabaseService(supabase, 'athletes');
		fields = populateDBToFields(
			getAthleteFields(),
			$athletes.find((e) => e.id == editID)
		);
	});
</script>

<EditPage title="Edit Athlete" bind:loading bind:fields on:update={handleUpdate} />
