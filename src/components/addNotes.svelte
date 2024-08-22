<script>
	import CustomSelect from "./customSelect.svelte";
  
  let selectOption = false
  let selectedId

  const athleteId = [
    {value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
  ]

  const handleNotes = () =>{
    const customSelect = document.getElementById("custom-select-athlete-id-notes")
    
    if(customSelect.textContent === "Select An Option"){
      selectOption = true
    }else{
      selectOption = false
      athleteId.forEach(id=>{
        if(customSelect.textContent === id.label){
          selectedId = id.value
        }
      })
      window.location.href = `/athletes/notes/add/${selectedId}`
    }
  }

</script>

<div class="flex flex-row w-full gap-4 max-h-[40px]">
  <div class="flex flex-row w-full items-center">
    {#if selectOption === true}
      <span class="text-[#F04438] whitespace-nowrap">Please select an option</span>
    {/if}
    <CustomSelect id={"athlete-id-notes"} options={athleteId}/>
  </div>
  <button on:click={handleNotes} id="notes" class="max-w-[88px] flex flex-row gap-0.5 items-center justify-center text-[12px] text-center leading-normal font-semibold bg-yellow rounded-md w-full py-2">
    <img src="/images/icons/plus-black.svg" alt="add">
    <span class="h-fit relative top-[1px]">Notes</span>
  </button>
</div>