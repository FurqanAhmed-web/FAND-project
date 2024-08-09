<script>
	import Pagination from '../../../components/pagination.svelte';
	import SearchFilter from '../../../components/searchFilter.svelte';
  import { getContext, onMount } from 'svelte';
  import {
		showDelete,
		showSort,
		showEdit,
		toastSuccess,
		toastSuccessText,
		toastError,
		toastErrorText
	} from '$lib/store';
  import { paginateData } from "$lib/paginate"
	import OptionsModal from '../../../components/modals/optionsModal.svelte';
	import Delete from '../../../components/modals/delete.svelte';
	import Sort from '../../../components/modals/sort.svelte';
	import Edit from '../../../components/modals/edit.svelte';
  import Table from '../../../components/table.svelte'
	import { SupabaseService } from '../../../lib/supabase';
	import { asyncTryCatchToast } from '../../../lib/utils';
	import { getTeamFields, validateAndFormat } from '../../../helpers/fields';
  
  export let data

  let selectedRow, mainContainer
  let editID, deleteID
  let shownHeaders = [], displayedData = []
  let editableFields = [];
  let currentPage = 1;
  const itemsPerPage = 10;
  let totalItems, totalPages
  let teamService

  let loading = {
    updating: false
  }

  let teams = getContext('users')
  let organizations = getContext('organizations')
  let roles = getContext('roles')

  const headers =  [
    //{name: "profile_image", label: "Profile Image"},
    {name: "organization_name", label: "Organization"},
    {name: "first_name", label:"First Name"},
    {name: "last_name", label:"Last Name"},
    {name: "email", label:"Email"},
    {name: "mobile_number", label:"Mobile Number"},
    {name: "role", label:"Role"},
    {name: "isactive", label:"Active"},
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

  const handleSort = ({ detail: { labels } }) => {
		const indexes = labels
			.map((name) => headers.findIndex((header) => name === header.label))
			.sort((a, b) => a - b);
		shownHeaders = indexes.map((index) => headers[index]);
	};

  const handleSearch = async ({ detail: { keyword } }) => {
		if (keyword) {
			$teams = await teamService.search(keyword, 'first_name');
		} else {
			$teams = await teamService.get();
		}
	};

	const showSortModal = () => {
		showSort.set(!$showSort);
	};
  
	const handleEdit = ({ detail: { id, rowTable } }) => {
		editableFields = getTeamFields({
			organizations: $organizations,
      roles: $roles,
			editable: true,
			data: $teams.find((e) => e.id == id)
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
				await teamService.update(editID, { ...data, updated_at: new Date().toISOString() });
				teams.set(await teamService.get());
				showEdit.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: 'Teams Updated Successfully'
			}
		);
	};

  const handleDelete = ({ detail: { id, rowTable } }) => {
		deleteID = id;
		$showDelete = true;
    selectedRow = rowTable
	};

  const deleteTeam = async () => {
		asyncTryCatchToast(
			async () => {
				await teamService.delete(deleteID);
				teams.set(await teamService.get());
				showDelete.set(false);
				selectedRow.classList.replace('hover:bg-[#e5d388f0]', 'hover:bg-yellow-3');
				selectedRow.classList.remove('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
			},
			{
				message: 'Team Deleted'
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

  const formatTeams = (arr) => {
		return arr
			.map((e) => {
				return {
					...e,
					organization_name: getType(e.organization_id, $organizations),
          role: getType(e.role, $roles)
				};
			})
			.sort((a, b) => b.id - a.id);
	};

  const setPaginatedData = () => {
		totalItems = $teams.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);
		displayedData = paginateData(formatTeams($teams), currentPage, itemsPerPage);
	};

  $:{
    if($teams){
      setPaginatedData()
    }
  }

  onMount(async () => {
		teamService = new SupabaseService(data.supabase, 'users');
	});
</script>

<div 
  bind:this={mainContainer}
  class="flex flex-col max-h-screen relative">
  
  <div class="flex flex-col overflow-auto">
    <div class="flex flex-col gap-8 p-10 pl-8 h-auto">
      <div class="flex flex-row justify-between">
        <span class="text-[36px] font-bold leading-8 w-full">Teams</span>
        <div class="flex flex-row gap-10 items-center w-full max-w-[88px]">
          <a href="/teams/add" class="flex flex-row gap-0.5 items-center justify-center text-[12px] text-center leading-normal font-semibold bg-yellow rounded-md w-full py-2">
            <img src="/images/icons/plus-black.svg" alt="add">
            <span class="h-fit relative top-[1px]">Add</span>
          </a>
        </div>
      </div>
      <div class="flex flex-row gap-20 justify-between items-start">
        <p class="text-[14px] leading-5 font-medium text-black max-w-[356px]">Championing athletes' feats, training, and passion. Inspiration awaits in their victorious stories.</p>
        <div class="flex flex-row gap-4 w-full justify-end items-center relative max-w-[376px]">
          <SearchFilter 
            placeholder={"Search First Name"}
            on:search={handleSearch}
          />
          <button class="max-w-6 h-auto" on:click={showSortModal}>
						<img id="filterButton" src="/images/icons/filter.svg" alt="filter icon" />
					</button>
					{#if $showSort === true}
						<Sort
							checkboxes={[
								'Organization',
                				'First Name',
                				'Last Name',
                				'Email',
                				'Mobile Number',
               	 				'Role',
                				'Active'
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
    />
  </div>
  
  {#if $showEdit}
    <Edit
      name="users"
      title={'Edit Teams'}
      bind:fields={editableFields}
      bind:selectedRow
      on:update={handleUpdate}
    />
  {/if}

  <Pagination
    goToPage={goToPage}
    totalPages={totalPages}
    currentPage={currentPage}
  />
</div>

{#if $showDelete}
  <Delete 
    {selectedRow} 
    on:confirm={deleteTeam}
  />
{/if}
