<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import AddPage from '../../../../components/layouts/AddPage.svelte';
	import { getCampaignMilestoneFields } from '../../../../helpers/campaign_milestones';
	import { SupabaseService } from '../../../../lib/supabase';
	import { asyncTryCatchToast } from '../../../../lib/utils';

	export let data;
	const browseUrl = $page.url.pathname.replace('add', 'browse');

	let campaignMilestoneService;

	// contexts
	let campaign_milestones = getContext('campaign_milestones');
	let campaigns = getContext('campaigns');

	let fields = [];

	const handleAdd = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { data, onComplete } = detail;
				await campaignMilestoneService.add({ ...data, created_at: new Date().toISOString() });
				campaign_milestones.set(await campaignMilestoneService.get());
				onComplete();
			},
			{
				message: 'Milestone Added',
				redirect: browseUrl
			}
		);

	onMount(() => {
		campaignMilestoneService = new SupabaseService(data.supabase, 'campaign_milestones');
		fields = getCampaignMilestoneFields({ campaigns: $campaigns });
	});
</script>

<AddPage title="Adding Milestones to Campaigns" bind:fields on:add={handleAdd} />
