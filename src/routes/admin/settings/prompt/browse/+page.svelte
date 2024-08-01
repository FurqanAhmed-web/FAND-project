<script>
	import Pagination from '../../../../../components/pagination.svelte';
	import SearchFilter from '../../../../../components/searchFilter.svelte';
  import { getContext, onMount } from 'svelte';
  import { paginateData } from "$lib/paginate"
	import { SupabaseService } from '$lib/supabase';
	import OptionsModal from '../../../../../components/modals/optionsModal.svelte';
	import Delete from '../../../../../components/modals/delete.svelte';
	import Sort from '../../../../../components/modals/sort.svelte';
	import Edit from '../../../../../components/modals/edit.svelte';
	import Table from '../../../../../components/table.svelte';
  import { goto } from "$app/navigation"
  import {
		showDelete,
		showSort,
		showEdit,
		toastSuccess,
		toastSuccessText,
		toastError,
		toastErrorText
	} from '$lib/store';
	import { getPromptFields, validateAndFormat } from '../../../../../helpers/fields';
	import { asyncTryCatchToast } from '../../../../../lib/utils';
  
  export let data

  let loading = {
		updating: false
	};

  let selectedRow, mainContainer
  let displayedData = [], editableFields = []
  let deleteID, editID
  let promptService

  let prompts = getContext("prompts")
  $prompts.sort((a, b) => b.id - a.id)

  const headers =  [
    {name: "prompt_text", label: "Text"},
    {name: "goal", label:"Goal"},
    {name: "isactive", label:"Active"},
    {name: "created_at", label:"Created At"},
    {name: "updated_at", label:"Updated At"},
  ]

  let shownHeaders = [];

  for (let i = 0; i < 5; i++) {
    shownHeaders.push(headers[i]);
  }

  let currentPage = 1;
  const itemsPerPage = 10;
  let totalItems, totalPages

  totalItems =  $prompts.length
  totalPages = Math.ceil(totalItems/ itemsPerPage)
  displayedData = paginateData($prompts, currentPage, itemsPerPage);

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
			$prompts = await promptService.search(keyword, 'prompt_text');
		} else {
			$prompts = await promptService.get();
		}
	};

  const handleDelete = ({ detail: { id, rowTable } }) => {
		deleteID = id;
		$showDelete = true;
    selectedRow = rowTable
	};

  const deletePrompt = async () => {
		try {
			await promptService.delete(deleteID);

      prompts.set(await promptService.get());
      
			toastSuccess.set(true);
			toastSuccessText.set('Prompt Deleted');

			$showDelete = false
		} catch (error) {
			console.log(error);
		}
	};

  const handleView = ({ detail: { id } }) => {
		goto(`/admin/settings/prompt/read/${id}`);
  };

	const handleEdit = ({ detail: { id, rowTable } }) => {
		editableFields = getPromptFields({
			editable: true,
			data: $prompts.find((e) => e.id == id)
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
				await promptService.update(editID, { ...data, updated_at: new Date().toISOString() });
				prompts.set(await promptService.get());
				showEdit.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: 'Prompts Updated Successfully'
			}
		);
	};

  const setPaginatedData = () => {
		totalItems = $prompts.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);
		displayedData = paginateData($prompts, currentPage, itemsPerPage).sort((a,b)=> b.id - a.id);
	};

	$: {
		if ($prompts) {
			setPaginatedData();
		}
	}

  onMount(async () => {
		promptService = new SupabaseService(data.supabase, 'prompts');
	});
</script>

<div
  bind:this={mainContainer}
  class="flex flex-col max-h-screen relative"
  >
  <div class="flex flex-col overflow-auto">
    <div class="flex flex-col gap-8 p-10 pl-8 h-auto">
      <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
        <a href="/admin/settings/prompt/browse" class="text-gray-3">Prompt</a>
        <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
        <button class="text-black">Browse</button>
      </div>
      <div class="flex flex-row justify-between">
        <span class="text-[36px] font-bold leading-8 w-full">Prompt</span>
        <div class="flex flex-row gap-10 items-center w-full max-w-[88px]">
          <a href="/admin/settings/prompt/add" class="flex flex-row gap-0.5 items-center justify-center text-[12px] text-center leading-normal font-semibold bg-yellow rounded-md w-full py-2">
            <img src="/images/icons/plus-black.svg" alt="add">
            <span class="h-fit relative top-[1px]">Add</span>
          </a>
        </div>
      </div>
      <div class="flex flex-row gap-20 justify-between items-start">
        <p class="text-[14px] leading-5 font-medium text-black max-w-[356px]">Championing athletes' feats, training, and passion. Inspiration awaits in their victorious stories.</p>
        <div class="flex flex-row gap-4 w-full justify-end items-center relative max-w-[376px]">
          <SearchFilter 
            placeholder={"Search Text"}
            on:search={handleSearch}
          />
          <button 
            class="max-w-6 h-auto" 
            on:click={showSortModal}
          >
						<img id="filterButton" src="/images/icons/filter.svg" alt="filter icon" />
					</button>
          {#if $showSort === true}
						<Sort
							checkboxes={[
                'Text',
                'Goal',
                'Active',
                'Created At',
                'Updated At'
							]}
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
      on:view={handleView}
    />
  </div>
  
  {#if $showEdit}
    <Edit
      name="prompts"
      title={'Edit Prompt'}
      bind:fields={editableFields}
      bind:selectedRow
      on:update={handleUpdate}
    />
  {/if}

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    goToPage={goToPage}
  />
</div>

{#if $showDelete}
  <Delete 
    {selectedRow} 
    on:confirm={deletePrompt}
  />
{/if}
