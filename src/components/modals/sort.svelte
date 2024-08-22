<script>
	import { showSort } from '$lib/store';
	import { onMount, createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { toastError, toastErrorText } from '$lib/store';

	export let checkboxes = [];
	export let headers = [];
	let sortContainer,
		exceeds = false;
	let selectedCheckboxes = [];

	onMount(() => {
		headers.forEach((item, i) => {
			let index;
			index = checkboxes.findIndex((name) => name === item.label);
			selectedCheckboxes[i] = index;
		});

		window.addEventListener('click', (e) => {
			if (!sortContainer) return;
      
			if (
				e.target.id !== 'filterButton' &&
				e.target.id !== 'sort-container' &&
				!sortContainer.contains(e.target)
			) {
				showSort.set(false);
			}
		});
	});

	const dispatch = createEventDispatcher();

	const toggleCheckbox = (index) => {
		if (selectedCheckboxes.includes(index)) {
			selectedCheckboxes = selectedCheckboxes.filter((item) => item !== index);
		} else {
			selectedCheckboxes = [...selectedCheckboxes, index];
		}
	};

	const hideSortModal = () => {
		showSort.set(false);
	};

	const handleConfirm = () => {
		let labels = [];

		selectedCheckboxes.forEach((i) => {
			labels.push(checkboxes[i]);

			if (!(labels.length > 5)) {
				dispatch('confirm', { labels });
				showSort.set(false);
			} else {
				exceeds = true;
				showSort.set(true);
				toastError.set(true);
				toastErrorText.set("You've exceeded the column's maximum limit (5).");
			}
		});
	};
</script>

<div
	class="max-h-[392px] absolute top-0 -left-6 m-auto max-w-[366px] h-fit w-full bg-white z-50 rounded-xl border-[1px] border-black"
>
	<div id="sort-container" bind:this={sortContainer} class="flex flex-col w-full gap-4 p-6">
		<div class="flex flex-col">
			<span class="text-gray-13 text-[18px] font-semibold leading-7">Filter by</span>
		</div>
		<div class="overflow-auto custom-scroll max-h-[160px]">
			<div
				class="font-medium leading-6 text-gray-11 flex flex-row flex-wrap gap-y-3 whitespace-nowrap"
			>
				{#each checkboxes as checkbox, index}
					<label
						for={`checkbox-${index}`}
						class="relative flex flex-row items-center gap-3 w-full font-medium text-black"
					>
						<input
							id={`checkbox-${index}`}
							class="w-5 h-5 min-w-[20px] appearance-none border-[1px] rounded-md {exceeds &&
							!selectedCheckboxes.includes(index)
								? 'border-error'
								: 'border-gray-2'}"
							type="checkbox"
							on:change={() => toggleCheckbox(index)}
							checked={selectedCheckboxes.includes(index)}
						/>
						<img
							class="absolute left-1 w-3.5"
							src="/images/icons/check.svg"
							alt="check"
							style="display: {selectedCheckboxes.includes(index) ? 'block' : 'none'};"
						/>
						{checkbox}
					</label>
				{/each}
			</div>
		</div>
		<div class="flex flex-col gap-8">
			<small class="text-gray-12 text-[14px] leading-5">You can only select up to 5 items</small>
			<div class="flex flex-row gap-3 leading-6 font-semibold">
				<button
					class="w-full py-3 max-h-[44px] border-[1px] border-black flex items-center justify-center rounded-lg"
					on:click={hideSortModal}
					type="button"
				>
					Cancel
				</button>
				<button
					on:click={handleConfirm}
					class="w-full py-3 max-h-[44px] bg-yellow flex items-center justify-center rounded-lg"
					type="button"
					>Confirm
				</button>
			</div>
		</div>
	</div>
</div>
