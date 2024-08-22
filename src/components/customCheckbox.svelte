<script>
  export let checkBox = {
    label:"",
    value: false
  }
  export let id
</script>

<div class="font-medium leading-6 text-gray-11 flex flex-row flex-wrap gap-y-4 gap-x-2 w-full max-w-[696px] whitespace-nowrap">
  {#each checkBox as checkboxes, index}
    <label for={`${id}-${index}`} class="flex flex-row items-center gap-3 w-full">
      <input 
        id={`${id}-${index}`} 
        class="checkbox-brand w-5 h-5 min-w-[20px]" 
        type="checkbox"
        bind:checked={checkboxes.value}>
      { checkboxes.label }
    </label>
  {/each}
</div>