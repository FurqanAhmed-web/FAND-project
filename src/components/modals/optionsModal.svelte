<script>
	import { goto } from '$app/navigation';
	import { showDelete, showEdit } from '$lib/store';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let rightPosition, selectedRow, content, shownHeaders;
	export let tableRow = [];

	const handleGotoRead = () => {
    dispatch('read')
	};

  const openEdit = () =>{
    dispatch('edit')

    tableRow[selectedRow].classList.add('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
    tableRow[selectedRow].classList.replace('hover:bg-yellow-3', 'hover:bg-[#e5d388f0]');
  }

	const showModalDelete = () => {
		dispatch('delete', {
			id: content[0]
		});
		showDelete.set(true);

		tableRow[selectedRow].classList.add('bg-[#e5d388f0]', 'z-30', 'pointer-events-none');
		tableRow[selectedRow].classList.replace('hover:bg-yellow-3', 'hover:bg-[#e5d388f0]');
	};
</script>

<div
	id="optionsContainer"
	class="pointer-events-auto z-50 absolute top-[56px] rounded-md overflow-hidden m-auto w-[212px] max-w-[212px] h-fit bg-white border-[1px] border-black"
	style="right: 20px"
>
	{#if !window.location.pathname.includes('/campaigns/athletes/')}
		<button
			on:click={openEdit}
			type="button"
			class="w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
		>
			<img src="/images/icons/edit-yellow.svg" alt="edit" />
			Edit
		</button>
		<div class="w-full h-[1px] bg-black" />
    <!--
		<button
			on:click={handleGotoRead}
			type="button"
			class="w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
		>
			<img src="/images/icons/eye.svg" alt="view more" />
			View More
		</button>
		<div class="w-full h-[1px] bg-black" />
    -->
	{/if}
	<button
		on:click={showModalDelete}
		type="button"
		class="w-full flex flex-row gap-2 items-center text-[13px] font-medium bg-inherit p-4"
	>
		<img src="/images/icons/delete-yellow.svg" alt="delete" />
		Delete
	</button>
</div>
