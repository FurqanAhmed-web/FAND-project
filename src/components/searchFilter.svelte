<script>
	import { onMount, createEventDispatcher } from "svelte";
  export let placeholder = ""
  let keyword 

  const dispatch = createEventDispatcher()

  let searchFilter, searchIcon, clearIcon
  
  onMount(()=>{
    clearIcon.addEventListener("click", ()=>{
      searchFilter.value = ''
      keyword = ''
      searchIcon.classList.remove("hidden")
      clearIcon.classList.add("hidden")

      handleSearch()
    })

    searchFilter.addEventListener("input",()=>{
      if(searchFilter.value){
        searchIcon.classList.add("hidden")
        clearIcon.classList.remove("hidden")
      }else{
        searchIcon.classList.remove("hidden")
        clearIcon.classList.add("hidden")
      }
    })

    searchIcon.classList.replace("w-3.5", "w-4")
    clearIcon.classList.replace("w-4", "w-4.5")
  })

  const handleSearch = () =>{
    keyword = searchFilter.value
    dispatch('search', { keyword })
  }
</script>

<div class="relative h-fit w-full">
    <input 
      bind:this={searchFilter}
      on:input={handleSearch}
      id="search-filter" 
      class="w-full px-4 pr-12 py-2 max-h-10 border-[1px] border-gray-2 rounded-lg text-ellipsis" 
      type="text" 
      placeholder={placeholder}
      value=""
      >
    <img 
      bind:this={searchIcon}
      id="search-icon" 
      class="top-0 right-5 bottom-0 absolute m-auto w-3.5" src="/images/icons/search.svg" alt="search"
      >
    <button 
      bind:this={clearIcon}
      id="clear-icon" 
      class="hidden top-0 right-5 bottom-0 absolute m-auto w-4"><img src="/images/icons/clear.svg" alt="clear"
      >
    </button>
</div>