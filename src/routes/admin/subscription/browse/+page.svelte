<script>
	import Pagination from '../../../../components/pagination.svelte';
	import SearchFilter from '../../../../components/searchFilter.svelte';
  import { getContext, onMount } from 'svelte';
  import { showDelete, showSort, showEdit } from "$lib/store"
  import { paginateData } from "$lib/paginate"
	import OptionsModal from '../../../../components/modals/optionsModal.svelte';
	import Delete from '../../../../components/modals/delete.svelte';
	import Sort from '../../../../components/modals/sort.svelte';
	import Edit from '../../../../components/modals/edit.svelte';
  import { goto } from '$app/navigation'
	import Table from '../../../../components/table.svelte';
	import { asyncTryCatchToast } from '../../../../lib/utils';
	import { SupabaseService } from '../../../../lib/supabase';
	import { getSubscriptionFields, validateAndFormat } from '../../../../helpers/fields';

  export let data

  let plans = getContext('plans')
  let table, planService

  let selectedRow
  let shownHeaders = []
  let editableFields = []

	let loading = {
		updating: false
	};

	let deleteID, editID;

  let displayedData = [];
  let totalItems, totalPages;
  const itemsPerPage = 10;
  let currentPage = 1;

  const headers =  [
    {label: "Type", name: "type"},
  ]

  for (let i = 0; i < headers.length; i++) {
    shownHeaders.push(headers[i]);
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      displayedData = paginateData(displayedData, currentPage, itemsPerPage);
    }
  }

  const showSortModal = () =>{
    showSort.set(!$showSort)
  }

  const handleSort = ({ detail: { labels } }) => {
		const indexes = labels
			.map((name) => headers.findIndex((header) => name === header.label))
			.sort((a, b) => a - b);
		shownHeaders = indexes.map((index) => headers[index]);
	};

  const setPaginatedData = () => {
		totalItems = $plans.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);
		displayedData = paginateData($plans, currentPage, itemsPerPage).sort((a,b)=> b.id - a.id);
	};
  
  $:{
    if($plans){
      setPaginatedData()
    }
  }

	const handleEdit = ({ detail: { id, rowTable } }) => {
		editableFields = getSubscriptionFields({
			editable: true,
			data: $plans.find((e) => e.id == id)
		});

		showEdit.set(true);
		editID = id;
		selectedRow = rowTable;
	};

  const handleUpdate = async ({ detail: { fields } }) => {
		const e = validateAndFormat(fields);

		const { error, data } = e;

		if (error) {
			editableFields = e.fields;
			toastError.set(true);
			toastErrorText.set(error);
			return;
		}

		loading.updating = true;

		asyncTryCatchToast(
			async () => {
				await planService.update(editID, { ...data });
				plans.set(await planService.get());
				showEdit.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: 'Subscription Updated Successfully'
			}
		);
	};

  const handleDelete = ({ detail: { id, rowTable } }) => {
		deleteID = id;
		$showDelete = true;
		selectedRow = rowTable;
	};

  const handleSearch = ({ detail: { keyword } }) => {
		const lowerCased = keyword.toLowerCase();
    let filteredData

		if (lowerCased == '' || lowerCased == ' ') {
			totalItems = $plans.length;
			totalPages = Math.ceil(totalItems / itemsPerPage);
			displayedData = paginateData($plans, currentPage, itemsPerPage).sort(
				(a, b) => b.id - a.id
			);
		} else {
			filteredData = displayedData.filter((data) => {
				for (const key in data) {
					if (data[key] && data[key].toString().toLowerCase().includes(lowerCased)) {
						return true;
					}
				}
				return false;
			});
			currentPage = 1;
			totalPages = Math.ceil(filteredData.length / itemsPerPage);
			displayedData = filteredData;
		}
	};

  const deleteSubscription = async () => {
		asyncTryCatchToast(
			async () => {
				await planService.delete(deleteID);
				plans.set(await planService.get());
				showDelete.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: 'A subscription has been deleted'
			}
		);
	};

  onMount(async()=>{
    planService = new SupabaseService(data.supabase, 'plans')
  })
</script>

<div 
  class="flex flex-col max-h-screen 2xl:pb-5 relative">
  
  <div class="flex flex-col overflow-auto">
    <div class="flex flex-col gap-8 p-10 pl-8 h-auto">
      <div class="flex flex-row justify-between">
        <span class="text-[36px] font-bold leading-8 w-full">Subscription</span>
        <div class="flex flex-row gap-10 items-center w-full max-w-[88px]">
          <a href="/admin/subscription/add" class="flex flex-row gap-0.5 items-center justify-center text-[12px] text-center leading-normal font-semibold bg-yellow rounded-md w-full py-2">
            <img src="/images/icons/plus-black.svg" alt="add">
            <span class="h-fit relative top-[1px]">Add</span>
          </a>
        </div>
      </div>
      <div class="flex flex-row gap-20 justify-between items-start">
        <p class="text-[14px] leading-5 font-medium text-black max-w-[356px]">Championing athletes' feats, training, and passion. Inspiration awaits in their victorious stories.</p>
        <div class="flex flex-row gap-4 w-full justify-end items-center relative max-w-[376px]">
          <SearchFilter 
            placeholder={"Search Subcription Type"}
            on:search={handleSearch}
          />
          <button class="max-w-6 h-auto" on:click={showSortModal}>
						<img id="filterButton" src="/images/icons/filter.svg" alt="filter icon" />
					</button>
          {#if $showSort}
						<Sort
							checkboxes={[
								'Type'
							]}
							headers={shownHeaders}
              on:confirm={handleSort}
						/>
					{/if}
        </div>
      </div>
    </div>
    
    <Table
      bind:this={table}
      headers={shownHeaders}
      records={displayedData}
      on:edit={handleEdit}
      on:delete={handleDelete}
    />
  </div>
  
  {#if $showEdit}
    <Edit
				name="subscription"
				title={'Edit Subscription'}
				bind:fields={editableFields}
				bind:selectedRow
				on:update={handleUpdate}
			/>
  {/if}

  <Pagination
    goToPage={goToPage}
    currentPage={currentPage}
  />
</div>

{#if $showDelete}
  <Delete 
    {selectedRow}
    on:confirm={deleteSubscription}
  />
{/if}
