<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import ReadPage from '../../../../../components/layouts/ReadPage.svelte';
	import { formatCampaignMilestone, headers } from '../../../../../helpers/campaign_milestones';

	let _headers = [...headers.map((e) => ({ ...e, value: '' }))];

	const campaigns = getContext('campaigns');
	const campaign_milestones = getContext('campaign_milestones');

	onMount(() => {
		const data = formatCampaignMilestone(
			$campaign_milestones.find((e) => e.id == $page.params.read),
			{ campaigns: $campaigns }
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

<ReadPage title="Mapping Milestones to Campaigns" bind:headers={_headers} />
