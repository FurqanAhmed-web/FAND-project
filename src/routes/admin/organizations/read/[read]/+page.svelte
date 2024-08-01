<script>
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { formatOrganization, headers } from '../../../../../helpers/organizations';
	import ReadPage from '../../../../../components/layouts/ReadPage.svelte';

	let organizations = getContext('organizations');
	
	let _headers = [...headers.map((e) => ({ ...e, value: '' }))];

	onMount(() => {
		const data = formatOrganization($organizations.find((e) => e.id == $page.params.read));
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

<ReadPage title="Organizations" bind:headers={_headers} />
