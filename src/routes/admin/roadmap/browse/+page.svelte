<script>
	import Pagination from '../../../../components/pagination.svelte';
	import SearchFilter from '../../../../components/searchFilter.svelte';
  import { getContext, onMount } from 'svelte';
  import { paginateData } from "$lib/paginate"
	import Delete from '../../../../components/modals/delete.svelte';
	import Sort from '../../../../components/modals/sort.svelte';
	import Edit from '../../../../components/modals/edit.svelte';
	import Table from '../../../../components/table.svelte';
  import {
		showDelete,
		showSort,
		showEdit,
		toastSuccess,
		toastSuccessText,
		toastError,
		toastErrorText
	} from '$lib/store';
	import { SupabaseService } from '../../../../lib/supabase';
	import { getRoadmapFields, validateAndFormat } from '../../../../helpers/fields';
	import { asyncTryCatchToast } from '../../../../lib/utils';

  export let data

  let selectedRow, mainContainer
  let editID, deleteID
  let shownHeaders = [], displayedData = [];
  let currentPage = 1;
  const itemsPerPage = 10;
  let totalItems, totalPages
  
  let roadmaps = getContext('product_notes')
  let status = getContext('product_status')

  let roadmapService
  let editableFields = []

  let loading = {
		updating: false
	};

  const headers =  [
    {name: "title", label: "Title"},
    {name: "description", label:"Description"},
    {name: "additional_notes", label:"Additional Notes"},
    {name: "status", label:"Status"},
    {name: "tags", label:"Tags"},
    {name: "ispublic", label:"Public"},
    {name: "created_at", label:"Created At"},
    {name: "updated_at", label:"Updated At"},
  ]

  for (let i = 0; i < 5; i++) {
    shownHeaders.push(headers[i]);
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      displayedData = paginateData(bodyContent, currentPage, itemsPerPage);
    }
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

  const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			$roadmaps = await roadmapService.search(keyword, 'title');
		} else {
			$roadmaps = await roadmapService.get();
		}
	};

	const handleEdit = ({ detail: { id, rowTable } }) => {
		editableFields = getRoadmapFields({
			status: $status,
			editable: true,
			data: $roadmaps.find((e) => e.id == id)
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
				await roadmapService.update(editID, { ...data, updated_at: new Date().toISOString() });
				roadmaps.set(await roadmapService.get());
				showEdit.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: 'Roadmap Updated Successfully'
			}
		);
	};

  const handleDelete = ({ detail: { id, rowTable } }) => {
		deleteID = id;
		$showDelete = true;
    selectedRow = rowTable
	};

  const deleteRoadmap = async () => {
		asyncTryCatchToast(
			async () => {
				await roadmapService.delete(deleteID);
				roadmaps.set(await roadmapService.get());
				showDelete.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: 'Roadmap Deleted'
			}
		);
	};

  const getType = (id, arr) => {
		if (id) {
			const el = arr?.find((e) => e.id == id);
			if (el) {
				return el.name || el.type;
			}
			return '';
		}
		return '';
	};

  const formatRoadmap = (arr) => {
		return arr
			.map((e) => {
				return {
					...e,
					status: getType(e.status, $status),
				};
			})
			.sort((a, b) => b.id - a.id);
	};

  const setPaginatedData = () => {
		totalItems = $roadmaps.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);
		displayedData = paginateData(formatRoadmap($roadmaps), currentPage, itemsPerPage).sort((a,b)=> b.id - a.id);
	};

  $:{
    if($roadmaps){
      setPaginatedData()
    }
  }

  onMount(async () => {
		roadmapService = new SupabaseService(data.supabase, 'product_notes');
	});
</script>

<div
  bind:this={mainContainer} 
  class="flex flex-col max-h-screen relative">
  
  <div class="flex flex-col overflow-auto">
    <div class="flex flex-col gap-8 p-10 pl-8 h-auto">
      <div class="flex flex-row justify-between">
        <span class="text-[36px] font-bold leading-8 w-full ">Roadmap</span>
        <div class="flex flex-row gap-10 items-center w-full max-w-[88px]">
          <a href="/admin/roadmap/add" class="flex flex-row gap-0.5 items-center justify-center text-[12px] text-center leading-normal font-semibold bg-yellow rounded-md w-full py-2">
            <img src="/images/icons/plus-black.svg" alt="add">
            <span class="h-fit relative top-[1px]">Add</span>
          </a>
        </div>
      </div>
      <div class="flex flex-row gap-20 justify-between items-start">
        <p class="text-[14px] leading-5 font-medium text-black max-w-[356px]">Championing athletes' feats, training, and passion. Inspiration awaits in their victorious stories.</p>
        <div class="flex flex-row gap-4 w-full justify-end items-center relative max-w-[376px]">
          <SearchFilter 
            placeholder={"Search Title"}
            on:search={handleSearch}
          />
          <button class="max-w-6 h-auto" on:click={showSortModal}>
						<img id="filterButton" src="/images/icons/filter.svg" alt="filter icon" />
					</button>
					{#if $showSort === true}
						<Sort
							checkboxes={
                headers.map((e)=> e.label)
              }
							on:confirm={handleSort}
							headers={shownHeaders}
						/>
					{/if}
        </div>
      </div>
    </div>
    
    <Table
      headers={shownHeaders}
      records={displayedData}
      on:edit={handleEdit}
      on:delete={handleDelete}
    />

  </div>

  {#if $showEdit}
    <Edit
      name="product_notes"
      title={'Edit Roadmap'}
      bind:fields={editableFields}
      bind:selectedRow
      on:update={handleUpdate}
    />
  {/if}

  <Pagination
    {currentPage} 
    {totalPages} 
    {goToPage}
  />
</div>

{#if $showDelete}
  <Delete 
    {selectedRow} 
    on:confirm={deleteRoadmap}
  />
{/if}