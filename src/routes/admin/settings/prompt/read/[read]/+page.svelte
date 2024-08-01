<script>
  import { page } from "$app/stores"
  import { goto } from "$app/navigation";
	import { getContext, onMount } from "svelte";

  let prompts = getContext('prompts')
  let prompt = []

  let readID = $page.params.read

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		weekday: 'short'
	});

  const handleDelete = () =>{
    const deleteModal = document.getElementById("delete-modal")
    deleteModal.classList.remove("hidden")
  }

  const gotoEdit = () =>{
    const pathnameSegments = $page.url.pathname.split("/");
    const updatedPathname = [...pathnameSegments.slice(0, -2), "edit"].join("/");

    goto(updatedPathname + "/" + pathnameSegments[5])
  }

  onMount(()=>{
    prompt = $prompts.find(e=>e.id == readID)
  })

  const handleCancel = () =>{
    goto("/admin/settings/prompt/browse/")
  }
</script>

<div class="flex flex-col gap-8 p-10 pl-8">
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <a href="/admin/settings/prompt/browse" class="text-gray-3">Prompt</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button class="text-black">Read</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Prompt</span>
    <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
			<button
				on:click={handleCancel}
				type="button"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md"
			>
				<img src="/images/icons/cancel.svg" alt="cancel" />
				Cancel
			</button>
			<a
				href="/admin/settings/prompt/edit/{readID}"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md"
			>
				<img class="w-4 h-4" src="/images/icons/edit.svg" alt="edit" />
				Edit
			</a>
    </div>
  </div>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Text</span>
        <span class="leading-6 text-gray-13">{ prompt?.prompt_text || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Goal</span>
        <span class="leading-6 text-gray-13">{ prompt?.goal || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Active</span>
        <span class="leading-6 text-gray-13">{ prompt?.isactive || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Created</span>
        <span class="leading-6 text-gray-13">{ prompt?.created_at && dateFormatter.format(new Date(prompt.created_at)) }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Updated</span>
        <span class="leading-6 text-gray-13">{ prompt?.updated_at && dateFormatter.format(new Date(prompt.updated_at)) }</span>
      </div>
    </div>
  </div>
</div>