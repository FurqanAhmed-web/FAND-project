<script>
	import { page } from '$app/stores';
	import { SupabaseService } from '$lib/supabase';
	import { asyncTryCatchToast } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import EditPage from '../../../../../components/layouts/EditPage.svelte';
	import { getOrganizationFields } from '../../../../../helpers/organizations';
	import { populateDBToFields, uploadFileFromFields } from '../../../../../helpers/form';

	export let data;
	let { supabase } = data;
	// Slug
	const editID = $page.params.edit;
	const browseUrl = $page.url.pathname.split('edit').shift() + 'browse';
	const readUrl = $page.url.pathname.replace('edit', 'read');

	let organizationService;

	// contexts
	let organizations = getContext('organizations');
	let plans = getContext('plans');

	let loading = false;
	let fields = [];

	const handleUploadFile = async (_data) => {
		const { name, path, error } = await uploadFileFromFields({
			fields,
			bucket: 'media/organizations',
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
				await organizationService.update(editID, { ...data, updated_at: new Date().toISOString() });
				organizations.set(await organizationService.get());
				onComplete();
			},
			{
				message: 'Organization Information Updated',
				redirect: readUrl
			}
		);

	onMount(() => {
		organizationService = new SupabaseService(supabase, 'organizations');
		fields = populateDBToFields(
			getOrganizationFields({ subscriptions: $plans }),
			$organizations.find((e) => e.id == editID)
		);
	});
</script>

<EditPage title="Edit Organization" bind:loading bind:fields on:update={handleUpdate} />
