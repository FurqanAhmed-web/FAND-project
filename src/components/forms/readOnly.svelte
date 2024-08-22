<script>
  import { currComponent } from "$lib/store"

  const handleDelete = () =>{
    const deleteModal = document.getElementById("delete-modal")
    deleteModal.classList.remove("hidden")
  }
  const handleHideModalDelete = () =>{
    const deleteModal = document.getElementById("delete-modal")
    deleteModal.classList.add("hidden")
  }
</script>

<form class="flex flex-col gap-8 p-12" novalidate>
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <button class="text-gray-3">Athlete</button>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button class="text-black">Athlete Data</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Athlete Data</span>
    <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
      <button on:click={handleDelete} class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md">
        <img class="w-4 h-4" src="/images/icons/delete.svg" alt="delete">
        Delete
      </button>
      <button on:click={()=> currComponent.set("readEdit")} type="submit" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md">
        <img class="w-4 h-4" src="/images/icons/edit.svg" alt="edit">
        Edit
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-10">
    <span class="text-[24px] leading-8 font-semibold">Personal Information</span>
    <fieldset class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Athlete Name</span>
        <span class="text-gray-13">Jamie Jackson</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Email</span>
        <span class="text-gray-13">jamiejackson@gmail.com</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Mobile Number</span>
        <span class="text-gray-13">9801234567</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Instagram Username</span>
        <span class="text-gray-13">jjamie</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Instagram Follower Count</span>
        <span class="text-gray-13">1.2M</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Hometown</span>
        <span class="text-gray-13">Boston, USA</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Conference</span>
        <span class="text-gray-13">Label</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">University</span>
        <span class="text-gray-13">Duke University</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Class</span>
        <span class="text-gray-13">Senior</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Clothing Gender</span>
        <span class="text-gray-13">M</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Clothing Top</span>
        <span class="text-gray-13">XL</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Clothing Bottom</span>
        <span class="text-gray-13">XL</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Clothing Shoe</span>
        <span class="text-gray-13">5</span>
      </div>
      <div class="flex flex-col gap-3 text-[14px] text-gray-11 leading-5">
        <span class="font-bold leading-5 max-w-[238px]">What is the best time to reach you?</span>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col">
            <span class="font-semibold">Start Time</span>
            <span class="font-medium">4:30 AM</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">End Time</span>
            <span class="font-medium">10:30 AM</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Would you like to be added to our data base to receive messages from brands?</span>
        <span class="text-gray-13">Yes</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[14px] font-bold leading-5 text-gray-11">Do you prefer email or text notifications?</span>
        <span class="text-gray-13">No</span>
      </div>
    </fieldset>
  </div>
</form>

<div id="delete-modal" class="hidden absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
  <div class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6">
    <div class="flex flex-col">
      <span class="text-[18px] text-gray-13 leading-7 font-semibold">Delete</span>
      <span class="text-[14px] text-gray-12 leading-5">Are you sure you want to delete this record?</span>
    </div>
    <div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
      <button on:click={handleHideModalDelete} id="hide-modal" class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3">Cancel</button>
      <button class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow">Confirm</button>
    </div>
  </div>
</div>