<script>
	import { page } from '$app/stores';
	import { SupabaseService } from '$lib/supabase/';
	import { getContext, onMount } from 'svelte';
	import AddPage from '../../../../components/layouts/AddPage.svelte';
	import { getPlanFields } from '../../../../helpers/plans';
	import { asyncTryCatchToast } from '../../../../lib/utils';

	export let data;
	let { supabase } = data;
	const browseUrl = $page.url.pathname.replace('add', 'browse');

	let planService;

	// contexts
	let plans = getContext('plans');

	let fields = [];

	const handleAdd = async ({ detail }) =>
		asyncTryCatchToast(
			async () => {
				let { data, onComplete } = detail;
				await planService.add(data);
				plans.set(await planService.get());
				onComplete();
			},
			{
				message: 'Subcription Added',
				redirect: browseUrl
			}
		);

	onMount(() => {
		planService = new SupabaseService(supabase, 'plans');
		fields = getPlanFields();
	});
</script>

<AddPage title="Subscription" bind:fields on:add={handleAdd} />
