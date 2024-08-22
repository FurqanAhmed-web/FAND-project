<script>
  export let index

  const handleEditName = (index) =>{
    const tagContainer = document.getElementById("edit-name-container")
    const parent = document.getElementById(index)
    
    if (!parent.contains(tagContainer)) {
      tagContainer.classList.remove("hidden");
      parent.appendChild(tagContainer);
    }
  }

  const hideEditName = () =>{
    const editName = document.getElementById("edit-name-container")
    editName.classList.add("hidden")
    console.log(editName);
  }
</script>


<button on:click={()=>handleEditName(index)}><img class="max-w-[16px]" src="/images/icons/edit-3.svg" alt="edit"></button>

<div id="edit-name-container" class="hidden absolute top-0 left-0 bottom-0 right-0 m-auto bg-[#333] overflow-hidden rounded-[16px] w-full h-auto max-w-[276px] max-h-[232px]">
  <div class="flex flex-col gap-4 p-6 pb-7">
    <span class="text-white font-semibold">Edit Name</span>
    <input type="text" name="tag" id="tag" class="w-full h-[44px] py-[10px] px-4 rounded-lg" placeholder="Enter here">
    <span class="text-[12px] text-white font-semibold">Please confirm to save changes</span>
    <div class="flex flex-row justify-center w-full gap-4 text-black text-[14px] font-semibold">
      <button on:click={hideEditName} class="bg-white py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]">Cancel</button>
      <button class="bg-yellow py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]">Save</button>
    </div>
  </div>
</div>