<script>
  import { goto } from "$app/navigation"

  let deleteModal = false

  const handleCancel = () =>{
    goto("/admin/media/browse")
  }

  const closeDelete = () =>{
    deleteModal = false
  }
</script>

<div class="flex flex-col gap-8 p-12">
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <a href="/admin/media/" class="text-gray-3">Media</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button class="text-black">Read</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Media</span>
    <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
      <button on:click={handleCancel} type="button" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md">
        <img src="/images/icons/cancel.svg" alt="cancel">
        Cancel
      </button>
      <a href="/admin/media/edit/1"  class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md">
        <img class="w-4 h-4" src="/images/icons/edit.svg" alt="edit">
        Edit
      </a>
    </div>
  </div>
  <div class="flex flex-col gap-10">
    <span class="text-[24px] leading-8 font-semibold">Personal Information</span>
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">ID</span>
        <span class="leading-6 text-gray-13">1</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Organization ID</span>
        <span class="leading-6 text-gray-13">Organization sample 1</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Name</span>
        <span class="leading-6 text-gray-13">Pepsi Logo</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">File Name</span>
        <span class="leading-6 text-gray-13">pepsi-logo.png</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Tags</span>
        <span class="leading-6 text-gray-13">pepsi, letsgo, tags, tags</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Uploaded File</span>
        <img class="w-40 h-40" src="/images/media-sample-8.png" alt="sample upload">
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Type</span>
        <span class="leading-6 text-gray-13">png</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Active</span>
        <span class="leading-6 text-gray-13">Yes</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Created</span>
        <span class="leading-6 text-gray-13">191238</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Updated</span>
        <span class="leading-6 text-gray-13">191234</span>
      </div>
    </div>
  </div>
</div>

{#if deleteModal === true}
  <div id="delete-modal" class="absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
    <div class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6">
      <div class="flex flex-col">
        <span class="text-[18px] text-gray-13 leading-7 font-semibold">Delete</span>
        <span class="text-[14px] text-gray-12 leading-5">Are you sure you want to delete this record?</span>
      </div>
      <div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
        <button on:click={closeDelete} id="hide-modal" class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3">Cancel</button>
        <button class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow">Confirm</button>
      </div>
    </div>
  </div>
{/if}