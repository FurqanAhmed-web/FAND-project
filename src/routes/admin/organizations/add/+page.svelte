<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import AddPage from '../../../../components/layouts/AddPage.svelte';
	import { getOrganizationFields } from '../../../../helpers/organizations';
	import { SupabaseService } from '$lib/supabase';
	import { asyncTryCatchToast } from '$lib/utils';
	import { uploadFileFromFields } from '../../../../helpers/form';

	export let data;
	let { supabase } = data;
	const browseUrl = $page.url.pathname.replace('add', 'browse');

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

	const handleAdd = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				let { data, onComplete } = detail;
				data = await handleUploadFile(data); // Handle file upload
				await organizationService.add({ ...data, created_at: new Date().toISOString() });
				organizations.set(await organizationService.get());
				onComplete();
			},
			{
				message: 'Organization Information Added',
				redirect: browseUrl
			}
		);

	onMount(() => {
		organizationService = new SupabaseService(supabase, 'organizations');
		fields = getOrganizationFields({ subscriptions: $plans });
	});
</script>

<AddPage title="Organizations" bind:loading bind:fields on:add={handleAdd} />
