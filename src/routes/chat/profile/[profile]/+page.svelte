<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import ReadPage from '../../../../components/layouts/ReadPage.svelte';
	import { formatAthlete, headers } from '../../../../helpers/athletes';

	const athletes = getContext('athletes');

	let _headers = [...headers.map((e) => ({ ...e, value: '' }))];

	onMount(() => {
		const data = formatAthlete($athletes.find((e) => e.id == $page.params.profile));
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

<ReadPage title="Athlete" bind:headers={_headers} />
