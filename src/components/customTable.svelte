<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { is } from 'ramda';

	export let tableHeaderRow = [];
	export let tableBody = [];
	let currentRow;
	let showDeleteModal = false;

	onMount(() => {
		const container = document.getElementById('container');
		const table = document.querySelector('#container table');
		const tableRow = document.querySelectorAll('#item-container tr');
		const optionsContainer = document.getElementById('options-container');
		const optionsButton = document.createElement('button');
		const optionsImg = document.createElement('img');
		const tableHeaders = table.querySelectorAll('thead tr th');
		const extraWidth = tableHeaders.length * 200;

		optionsImg.src = '/images/icons/triple-dot.svg';
		optionsButton.classList.add('absolute', 'pointer-events-auto');
		optionsButton.appendChild(optionsImg);

		//for floationg option button
		if (
			window.location.pathname.includes('athletes') ||
			window.location.pathname.includes('campaigns') ||
			window.location.pathname.includes('organizations')
		) {
			optionsButton.style.right = `${extraWidth + 20}px`;
			optionsContainer.style.right = `${extraWidth + 20}px`;

			container.addEventListener('scroll', () => {
				const rightPosition = container.scrollLeft;
				optionsButton.style.right = `${extraWidth + 20 - rightPosition}px`;
				optionsContainer.style.right = `${extraWidth + 20 - rightPosition}px`;
			});
		} else {
			optionsButton.style.right = `20px`;
			optionsContainer.style.right = `20px`;
		}

		tableRow.forEach((item) => {
			item.addEventListener('mouseenter', () => {
				const tdEl = item.querySelectorAll('td');
				tdEl[tdEl.length - 1].appendChild(optionsButton);
				optionsButton.classList.remove('hidden');

				optionsButton.addEventListener('click', () => {
					tdEl[tdEl.length - 1].append(optionsContainer);
					optionsButton.classList.add('hidden');
					optionsContainer.classList.remove('hidden');
				});
			});
		});

		if (
			!(
				window.location.pathname.includes('subscription') ||
				window.location.pathname.includes('media') ||
				window.location.pathname.includes('roadmap') ||
				window.location.pathname.includes('prompt')
			)
		) {
			table.style.setProperty('--extra-width', `${extraWidth}px`);
		}

		document.addEventListener('click', (event) => {
			const isClickedOutside =
				!optionsButton.contains(event.target) && !optionsContainer.contains(event.target);

			if (isClickedOutside) {
				optionsContainer.classList.add('hidden');
			}
		});
	});

	const handleGotoRead = () => {
		if (window.location.pathname.includes('admin')) {
			const path = window.location.pathname.split('/')[2];
			goto(`/admin/${path}/read/${currentRow}`);
		} else if (window.location.pathname.includes('campaigns/athletes/browse')) {
			const path = window.location.pathname.split('/')[2];
			goto(`/campaigns/${path}/read/${currentRow}`);
		} else {
			const path = window.location.pathname.split('/')[1];
			goto(`/${path}/read/${currentRow}`);
		}
	};

	const handleGotoEdit = () => {
		if (window.location.pathname.includes('admin')) {
			const path = window.location.pathname.split('/')[2];
			goto(`/admin/${path}/edit/${currentRow}`);
		} else if (window.location.pathname.includes('campaigns/athletes/browse')) {
			const path = window.location.pathname.split('/')[2];
			goto(`/campaigns/${path}/edit/${currentRow}`);
		} else {
			const path = window.location.pathname.split('/')[1];
			goto(`/${path}/edit/${currentRow}`);
		}
	};

	const setCurrentRow = (index) => {
		currentRow = index;
	};

	const showDelete = () => {
		const optionsContainer = document.getElementById('options-container');
		const tableRow = document.querySelectorAll('#item-container tr');

		optionsContainer.classList.add('hidden');
		showDeleteModal = true;

		tableRow[currentRow].classList.add('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
		tableRow[currentRow].classList.replace('hover:bg-yellow-3', 'hover:bg-[#e5d388f0]');
	};

	const hideDelete = () => {
		const tableRow = document.querySelectorAll('#item-container tr');

		showDeleteModal = false;

		tableRow[currentRow].classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
		tableRow[currentRow].classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
	};
</script>

<div id="container" class="overflow-auto custom-scroll h-auto mt-6">
	<table class="relative table-fixed table-collapse w-full overflow-auto custom-scroll">
		<thead class="sticky top-0 w-full bg-white z-20">
			<tr
				class="border-b-[2px] border-black text-left align-top text-gray-12 text-semibold text-[16px] relative"
			>
				{#each tableHeaderRow as tableHeader, index}
					{#if index === 0}
						<th class="w-[{tableHeader.size}] pb-12 text-start pl-8">{tableHeader.name}</th>
					{:else}
						<th class="w-[{tableHeader.size}] pb-12 text-start">{tableHeader.name}</th>
					{/if}
				{/each}
				<th class="w-[1%] text-end pr-6" />
			</tr>
		</thead>
		<tbody id="item-container" class="relative text-black text-[14px] leading-8">
			{#each tableBody as content, index}
				<tr
					on:click={() => setCurrentRow(index)}
					class="relative hover:bg-yellow-3 border-[1px] border-gray-16 align-center"
				>
					{#each content as mainContent, index}
						{#if index === 0}
							{#if is(String)(mainContent) && (mainContent?.includes('.png') || mainContent?.includes('.jpg'))}
								<td class="py-5 px-8">
									<div class="w-fit max-w-[40px]">
										<img
											class="w-full rounded-full"
											src="/images/{mainContent}"
											alt={mainContent}
										/>
									</div>
								</td>
							{:else}
								<td class="py-5 pl-8 h-20 max-h-[80px]">
									<div class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
										<p class="text-[16px] leading-5 font-bold">{mainContent}</p>
									</div>
								</td>
							{/if}
						{:else if mainContent === true}
							<td class="py-5">
								<div class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
									<p class="text-[16px] leading-5">Yes</p>
								</div>
							</td>
						{:else if mainContent === false}
							<td class="py-5">
								<div class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
									<p class="text-[16px] leading-5" />
								</div>
							</td>
						{:else if is(String)(mainContent) && (mainContent?.includes('.png') || mainContent?.includes('.jpg'))}
							<td class="py-5 px-8">
								<div class="w-fit max-w-[40px]">
									<img class="w-full rounded-full" src="/images/{mainContent}" alt={mainContent} />
								</div>
							</td>
						{:else}
							<td class="py-5 pr-10">
								<div class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
									<p class="text-[16px] leading-5">{mainContent}</p>
								</div>
							</td>
						{/if}
					{/each}
					<td class="py-5 text-end pr-6 pointer-events-none" />
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div
	id="options-container"
	class="pointer-events-auto hidden z-50 absolute top-0 bottom-0 rounded-md overflow-hidden m-auto min-w-[212x] w-full max-w-[212px] h-fit bg-white border-[1px] border-black"
>
	<button
		on:click={handleGotoEdit}
		type="button"
		class="w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
	>
		<img src="/images/icons/edit-yellow.svg" alt="edit" />
		Edit
	</button>
	<div class="w-full h-[1px] bg-black" />
	<button
		on:click={handleGotoRead}
		type="button"
		class="w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
	>
		<img src="/images/icons/eye.svg" alt="view more" />
		View More
	</button>
	<div class="w-full h-[1px] bg-black" />
	<button
		on:click={showDelete}
		type="button"
		class="w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
	>
		<img src="/images/icons/delete-yellow.svg" alt="delete" />
		Delete
	</button>
</div>

{#if showDeleteModal === true}
	<div
		id="delete-overlay"
		class="z-20 bg-black-3 w-full h-auto absolute top-0 right-0 left-0 bottom-0 m-auto"
	/>
	<div
		id="delete-modal"
		class="pointer-events-auto flex flex-col gap-8 p-6 w-full max-w-[366px] 2xl:scale-125 bg-white rounded-[12px] h-auto max-h-[176px] z-50 absolute top-0 right-0 left-0 bottom-0 m-auto"
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
				class="max-h-[44px] z-50 cursor-pointer border-[1px] border-yellow bg-yellow shadow-sm rounded-lg w-full h-full py-[18px] flex items-center justify-center"
				>Confirm</button
			>
		</div>
	</div>
{/if}

<style>
	#container table {
		width: calc(100% + var(--extra-width, 0px));
	}
</style>
