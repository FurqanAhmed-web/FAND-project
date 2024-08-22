<script>
	import { page } from '$app/stores';
	import { showEdit } from '$lib/store';
	import { createEventDispatcher, onMount } from 'svelte';
	import Fields from '../formUnits/fields.svelte';

	export let title = 'Edit';
	export let fields = [];
	export let name = '';
	export let selectedRow;

	let selectIndex;

	const handleUpdate = () => {
		dispatch('update', { fields });
	};

	const dispatch = createEventDispatcher();

	const hideEditModal = () => {
		showEdit.set(false);
		if (selectedRow) {
			if ($page.route.id.includes(name)) {
				dispatch('cancel');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
			} else {
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
			}
		}
	};

	onMount(() => {
		const clickHandler = (e) => {
			if (!e.target.closest('#options')) {
				selectIndex = -1;
			}
		};

		window.addEventListener('click', clickHandler);

		return () => {
			window.removeEventListener('click', clickHandler);
		};
	});
</script>

<div class="z-40 bg-black-3 w-full h-full absolute top-0 left-0 right-0 bottom-0 m-auto">
	<div
		class="absolute right-0 top-0 bottom-0 m-auto w-full bg-white max-w-[606px] h-fit overflow-auto custom-scroll"
	>
		<div class="flex flex-col gap-4 justify-between text-black p-4 h-[100vh]">
			<div class="flex flex-col gap-4">
				<span class="text-[24px] font-semibold leading-8">{title}</span>
				<div class="flex flex-col gap-4">
					<Fields bind:fields />
				</div>
			</div>
			<div class="flex flex-row gap-3 w-full px-6 font-semibold leading-6 mt-10 pb-10">
				<button
					on:click={hideEditModal}
					class="rounded-lg border-[1px] border-black w-full py-3 max-h-[44px] flex items-center justify-center"
					>Cancel</button
				>
				<button
					on:click={handleUpdate}
					class="rounded-lg bg-yellow w-full py-3 max-h-[44px] flex items-center justify-center"
					>Confirm</button
				>
			</div>
		</div>
	</div>
</div>
