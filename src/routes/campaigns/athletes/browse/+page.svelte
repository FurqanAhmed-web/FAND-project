<script>
	import { getContext, onMount } from 'svelte';
	import BrowsePage from '../../../../components/layouts/BrowsePage.svelte';
	import {
		formatCampaignAthlete,
		getCampaignAthleteFields,
		headers
	} from '../../../../helpers/athletes_campaigns';
	import { populateDBToFields } from '../../../../helpers/form';
	import { SupabaseService } from '../../../../lib/supabase';
	import { asyncTryCatchToast } from '../../../../lib/utils';

	export let data;

	let campaignService;
	let athleteCampaignsService;

	let athletes = getContext('athletes');
	let campaigns = getContext('campaigns');
	let athletes_campaigns = getContext('athletes_campaigns');

	let fields = [];
	let records = [];

	// Formatting for table data
	const formatCampaignAthletes = (arr) => {
		return arr
			.map((e) => {
				return formatCampaignAthlete(e, { athletes: $athletes, campaigns: $campaigns });
			})
			.sort((a, b) => b.id - a.id);
	};

	$: {
		if ($athletes_campaigns) {
			records = formatCampaignAthletes($athletes_campaigns);
		}
	}

	const handleEditClicked = ({ detail: { id } }) => {
		fields = populateDBToFields(
			getCampaignAthleteFields({ athletes: $athletes, campaigns: $campaigns }),
			$athletes_campaigns.find((e) => e.id == id)
		);
	};

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { editID, data, onComplete } = detail;

				await athleteCampaignsService.update(editID, { ...data });
				athletes_campaigns.set(await athleteCampaignsService.get());
				onComplete();
			},
			{
				message: "Campaigns' Athlete Information Updated"
			}
		);

	const handleDelete = async ({ detail: { deleteID } }) => {
		await athleteCampaignsService.delete(deleteID);
		athletes_campaigns.set(await athleteCampaignsService.get());
	};

	const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			let _campaigns = await campaignService.search(keyword, 'name');
			let ids = _campaigns.map((e) => e.id);
			$athletes_campaigns = $athletes_campaigns.filter((e) => ids.includes(e.campaign_id));
		} else {
			$athletes_campaigns = await athleteCampaignsService.get();
		}
	};

	onMount(async () => {
		campaignService = new SupabaseService(data.supabase, 'campaigns');
		athleteCampaignsService = new SupabaseService(data.supabase, 'athletes_campaigns');
	});
</script>

<BrowsePage
	{headers}
	title="Mapping Athletes to Campaigns"
	description="Championing athletes' feats, training, and passion. Inspiration awaits in their victorious
stories."
	options={{
		updateModalTitle: "Edit Campaigns' Athlete",
		deleteSuccessText: "Campaigns' Athlete Deleted",
		searchPlaceholder: 'Search Campaign Name'
	}}
	bind:records
	bind:fields
	on:clickedit={handleEditClicked}
	on:update={handleUpdate}
	on:delete={handleDelete}
	on:search={handleSearch}
/>
