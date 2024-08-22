<script>
	import { showDelete } from '$lib/store';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let selectedRow

	const hideDelete = () => {
		showDelete.set(false);

    selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
    selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3')
	};
</script>

<div
	id="delete-overlay"
	class="z-20 bg-black-3 w-full h-auto fixed top-0 right-0 left-0 bottom-0 m-auto"
/>
<div
	id="delete-modal"
	class="pointer-events-auto flex flex-col gap-8 p-6 w-full max-w-[366px] bg-white rounded-[12px] h-auto max-h-[176px] z-50 absolute top-0 right-0 left-0 bottom-0 m-auto"
>
	<div>
		<span class="text-gray-13 text-[18px] font-semibold leading-7">Delete</span>
		<p class="text-gray-12 text-[14px] leading-5">Are you sure you want to delete this record?</p>
	</div>
	<div class="flex flex-row gap-4 font-semibold leading-6">
		<button
			on:click={hideDelete}
			class="max-h-[44px] z-50 pointer-click border-[1px] border-black-3 shadow-sm rounded-lg w-full h-full py-[18px] flex items-center justify-center"
			>Cancel</button
		>
		<button
			on:click={() => {
				dispatch('confirm');
			}}
			class="max-h-[44px] z-50 cursor-pointer border-[1px] border-yellow bg-yellow shadow-sm rounded-lg w-full h-full py-[18px] flex items-center justify-center"
			>Confirm</button
		>
	</div>
</div>
