<script>
	import { getContext, onMount } from 'svelte';
	// Helper
	import { formatCampaign, getCampaignFields, headers } from '../../../helpers/campaigns';
	import { SupabaseService } from '../../../lib/supabase';
	// Components
	import BrowsePage from '../../../components/layouts/BrowsePage.svelte';
	import { populateDBToFields } from '../../../helpers/form';
	import { asyncTryCatchToast } from '../../../lib/utils';

	export let data;

	let campaignService;

	let campaigns = getContext('campaigns');
	let organizations = getContext('organizations');
	let platforms = getContext('platforms');

	let fields = [];
	let records = [];

	// Formatting for table data
	const formatCampaigns = (arr) => {
		return arr
			.map((e) => {
				return formatCampaign(e, { organizations: $organizations, platforms: $platforms });
			})
			.sort((a, b) => b.id - a.id);
	};

	$: {
		if ($campaigns) {
			records = formatCampaigns($campaigns);
		}
	}

	const handleEditClicked = ({ detail: { id } }) => {
		fields = populateDBToFields(
			getCampaignFields({ organizations: $organizations, platforms: $platforms }),
			$campaigns.find((e) => e.id == id)
		);
	};

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { editID, data, onComplete } = detail;
				await campaignService.update(editID, { ...data, updated_at: new Date().toISOString() });
				campaigns.set(await campaignService.get());
				onComplete();
			},
			{
				message: 'Campaign Information Updated'
			}
		);

	const handleDelete = async ({ detail: { deleteID } }) => {
		await campaignService.delete(deleteID);
		campaigns.set(await campaignService.get());
	};

	const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			$campaigns = await campaignService.search(keyword, 'name');
		} else {
			$campaigns = await campaignService.get();
		}
	};

	onMount(async () => {
		campaignService = new SupabaseService(data.supabase, 'campaigns');
	});
</script>

<BrowsePage
	{headers}
	title="Campaigns"
	description="Championing athletes' feats, training, and passion. Inspiration awaits in their victorious
stories."
	options={{
		updateModalTitle: 'Edit Campaign',
		deleteSuccessText: 'Campaign Deleted',
		searchPlaceholder: 'Search Campaign Name'
	}}
	links={[
		{
			name: "Campaigns' Athletes",
			url: '/campaigns/athletes/browse'
		},
		{
			name: "Campaigns' Milestones",
			url: '/campaigns/milestones/browse'
		}
	]}
	bind:records
	bind:fields
	isBreadcrumb={false}
	on:clickedit={handleEditClicked}
	on:update={handleUpdate}
	on:delete={handleDelete}
	on:search={handleSearch}
/>
