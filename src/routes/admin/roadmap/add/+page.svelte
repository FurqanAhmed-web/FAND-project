<script>
	import { campaign_types } from '$lib/data';
	import { toastError, toastErrorText } from '$lib/store';
	import { SupabaseService } from '$lib/supabase/';
	import { getContext, onMount } from 'svelte';
	import Fields from '../../../../components/formUnits/fields.svelte';
	import { getCampaignFields, getRoadmapFields, validateAndFormat } from '../../../../helpers/fields';
	import { asyncTryCatchToast } from '../../../../lib/utils';

	export let data;

	let roadmapService;

	// contexts
	let status = getContext('product_status');
  let roadmaps = getContext('product_notes')

	let loading = false;
	let cancel = false;
	let fields = [];

	const handleSubmit = async () => {
		const e = validateAndFormat(fields);

		const { error, data } = e;

		if (error) {
			fields = e.fields;
			toastError.set(true);
			toastErrorText.set(error);
			return;
		}

		loading = true;
		asyncTryCatchToast(
			async () => {
				await roadmapService.add({ ...data, created_at: new Date().toISOString() });
				roadmaps.set(await roadmapService.get());
			},
			{
				message: 'Roadmap Added Successfully',
				redirect: '/admin/roadmap/browse'
			}
		);
	};

	onMount(() => {
		roadmapService = new SupabaseService(data.supabase, 'product_notes');
		fields = getRoadmapFields({
      status:$status,
		});
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
	on:keydown={(e) => e.key == 'Enter' && e.preventDefault()}
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col gap-8 p-12"
>
	<div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
		<a href="/admin/roadmap/browse" class="text-gray-3">Roadmap</a>
		<span><img src="/images/icons/slash-divider.svg" alt="divider" /></span>
		<button class="text-black">Add</button>
	</div>
	<div class="flex flex-row justify-between items-start w-full gap-20">
		<span class="text-[36px] font-semibold leading-8 w-full">Roadmap</span>
		<div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
			<button
				type="button"
				on:click={() => (cancel = true)}
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md"
			>
				<img src="/images/icons/cancel.svg" alt="exit" />
				Cancel
			</button>
			<button
				type="submit"
				disabled={loading}
				class="flex flex-row justify-center gap-2 items-center py-3 px-4 max-h-[40px] bg-yellow rounded-md"
			>
				<img src="/images/icons/save.svg" alt="save" />
				{loading ? 'Loading...' : 'Save'}
			</button>
		</div>
	</div>
	<div class="flex flex-col gap-10">
		<fieldset class="flex flex-col gap-8">
			<Fields bind:fields />
		</fieldset>
	</div>
</form>

{#if loading}
	<div
		class="load absolute top-0 left-0 bottom-0 right-0 m-auto w-[100px] h-[100px] border-yellow border-tr-transparent border-[10px] rounded-full"
	/>
{:else}
	<div class:hidden={!cancel} class="fixed top-0 left-0 m-auto w-full h-screen bg-black-3 z-100">
		<div
			class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6"
		>
			<div class="flex flex-col gap-1">
				<span class="text-[18px] text-gray-13 leading-7 font-semibold">Cancel</span>
				<span class="text-[14px] text-gray-12 leading-5"
					>Are you sure you want to cancel adding a record?</span
				>
			</div>
			<div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
				<button
					on:click={() => (cancel = false)}
					class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3"
					>Decline</button
				>
				<a
					href="/admin/roadmap/browse"
					class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow"
					>Confirm</a
				>
			</div>
		</div>
	</div>
{/if}
