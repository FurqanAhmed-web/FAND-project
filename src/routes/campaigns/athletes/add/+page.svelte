<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import AddPage from '../../../../components/layouts/AddPage.svelte';
	import { getCampaignAthleteFields } from '../../../../helpers/athletes_campaigns';
	import { SupabaseService } from '../../../../lib/supabase';
	import { asyncTryCatchToast } from '../../../../lib/utils';

	export let data;
	const browseUrl = $page.url.pathname.replace('add', 'browse');

	let athletesCampaignsService;

	// contexts
	let athletes = getContext('athletes');
	let campaigns = getContext('campaigns');
	let athletes_campaigns = getContext('athletes_campaigns');

	let fields = [];

	const handleAdd = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { data, onComplete } = detail;
				await athletesCampaignsService.add({ ...data, created_at: new Date().toISOString() });
				athletes_campaigns.set(await athletesCampaignsService.get());
				onComplete();
			},
			{
				message: "Campaigns' Athlete Added",
				redirect: browseUrl
			}
		);

	onMount(() => {
		athletesCampaignsService = new SupabaseService(data.supabase, 'athletes_campaigns');
		fields = getCampaignAthleteFields({ athletes: $athletes, campaigns: $campaigns });
	});
</script>

<AddPage title="Adding Athletes to a Campaign" bind:fields on:add={handleAdd} />
