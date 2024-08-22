<script>
  export let currentPage;
  export let totalPages;
  export let goToPage;
</script>

<div
	id="pagination-container"
	class="flex flex-row justify-between py-4 px-6 border-t-[1px] border-gray-16"
>
	<button
    on:click={() => goToPage(currentPage - 1)}
		class="text-[14px] font-semibold leading-5 text-gray-11 max-h-[36px] flex flex-row items-center gap-2 py-2 px-[14px] border-[1px] border-gray-2 rounded-lg"
	>
		<img src="/images/icons/left-arrow-short-small.svg" alt="left arrow" />
		Previous
	</button>

	<div class="flex flex-row text-[14px] leading-5 font-medium text-gray-18">
    {#if currentPage > 10}
      <button
        on:click={() => goToPage(1)}
        class="w-10 h-10 rounded-lg"
      >
        1
      </button>
      <span class="rounded-lg flex items-end pb-2 text-gray-12">...</span>
    {/if}
    {#each Array.from({ length: totalPages }) as _, page }
      {#if page >= currentPage - 5 && page <= currentPage + 5}
        <button
          on:click={() => goToPage(page + 1)}
          class="relative w-10 h-10 rounded-lg text-gray-12 {page === currentPage - 1 ? 'text-gray-18 bg-[#F9FAFB] border-[1px] border-gray-17' : ''}"
        >
          { page + 1 }
          {#if page === currentPage - 1}
            <span class="absolute left-0 right-0 m-auto bottom-1 bg-yellow w-4 h-1"></span>
          {/if}
        </button>
      {/if}
    {/each}
    {#if currentPage <= totalPages - 5}
      <span class="rounded-lg flex items-end pb-2 text-gray-12">...</span>
      <button
        on:click={() => goToPage(totalPages)}
        class="w-10 h-10 rounded-lg"
      >
        {totalPages}
      </button>
    {/if}
	</div>

	<button
    on:click={() => goToPage(currentPage + 1)}
		class="text-[14px] font-semibold leading-5 text-gray-11 max-h-[36px] flex flex-row-reverse items-center gap-2 py-2 px-[14px] border-[1px] border-gray-2 rounded-lg"
	>
		<img src="/images/icons/right-arrow-short-small.svg" alt="right arrow" />
		Next
	</button>
</div>
