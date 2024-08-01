<script>
	import { page } from '$app/stores';
	import { SupabaseService } from '$lib/supabase/';
	import { getContext, onMount } from 'svelte';
	import AddPage from '../../../../components/layouts/AddPage.svelte';
	import { getCampaignFields } from '../../../../helpers/campaigns';
	import { asyncTryCatchToast } from '../../../../lib/utils';

	export let data;
	let { supabase } = data;
	const browseUrl = $page.url.pathname.replace('add', 'browse');

	let campaignService;

	// contexts
	let campaigns = getContext('campaigns');
	let organizations = getContext('organizations');
	let platforms = getContext('platforms');

	let fields = [];

	const handleAdd = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { data, onComplete } = detail;
				await campaignService.add({ ...data, created_at: new Date().toISOString() });
				campaigns.set(await campaignService.get());
				onComplete();
			},
			{
				message: 'Campaign Added',
				redirect: browseUrl
			}
		);

	onMount(() => {
		campaignService = new SupabaseService(supabase, 'campaigns');
		fields = getCampaignFields({
			organizations: $organizations,
			platforms: $platforms
		});
	});
</script>

<AddPage title="Campaigns" bind:fields on:add={handleAdd} />
