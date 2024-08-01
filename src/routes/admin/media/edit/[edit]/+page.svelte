<script>
	import FileUpload from "../../../../../components/fileUpload.svelte";

  let fileUploadError = false
  let fileArr = []

  //for submit/save
  const handleSubmit = () => {
    const inputFields = document.querySelectorAll("form input")
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
      if(select.textContent.includes("Select")){
        const errorText = document.createElement("span")
        errorText.setAttribute("id", "error-text")
        errorText.classList.add("text-[#F04438]", "leading-5")
        errorText.textContent = "Please select an option"
        parent.appendChild(errorText)
      }
    })

    const errorMessages = {
      "file-name": "Please enter the file name",
      "mobile-number": "Please enter a valid phone number",
      "website": "Please enter organization's website",
    }

    inputFields.forEach(input => {
      const parent = input.parentElement;
      const existingErrorText = parent.querySelector("#error-text");
      if (existingErrorText) {
        parent.removeChild(existingErrorText);
      }
    })

    inputFields.forEach(input => {
      const parent = input.parentElement;
      const inputName = input.name;

      if (input.value === "" && errorMessages[inputName]) {
        const errorText = document.createElement("span");
        errorText.setAttribute("id", "error-text");
        errorText.classList.add("text-[#F04438]", "leading-5");
        errorText.textContent = errorMessages[inputName];
        parent.appendChild(errorText);
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

</script>

<form on:submit={handleSubmit} class="flex flex-col gap-8 p-12" novalidate>
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <a href="/admin/media" class="text-gray-3">Media</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button class="text-black">Edit</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Media</span>
    <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
      <button on:click={showModalCancel} type="button" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md">
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
        <label for="file-name" class="text-[16px] font-bold leading-5 text-gray-11">File Name</label>
        <input name="file-name" type="text" class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg appearance-none" id="file-name" value="" placeholder="Enter Name">
      </div>
      <div class="flex flex-col gap-3">
        <span for="description" class="text-[16px] font-bold leading-5 text-gray-11">Description</span>
        <div class="relative w-full">
          <textarea class="p-3 border-[1px] border-gray-2 w-full resize-none rounded-lg outline-none" name="" id="" cols="30" rows="10" placeholder="Enter a description..."></textarea>
        </div>
      </div>
      <div class="flex flex-col gap-3">
      <FileUpload bind:fileArr={fileArr}/>
        {#if fileUploadError === true}
          <span class="text-error leading-5">Please upload a file</span>
        {/if}
      </div>
    </fieldset>
  </div>
</form>

<div id="cancel-modal" class="hidden absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
  <div class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6">
    <div class="flex flex-col">
      <span class="text-[18px] text-gray-13 leading-7 font-semibold">Cancel</span>
      <span class="text-[14px] text-gray-12 leading-5">Are you sure you want to cancel editing this record?</span>
    </div>
    <div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
      <button on:click={hideModalCancel} id="hide-modal" class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3">Decline</button>
      <a href="/admin/media/read/1" class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow">Confirm</a>
    </div>
  </div>
</div>
