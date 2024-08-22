<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import ReadPage from '../../../../components/layouts/ReadPage.svelte';
	import { formatCampaign, headers } from '../../../../helpers/campaigns';

	let _headers = [...headers.map((e) => ({ ...e, value: '' }))];

	// Contexts
	let campaigns = getContext('campaigns');
	let organizations = getContext('organizations');
	let platforms = getContext('platforms');

	onMount(() => {
		const data = formatCampaign(
			$campaigns.find((e) => e.id == $page.params.read),
			{ organizations: $organizations, platforms: $platforms }
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

<ReadPage title="Campaigns" bind:headers={_headers} />
