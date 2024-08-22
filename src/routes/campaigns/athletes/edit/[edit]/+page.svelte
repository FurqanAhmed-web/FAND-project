<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import EditPage from '../../../../../components/layouts/EditPage.svelte';
	import { getCampaignAthleteFields } from '../../../../../helpers/athletes_campaigns';
	import { populateDBToFields } from '../../../../../helpers/form';
	import { SupabaseService } from '../../../../../lib/supabase';
	import { asyncTryCatchToast } from '../../../../../lib/utils';

	export let data;

	// Slug
	const editID = $page.params.edit;
	const readUrl = $page.url.pathname.replace('edit', 'read');

	let athleteCampaignsService;

	let athletes = getContext('athletes');
	let campaigns = getContext('campaigns');
	let athletes_campaigns = getContext('athletes_campaigns');

	let loading = false;
	let fields = [];

	const handleUpdate = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				const { data, onComplete } = detail;
				console.log(data);
				await athleteCampaignsService.update(editID, data);
				athletes_campaigns.set(await athleteCampaignsService.get());
				onComplete();
			},
			{
				message: 'Athlete Information Updated',
				redirect: readUrl
			}
		);

	onMount(async () => {
		athleteCampaignsService = new SupabaseService(data.supabase, 'athletes_campaigns');
		fields = populateDBToFields(
			getCampaignAthleteFields({ athletes: $athletes, campaigns: $campaigns }),
			$athletes_campaigns.find((e) => e.id == editID)
		);
	});

	$: console.log(fields);
</script>

<EditPage title="Editing Athletes to Campaigns" bind:loading bind:fields on:update={handleUpdate} />
