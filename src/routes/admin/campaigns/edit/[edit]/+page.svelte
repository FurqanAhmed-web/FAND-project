<script>
	import { page } from '$app/stores';
	import { SupabaseService } from '$lib/supabase';
	import { getContext, onMount } from 'svelte';
	import EditPage from '../../../../../components/layouts/EditPage.svelte';
	import { getCampaignFields } from '../../../../../helpers/campaigns';
	import { populateDBToFields } from '../../../../../helpers/form';
	import { asyncTryCatchToast } from '../../../../../lib/utils';

	// Data
	export let data;
	let { supabase } = data;

	let campaignService;

	// Slug
	const editID = $page.params.edit;
	const browseUrl = $page.url.pathname.split('edit').shift() + 'browse';
	const readUrl = $page.url.pathname.replace('edit', 'read');

	// Contexts
	let campaigns = getContext('campaigns');
	let organizations = getContext('organizations');
	let platforms = getContext('platforms');

	// vars
	let loading = false;
	let fields = [];

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { data, onComplete } = detail;
				await campaignService.update(editID, {
					...data,
					updated_at: new Date().toISOString()
				});
				campaigns.set(await campaignService.get());
				onComplete();
			},
			{
				message: 'Campaign Updated',
				redirect: readUrl
			}
		);

	onMount(() => {
		campaignService = new SupabaseService(supabase, 'campaigns');
		fields = populateDBToFields(
			getCampaignFields({ organizations: $organizations, platforms: $platforms }),
			$campaigns.find((e) => e.id == editID)
		);
	});
</script>

<EditPage title="Edit Campaign" bind:loading bind:fields on:update={handleUpdate} />
