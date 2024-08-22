<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import ReadPage from '../../../../../components/layouts/ReadPage.svelte';
	import { formatCampaignAthlete, headers } from '../../../../../helpers/athletes_campaigns';

	let _headers = [...headers.map((e) => ({ ...e, value: '' }))];

	const athletes = getContext('athletes');
	const campaigns = getContext('campaigns');
	const athletes_campaigns = getContext('athletes_campaigns');

	onMount(() => {
		const data = formatCampaignAthlete(
			$athletes_campaigns.find((e) => e.id == $page.params.read),
			{ athletes: $athletes, campaigns: $campaigns }
		);
		_headers = _headers.map((e) => {
			const { name } = e;
			if (data[name]) {
				return {
					...e,
					value: data[name]
				};
			} else {
				return {
					...e,
					value: ''
				};
			}
		});
	});
</script>

<ReadPage title="Mapping Athletes to Campaigns" bind:headers={_headers} />
