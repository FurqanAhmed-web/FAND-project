<script>
	import { both, equals, is, values } from 'ramda';
	import { createEventDispatcher, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let headers = [];
	export let records = [];

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		weekday: 'short'
	});

	let currentRoute, editIcon, deleteIcon, reportIcon;
	let noDeleteOption = false,
		hasReport = false,
		hasConversation = false;

	let cellwidth = 180;
	let modalContainer;
	let isMainImageLoaded = false;

	let refs = {
		table: null,
		theaders: [],
		trows: []
	};

	let options = {
		id: null,
		modal: false,
		visible: false
	};

	let rightPosition, extraWidth;

	let unsubscribe = page.subscribe(() => {
		currentRoute = $page.route.id;

		if (currentRoute.includes('organization/') || currentRoute.includes('teams')) {
			noDeleteOption = true;
		}
		/* 
      else if (currentRoute.includes('campaigns/') && !currentRoute.includes('admin')) {
        hasReport = true;
      } 
      else if (currentRoute.includes('admin/athletes') && currentRoute.includes('admin')){
        hasConversation = true
      }
    */
	});

	onMount(() => {
		extraWidth = headers.length * cellwidth;
		rightPosition = extraWidth + 20;
		refs.table.style.setProperty('--extra-width', `${extraWidth}px`);

		window.addEventListener('click', (e) => {
			if (!modalContainer) return;

			if (e.target.id !== 'show-modal' && !modalContainer.contains(e.target)) {
				options.modal = false;
			}
		});

		refs.table.addEventListener('mouseleave', () => {
			options.id = -1;
			options.modal = false;
		});

		return unsubscribe;
	});

	const dispatch = createEventDispatcher();

	const isBoolean = is(Boolean);

	const isTrue = both(isBoolean, equals(true));

	const isFalse = both(isBoolean, equals(false));

	function isUTCDateFormat(inputString) {
		const utcDateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?$/;
		return utcDateFormatRegex.test(inputString);
	}

	const getElements = (record = {}) => {
		let elements = [];

		headers.forEach(({ name }) => {
			let value = record[name];
			if (!value) {
				elements = [
					...elements,
					{
						type: 'text',
						value: '--'
					}
				];
			} else if (name == 'hashtags' || name == 'tags') {
				elements = [
					...elements,
					{
						type: 'hashtag',
						value: value ? value : '--'
					}
				];
			} else {
				let cell = isTrue(value)
					? 'Yes'
					: isFalse(value)
					? 'No'
					: isUTCDateFormat(value)
					? dateFormatter.format(new Date(value))
					: value;

				elements = [
					...elements,
					{
						type: isBoolean(value) ? 'boolean' : 'text',
						value: cell
					}
				];
			}
		});

		return elements;
	};

	const handleScroll = (event) => {
		rightPosition = extraWidth + 20 - event.target.scrollLeft;
	};

	const handleEdit = (id) => () => {
		const rowTable = refs.trows[id];

		dispatch('edit', { id, rowTable });
		refs.trows[id].classList.add('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
		refs.trows[id].classList.replace('hover:bg-yellow-3', 'hover:bg-[#e5d388f0]');

		options.modal = false;
	};

	const handleDelete = (id) => () => {
		const rowTable = refs.trows[id];

		dispatch('delete', { id, rowTable });
		refs.trows[id].classList.add('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
		refs.trows[id].classList.replace('hover:bg-yellow-3', 'hover:bg-[#e5d388f0]');

		hideOptions();
	};

	const handleReport = (id) => () => {
		goto(`/campaigns/report/${id}`);
	};

	const handleConversation = (id) => {
		goto(`/admin/athletes/conversation/${id}`);
	};

	const handleViewMore = (id) => () => {
		dispatch('view', { id });
	};

	const hideOptions = () => {
		options.id = null;
		options.modal = false;
	};

	const handleActions = (id) => () => {
		options.modal = !options.modal;
		options.id = id;
	};

	const gotoRead = (id) => {
		goto(currentRoute.replace(`browse`, `read/${id}`));
	};

	const handleMainImageLoad = () => {
		isMainImageLoaded = true;
	};
</script>

<div class="overflow-auto custom-scroll h-[100vh]" on:scroll={handleScroll}>
	<table
		bind:this={refs.table}
		id="container"
		class="relative table-fixed table-collapse w-full overflow-auto custom-scroll"
		class:wide-table={headers.length >= 6}
	>
		<thead class="sticky top-0 w-full bg-white z-20">
			<tr
				class="border-b-[2px] border-black text-left align-top text-gray-12 text-semibold text-[16px] relative"
			>
				{#each headers as header, index}
					{#if index === 0}
						<th bind:this={refs.theaders[index]} class="pb-12 text-start pl-8">{header.label}</th>
					{:else if header.label === 'Created' || header.label === 'Updated' || header.label === 'Start' || header.label === 'End'}
						<th bind:this={refs.theaders[index]} class="pb-12 text-start w-[200px] max-w-[200px]"
							>{header.label}</th
						>
					{:else}
						<th bind:this={refs.theaders[index]} class="pb-12 text-start">{header.label}</th>
					{/if}
				{/each}
				<th class="w-[0%]" />
			</tr>
		</thead>
		<tbody class="relative text-black text-[14px] leading-8">
			{#key headers}
				{#each records as record, i (record.id)}
					<tr
						bind:this={refs.trows[record.id]}
						class="group relative hover:bg-yellow-3 border-[1px] border-gray-16 align-center"
					>
						{#each getElements(record) as { type, value }, i}
							{#if i == 0 && !(currentRoute === '/athletes/browse' || currentRoute === '/admin/athletes/browse' || currentRoute.includes('organizations/browse') || currentRoute.includes('organization/browse'))}
								<td class="py-7 max-h-[73px] pr-10 text-start pl-8">
									<div class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
										<button
											class="hover:underline underline-offset-4"
											on:click={() => gotoRead(record.id)}
										>
											<p class="font-bold text-[16px] leading-5">{value}</p>
										</button>
									</div>
								</td>
							{:else if i == 0 && currentRoute !== '/campaigns/athletes/browse'}
								<td class="py-7 max-h-[73px] pr-10 text-start pl-8">
									<div class="overflow-hidden">
										{#if is(String)(value) && value?.includes('https://') && !value?.includes('null')}
											<img
												class="w-10 h-10 max-w-[40px] rounded-full"
												src={isMainImageLoaded ? value : '/images/icons/athletes.svg'}
												alt="profile"
												on:load={handleMainImageLoad}
											/>
										{:else}
											<img
												class="w-10 h-10 max-w-[40px] rounded-full"
												src="/images/icons/athletes.svg"
												alt="profile"
											/>
										{/if}
									</div>
								</td>
							{:else if i === 1 && (currentRoute === '/athletes/browse' || currentRoute === '/admin/athletes/browse' || currentRoute.includes('organizations/browse') || currentRoute.includes('organization/browse'))}
								<td class="py-7 max-h-[73px] pr-10 text-start">
									<div class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
										<button
											class="hover:underline underline-offset-4"
											on:click={() => gotoRead(record.id)}
										>
											<p class="font-bold text-[16px] leading-5">{value}</p>
										</button>
									</div>
								</td>
							{:else if equals('boolean')(type)}
								<td class="py-7 text-start">
									<div class="truncate text-ellipsis overflow-hidden whitespace-nowrap">
										<p class="text-[16px] leading-5">{value}</p>
									</div>
								</td>
							{:else if type === 'hashtag' || type === 'tag'}
								<td class="py-7 pr-10 text-start">
									<div
										class="flex flex-row gap-2 whitespace-no wraptext-[16px] leading-5 overflow-hidden"
									>
										{#each value.split(',') as hashtag, i}
											{#if i !== 3}
												<span class="py-1 px-2 rounded-md bg-gray-3">{hashtag}</span>
											{/if}
										{/each}
									</div>
								</td>
							{:else}
								<td class="py-7 pr-10 text-start">
									<div class="truncate whitespace-nowrap">
										<span class="text-[16px] leading-5 text-ellipsis overflow-hidden">{value}</span>
									</div>
								</td>
							{/if}
						{/each}
						<td class="relative text-center pr-6 pointer-events-none">
							<button
								on:click={handleActions(record.id)}
								class="hidden group-hover:block options-button pointer-events-auto relative w-fit h-fit"
								style="right: 20px"
							>
								<div
									id="show-modal"
									class="flex items-center justify-end w-[120px] h-[120px] top-0 bottom-0 m-auto absolute -right-[18px]"
								>
									<img
										class="relative right-5"
										id="show-modal"
										src="/images/icons/triple-dot.svg"
										alt="triple dot"
									/>
								</div>
							</button>

							<!-- Options Modal -->
							{#if options.modal && options.id == record.id}
								<div
									bind:this={modalContainer}
									class="pointer-events-auto z-50 absolute top-14 rounded-md overflow-hidden m-auto w-[212px] max-w-[212px] h-fit bg-white border-[1px] border-black"
									style="right:20px"
								>
									<!-- svelte-ignore a11y-mouse-events-have-key-events -->
									<button
										type="button"
										on:click={handleEdit(record.id)}
										on:mouseover={() => {
											editIcon.src = '/images/icons/edit-white.svg';
										}}
										on:mouseleave={() => {
											editIcon.src = '/images/icons/edit-yellow.svg';
										}}
										class="hover:bg-yellow w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
									>
										<img bind:this={editIcon} src="/images/icons/edit-yellow.svg" alt="edit" />
										Edit
									</button>
									<div />
									{#if !noDeleteOption}
										<div class="w-full h-[1px] bg-black" />
										<!-- svelte-ignore a11y-mouse-events-have-key-events -->
										<button
											type="button"
											on:click={handleDelete(record.id)}
											on:mouseover={() => {
												deleteIcon.src = '/images/icons/delete-white.svg';
											}}
											on:mouseleave={() => {
												deleteIcon.src = '/images/icons/delete-yellow.svg';
											}}
											class="hover:bg-yellow w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
										>
											<img
												bind:this={deleteIcon}
												src="/images/icons/delete-yellow.svg"
												alt="delete"
											/>
											Delete
										</button>
									{/if}
									{#if hasReport}
										<div class="w-full h-[1px] bg-black" />
										<!-- svelte-ignore a11y-mouse-events-have-key-events -->
										<button
											type="button"
											on:click={handleReport(record.id)}
											on:mouseover={() => {
												reportIcon.src = '/images/icons/report-white.svg';
											}}
											on:mouseleave={() => {
												reportIcon.src = '/images/icons/report-yellow.svg';
											}}
											class="hover:bg-yellow w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
										>
											<img
												bind:this={reportIcon}
												src="/images/icons/report-yellow.svg"
												alt="report"
											/>
											Report
										</button>
									{/if}
									{#if hasConversation}
										<div class="w-full h-[1px] bg-black" />
										<!-- svelte-ignore a11y-mouse-events-have-key-events -->
										<button
											type="button"
											on:click={handleConversation(record.id)}
											on:mouseover={() => {
												reportIcon.src = '/images/icons/report-white.svg';
											}}
											on:mouseleave={() => {
												reportIcon.src = '/images/icons/report-yellow.svg';
											}}
											class="hover:bg-yellow w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
										>
											<img
												bind:this={reportIcon}
												src="/images/icons/report-yellow.svg"
												alt="report"
											/>
											Conversaion
										</button>
									{/if}
								</div>
							{/if}
						</td>
					</tr>
				{/each}
			{/key}
		</tbody>
	</table>
</div>

<style>
	.wide-table {
		width: calc(100% + var(--extra-width, 0px));
	}
</style>
