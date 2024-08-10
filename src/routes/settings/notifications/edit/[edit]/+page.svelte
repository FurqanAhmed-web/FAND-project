<script>
  let cancelModal = false

  const handleSubmit = () =>{

  }
  
  const cancelModalOpen = () =>{
    cancelModal = true
  }

  const cancelModalHide = () =>{
    cancelModal = false
  }

</script>

<form id="campaign-form" on:submit={handleSubmit} class="flex flex-col gap-8 p-12 " novalidate>
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <a href="/notifications/edit" class="text-gray-3">Notifications</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button type="button" class="text-black">Edit</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Notifications</span>
    <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
      <button on:click={cancelModalOpen} type="button" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md">
        <img src="/images/icons/cancel.svg" alt="exit" />
        Cancel
      </button>
      <button type="submit" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md">
        <img src="/images/icons/save.svg" alt="save" />
        Save
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-10">
    <fieldset class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span for="title" class="text-[16px] font-bold leading-5 text-gray-11">Title</span>
        <input name="title" class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg" id="title" value="" placeholder="Enter title">
      </div>
      <div class="flex flex-col gap-3">
        <span for="description" class="text-[16px] font-bold leading-5 text-gray-11">Content</span>
        <div class="relative w-full">
          <textarea class="p-3 border-[1px] border-gray-2 w-full resize-none rounded-lg outline-none" name="" id="" cols="30" rows="10" value="" placeholder="Enter content..."></textarea>
        </div>
      </div>
    </fieldset>
  </div>
</form>

{#if cancelModal === true}
  <div id="cancel-modal" class="absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
    <div class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6">
      <div class="flex flex-col">
        <span class="text-[18px] text-gray-13 leading-7 font-semibold">Cancel</span>
        <span class="text-[14px] text-gray-12 leading-5">Are you sure you want to cancel editing this record?</span>
      </div>
      <div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
        <button on:click={cancelModalHide} type="button" id="hide-modal" class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3">Decline</button>
        <a href="#" class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow">Confirm</a>
      </div>
    </div>
  </div>
{/if}

