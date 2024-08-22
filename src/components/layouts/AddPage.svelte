<script>
	import { createEventDispatcher } from 'svelte';
	import { populateFieldsToDB, validate } from '../../helpers/form';
	import { toastError, toastErrorText } from '../../lib/store';
	import Fields from '../formUnits/fields.svelte';
	import Breadcrumb from '../ui/breadcrumb.svelte';

	let loading = false;
	export let title = '';
	export let fields = [];

	const dispatch = createEventDispatcher();

	let cancel = false;

	// URLS
	let currentPageRoute = window.location.pathname;
	const getBrowseURL = () => {
		return currentPageRoute.replace('add', 'browse');
	};

	const handleSubmit = () => {
		const e = validate(fields);

		console.log(e);

		if (e.error) {
			fields = e.fields;
			toastError.set(true);
			toastErrorText.set(e.error);
			return;
		}

		loading = true;

		const data = populateFieldsToDB(fields);

		dispatch('add', {
			data,
			fields: fields,
			onComplete: () => (loading = false)
		});
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<form
	on:keydown={(e) => e.key == 'Enter' && e.preventDefault()}
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col gap-8 p-12"
	novalidate
>
	<Breadcrumb />
	<div class="flex flex-row justify-between items-start w-full gap-20">
		<span class="text-[36px] font-semibold leading-8 w-full">{title}</span>
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
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[105px] max-h-[40px] bg-yellow rounded-md"
			>
				{#if loading}
					<img src="/images/icons/save.svg" alt="save" /> Adding...
				{:else}
					<img src="/images/icons/save.svg" alt="save" /> Save
				{/if}
			</button>
		</div>
	</div>
	<div class="flex flex-col gap-10">
		<fieldset class="flex flex-col gap-8">
			<Fields bind:fields />
		</fieldset>
	</div>
</form>

<div class:hidden={!cancel} class="absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
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
				href={getBrowseURL()}
				class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow"
				>Confirm</a
			>
		</div>
	</div>
</div>
