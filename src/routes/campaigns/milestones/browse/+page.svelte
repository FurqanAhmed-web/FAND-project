<script>
	import { getContext, onMount } from 'svelte';
	import BrowsePage from '../../../../components/layouts/BrowsePage.svelte';
	// Helper
	import {
		formatCampaignMilestone,
		getCampaignMilestoneFields,
		headers
	} from '../../../../helpers/campaign_milestones';
	import { SupabaseService } from '../../../../lib/supabase';
	import { populateDBToFields } from '../../../../helpers/form';
	import { asyncTryCatchToast } from '../../../../lib/utils';

	export let data;

	let campaignService;
	let campaignMilestoneService;

	let campaign_milestones = getContext('campaign_milestones');
	let campaigns = getContext('campaigns');

	let fields = [];
	let records = [];

	// Formatting for table data
	const formatCampaignMilestones = (arr) => {
		return arr
			.map((e) => formatCampaignMilestone(e, { campaigns: $campaigns }))
			.sort((a, b) => b.id - a.id);
	};

	$: {
		if ($campaign_milestones) {
			records = formatCampaignMilestones($campaign_milestones);
		}
	}

	const handleEditClicked = ({ detail: { id } }) => {
		fields = populateDBToFields(
			getCampaignMilestoneFields({ campaigns: $campaigns }),
			$campaign_milestones.find((e) => e.id == id)
		);
	};

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { editID, data, onComplete } = detail;

				await campaignMilestoneService.update(editID, {
					...data,
					updated_at: new Date().toISOString()
				});
				campaign_milestones.set(await campaignMilestoneService.get());
				onComplete();
			},
			{
				message: 'Campaign Milestone Information Updated'
			}
		);

	const handleDelete = async ({ detail: { deleteID } }) => {
		await campaignMilestoneService.delete(deleteID);
		campaign_milestones.set(await campaignMilestoneService.get());
	};

	const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			let _campaigns = await campaignService.search(keyword, 'name');
			let ids = _campaigns.map((e) => e.id);
			$campaign_milestones = $campaign_milestones.filter((e) => ids.includes(e.campaign_id));
		} else {
			$campaign_milestones = await campaignMilestoneService.get();
		}
	};

	onMount(async () => {
		campaignService = new SupabaseService(data.supabase, 'campaigns');
		campaignMilestoneService = new SupabaseService(data.supabase, 'campaign_milestones');
	});
</script>

<BrowsePage
	{headers}
	title="Milestones"
	description="Championing athletes' feats, training, and passion. Inspiration awaits in their victorious
stories."
	options={{
		updateModalTitle: 'Edit Campaign Milestone',
		deleteSuccessText: 'Campaign Milestone Deleted',
		searchPlaceholder: 'Search Campaign Name'
	}}
	bind:records
	bind:fields
	on:clickedit={handleEditClicked}
	on:update={handleUpdate}
	on:delete={handleDelete}
	on:search={handleSearch}
/>
