<script>
  import CustomSelect from "../../../../../components/customSelect.svelte"

  //for submit/save
  const handleSubmit = () => {
    const elementsWithSelectId = document.querySelectorAll('[id*="select"]');

    elementsWithSelectId.forEach(select => {
      const parent = select.parentElement.parentElement;
      const existingErrorText = parent.querySelector("#error-text");
      if (existingErrorText) {
        parent.removeChild(existingErrorText);
      }
    })

    elementsWithSelectId.forEach(select => {
      const parent = select.parentElement.parentElement;

      if(select.innerHTML.includes("Select")){
        const errorText = document.createElement("span")
        errorText.setAttribute("id", "error-text")
        errorText.classList.add("text-[#F04438]", "leading-5")
        errorText.textContent = "Please select an option"
        parent.appendChild(errorText)
      }
    })
  }
  //for modal cancel
  const showModalCancel = () =>{
    const cancelModal = document.getElementById("cancel-modal")
    cancelModal.classList.remove("hidden")
  }
  const hideModalCancel = () =>{
    const cancelModal = document.getElementById("cancel-modal")
    cancelModal.classList.add("hidden")
  }

  //for custom select
  const athletes = [
    {value: '1', label: 'Drake Maye'},
    {value: '2', label: 'J Horssison'},
    {value: '3', label: 'Masai Russell'},
  ]

</script>

<form on:submit={handleSubmit} class="flex flex-col gap-8 p-12" novalidate>
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <a href="/athletes/browse" class="text-gray-3">Athletes</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <a href="/athletes/notes/add" class="text-gray-3">Notes</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button class="text-black">Edit</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Notes</span>
    <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
      <button type="button" on:click={showModalCancel} class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md">
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
        <span class="text-[16px] font-bold leading-5 text-gray-11">Athlete's Name</span>
        <CustomSelect id="athletes" options={athletes} />
      </div>
      <div class="flex flex-col gap-3">
        <label for="title" class="text-[16px] font-bold leading-5 text-gray-11">Title</label>
        <input type="text" name="title" class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg" id="title" value="" placeholder="Enter A Title">
      </div>
      <div class="flex flex-col gap-3">
        <span class="text-[16px] font-bold leading-5 text-gray-11">Content</span>
        <div class="relative w-full">
          <textarea class="p-3 border-[1px] border-gray-2 w-full resize-none rounded-lg outline-none" name="" id="" cols="30" rows="10" placeholder="Enter a Content..."></textarea>
        </div>
      </div>
    </fieldset>
  </div>
</form>

<div id="cancel-modal" class="hidden absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
  <div class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6">
    <div class="flex flex-col gap-1">
      <span class="text-[18px] text-gray-13 leading-7 font-semibold">Cancel</span>
      <span class="text-[14px] text-gray-12 leading-5">Are you sure you want to cancel editing this record?</span>
    </div>
    <div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
      <button on:click={hideModalCancel} id="hide-modal" class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3">Decline</button>
      <a href="/athletes/browse" class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow">Confirm</a>
    </div>
  </div>
</div>
