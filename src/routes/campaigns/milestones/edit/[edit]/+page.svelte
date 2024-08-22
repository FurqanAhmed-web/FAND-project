<script>
	import { getContext, onMount } from 'svelte';
	import { getCampaignMilestoneFields } from '../../../../../helpers/campaign_milestones';
	import { SupabaseService } from '../../../../../lib/supabase';
	import EditPage from '../../../../../components/layouts/EditPage.svelte';
	import { populateDBToFields } from '../../../../../helpers/form';
	import { page } from '$app/stores';
	import { asyncTryCatchToast } from '../../../../../lib/utils';

	export let data;

	// Slug
	const editID = $page.params.edit;
	const readUrl = $page.url.pathname.replace('edit', 'read');

	let campaignMilestoneService;

	// contexts
	let campaign_milestones = getContext('campaign_milestones');
	let campaigns = getContext('campaigns');

	let fields = [];

	let loading = false;

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { data, onComplete } = detail;
				console.log(data);
				await campaignMilestoneService.update(editID, {
					...data,
					updated_at: new Date().toISOString()
				});
				campaign_milestones.set(await campaignMilestoneService.get());
				onComplete();
			},
			{
				message: 'Milestone Updated',
				redirect: readUrl
			}
		);

	onMount(() => {
		campaignMilestoneService = new SupabaseService(data.supabase, 'campaign_milestones');
		fields = populateDBToFields(
			getCampaignMilestoneFields({ campaigns: $campaigns }),
			$campaign_milestones.find((e) => e.id == editID)
		);
	});
	$: console.log(fields);
</script>

<EditPage
	title="Editing Milestones to Campaigns"
	bind:loading
	bind:fields
	on:update={handleUpdate}
/>
