<script>

  export let index

  const handleTag = (index) =>{
    const tagContainer = document.getElementById("tag-container")
    const parent = document.getElementById(index)
    
    tagContainer.classList.remove("hidden")
    parent.appendChild(tagContainer)
  }

  const hideTag = () =>{
    const tagContainer = document.getElementById("tag-container")
    tagContainer.classList.add("hidden")
  }
</script>

<button on:click={()=>handleTag(index)}><img src="/images/icons/plus-gray-2.svg" alt="plus"></button>

<div id="tag-container" class="hidden absolute top-0 left-0 bottom-0 right-0 m-auto bg-[#333] overflow-hidden rounded-[16px] w-full h-auto max-w-[276px] max-h-[232px]">
  <div class="flex flex-col gap-4 p-6 pb-7">
    <span class="text-white font-semibold">Tags</span>
    <div class="relative">
      <input type="text" name="tag" id="tag" class="w-full h-[44px] py-[10px] pl-12 pr-[14px] rounded-lg" placeholder="Add a tag...">
      <img class="top-0 bottom-0 left-4 m-auto absolute" src="/images/icons/tag.svg" alt="tags">
    </div>
    <div class="flex flex-row gap-1 items-center text-[#333] text-[10px] font-medium w-full">
      <span class="flex flex-row items-center gap-2 px-2 py-[6px] bg-white rounded-[16px] max-h-[24px]">
        NFL
        <img class="w-[10px]" src="/images/icons/remove.svg" alt="remove">
      </span>
      <span class="flex flex-row items-center gap-2 px-2 py-[6px] bg-white rounded-[16px] max-h-[24px]">
        Video
        <img class="w-[10px]" src="/images/icons/remove.svg" alt="remove">
      </span>
      <span class="flex flex-row items-center gap-2 px-2 py-[6px] bg-white rounded-[16px] max-h-[24px]">
        Players
        <img class="w-[10px]" src="/images/icons/remove.svg" alt="remove">
      </span>
    </div>
    <div class="flex flex-row justify-center w-full gap-4 text-black text-[14px] font-semibold">
      <button on:click={hideTag} class="bg-white py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]">Cancel</button>
      <button class="bg-yellow py-3 px-2 w-full rounded-[6px] max-h-[40px] flex items-center justify-center max-w-[88px]">Save</button>
    </div>
  </div>
</div>