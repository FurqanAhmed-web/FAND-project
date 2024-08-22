<script>
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { campaign_types } from '$lib/data';
	import { SupabaseService } from '$lib/supabase';

	export let data;
	let loading = false;
	let campaign = {};

	// Slug
	const readID = $page.params.read;

	// Contexts
	let campaigns = getContext('campaigns');
	let organizations = getContext('organizations');
	let platforms = getContext('platforms');

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		weekday: 'short'
	});

	const handleDelete = () => {
		const deleteModal = document.getElementById('delete-modal');
		deleteModal.classList.remove('hidden');
	};

	const handleCancel = () => {
		goto('/campaigns/browse');
	};

	const handleHideModalDelete = () => {
		const deleteModal = document.getElementById('delete-modal');
		deleteModal.classList.add('hidden');
	};

	onMount(() => {
		campaign = $campaigns.find((e) => e.id == readID);
	});
</script>

<div class="flex flex-col gap-8 p-12">
	<div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
		<a href="/campaigns/browse/" class="text-gray-3">Campaigns</a>
		<span><img src="/images/icons/slash-divider.svg" alt="divider" /></span>
		<button class="text-black">Report</button>
	</div>
	<div class="flex flex-row justify-between items-start w-full gap-20">
		<span class="text-[36px] font-semibold leading-8 w-full">Campaigns</span>
		<div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
			<button
				on:click={handleCancel}
				type="button"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md"
			>
				<img src="/images/icons/cancel.svg" alt="cancel" />
				Cancel
			</button>
		</div>
	</div>
	<div class="flex flex-col gap-10">
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Organization</span>
				<span class="leading-6 text-gray-13"
					>{$organizations?.find((e) => e.id == campaign?.organization_id)?.name || ''}</span
				>
			</div>
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Title</span>
				<span class="leading-6 text-gray-13"
					>{campaign_types?.find((e) => e.id == campaign?.type)?.type || ''}</span
				>
			</div>
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Markdown</span>
				<span class="leading-6 text-gray-13"
					>{$platforms?.find((e) => e.id == campaign?.type)?.type || ''}</span
				>
			</div>
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Active</span>
				<span class="leading-6 text-gray-13">{campaign?.isactive ? 'Yes' : 'No'}</span>
			</div>
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Message Start Date</span>
				<span class="leading-6 text-gray-13"
					>{campaign?.start_date && dateFormatter.format(new Date(campaign.start_date))}</span
				>
			</div>
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Message End Date</span>
				<span class="leading-6 text-gray-13"
					>{campaign?.end_date && dateFormatter.format(new Date(campaign.end_date))}</span
				>
			</div>
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Created</span>
				<span class="leading-6 text-gray-13"
					>{campaign?.created_at && dateFormatter.format(new Date(campaign.created_at))}</span
				>
			</div>
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">Updated</span>
				<span class="leading-6 text-gray-13"
					>{campaign?.updated_at && dateFormatter.format(new Date(campaign.updated_at))}</span
				>
			</div>
		</div>
	</div>
</div>

<div id="delete-modal" class="hidden absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
	<div
		class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6"
	>
		<div class="flex flex-col">
			<span class="text-[18px] text-gray-13 leading-7 font-semibold">Delete</span>
			<span class="text-[14px] text-gray-12 leading-5"
				>Are you sure you want to delete this record?</span
			>
		</div>
		<div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
			<button
				on:click={handleHideModalDelete}
				id="hide-modal"
				class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3"
				>Cancel</button
			>
			<button
				class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow"
				>Confirm</button
			>
		</div>
	</div>
</div>
