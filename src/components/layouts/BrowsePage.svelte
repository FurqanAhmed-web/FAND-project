<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { populateFieldsToDB, validate } from '../../helpers/form';
	import { page } from '$app/stores';
	// Lib
	import { paginateData } from '$lib/paginate';
	import { showDelete, showEdit, showSort, toastError, toastErrorText } from '$lib/store';
	import { asyncTryCatchToast } from '$lib/utils';
	// Components
	import Delete from '../modals/delete.svelte';
	import Edit from '../modals/edit.svelte';
	import Sort from '../modals/sort.svelte';
	import Pagination from '../pagination.svelte';
	import SearchFilter from '../searchFilter.svelte';
	import Table from '../table.svelte';
	import Breadcrumb from '../ui/breadcrumb.svelte';

	// Props
	export let title = ''; // Page title
	export let description = ''; // Page description
	export let fields = []; // Fields for edit form
	export let headers = []; // table headers
	export let records = []; // table records
	export let options = {
		updateModalTitle: '',
		deleteSuccessText: '',
		searchPlaceholder: ''
	};
	export let links = []; // [{name, url, isAdd (for add icon)}]
	export let isBreadcrumb = true;
	export let isAdd = true;

	const dispatch = createEventDispatcher();

	let mainContainer;

	let selectedRow;
	let deleteID, editID;

	let displayedData = [];
	let totalItems, totalPages;
	const itemsPerPage = 10;
	let currentPage = 1;

	let shownHeaders = [];

	let loading = {
		updating: false
	};

	// URLS
	const getViewURL = (id) => {
		let currentPageRoute = window.location.pathname;
		return currentPageRoute.replace('browse', `read/${id}`);
	};
	const getAddURL = () => {
		let currentPageRoute = window.location.pathname;
		return currentPageRoute.replace('browse', 'add');
	};

	// Pagination
	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			displayedData = paginateData(records, currentPage, itemsPerPage);
		}
	};

	const setPaginatedData = () => {
		totalItems = records.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);
		displayedData = paginateData(records, currentPage, itemsPerPage);
	};

	$: {
		if (records) {
			setPaginatedData();
		}
	}
	// Sort
	for (let i = 0; i < 5; i++) {
		shownHeaders.push(headers[i]);
	}

	const showSortModal = () => {
		showSort.set(!$showSort);
	};

	const handleSort = ({ detail: { labels } }) => {
		const indexes = labels
			.map((name) => headers.findIndex((header) => name === header.label))
			.sort((a, b) => a - b);
		shownHeaders = indexes.map((index) => headers[index]);
	};

	// Search
	const handleSearch = async ({ detail: { keyword } }) => {
		dispatch('search', { keyword });
	};

	// View
	const handleView = ({ detail: { id } }) => {
		goto(getViewURL(id));
	};

	const handleEditModal = ({ detail: { id, rowTable } }) => {
		dispatch('clickedit', { id });
		editID = id;
		showEdit.set(true);
		selectedRow = rowTable;
	};

	const handleDeleteModal = ({ detail: { id, rowTable } }) => {
		deleteID = id;
		showDelete.set(true);
		selectedRow = rowTable;
	};

	const handleUpdate = async ({ detail }) => {
		const e = validate(detail.fields);

		if (e.error) {
			fields = e.fields;
			toastError.set(true);
			toastErrorText.set(e.error);
			return;
		}

		loading.updating = true;

		const data = populateFieldsToDB(detail.fields);

		dispatch('update', {
			editID,
			data,
			fields: detail.fields,
			onComplete: () => {
				showEdit.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			}
		});
	};

	const handleDelete = async () => {
		asyncTryCatchToast(
			async () => {
				dispatch('delete', {
					deleteID
				});
				showDelete.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: options.deleteSuccessText || 'Deleted'
			}
		);
	};
</script>

<div bind:this={mainContainer} class="flex flex-col gap-0 max-h-screen overflow-hidden relative">
	<div class="flex flex-col overflow-auto">
		<div class="flex flex-col gap-6 p-10 pl-8 h-auto">
			{#if isBreadcrumb}
				<Breadcrumb />
			{/if}
			<div class="flex flex-row justify-between gap-4">
				<span class="text-[36px] font-bold leading-8 w-full">{title}</span>
				{#each links as { name, url, isAdd } (url)}
					<div class="flex flex-row gap-10 w-full max-w-[200px] items-start">
						{#if isAdd}
							<img src="/images/icons/plus-black.svg" alt="add" />
						{/if}
						<a
							href={url}
							class="h-10 flex flex-row gap-0.5 items-center justify-center text-[12px] text-center leading-normal font-semibold bg-yellow rounded-md w-full py-2"
						>
							<span class="h-fit relative top-[1px]">{name}</span>
						</a>
					</div>
				{/each}
				{#if isAdd}
					<div class="flex flex-row gap-10 items-center w-full max-w-[88px]">
						<a
							href={getAddURL()}
							class="h-10 flex flex-row gap-0.5 items-center justify-center text-[12px] text-center leading-normal font-semibold bg-yellow rounded-md w-full py-2"
						>
							<img src="/images/icons/plus-black.svg" alt="add" />
							<span class="h-fit relative top-[1px]">Add</span>
						</a>
					</div>
				{/if}
			</div>
			<div class="flex flex-row gap-20 justify-between items-start">
				<p class="text-[14px] leading-5 font-medium text-black max-w-[356px]">
					{description}
				</p>
				<div class="flex flex-row gap-4 w-full justify-end items-center">
					<div class="flex flex-row gap-4 w-full justify-end items-center relative max-w-[376px]">
						<SearchFilter
							placeholder={options.searchPlaceholder || 'Search'}
							on:search={handleSearch}
						/>
						<button class="max-w-6 h-auto" on:click={showSortModal}>
							<img id="filterButton" src="/images/icons/filter.svg" alt="filter icon" />
						</button>
						{#if $showSort === true}
							<Sort
								checkboxes={headers.map((e) => e.label)}
								on:confirm={handleSort}
								headers={shownHeaders}
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<Table
			on:edit={handleEditModal}
			on:delete={handleDeleteModal}
			on:view={handleView}
			headers={shownHeaders}
			records={displayedData}
		/>
	</div>
	<Pagination {currentPage} {totalPages} {goToPage} />
</div>

{#if $showEdit}
	<Edit
		name={$page.route.id.replace('/browse', '')}
		title={options.updateModalTitle || 'Edit'}
		bind:fields
		bind:selectedRow
		on:update={handleUpdate}
	/>
{/if}

{#if $showDelete}
	<Delete {selectedRow} on:confirm={handleDelete} />
{/if}
