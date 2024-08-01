<script>
  import { page } from "$app/stores"
  import { goto } from "$app/navigation";
	import { getContext, onMount } from "svelte";
  
	const readID = $page.params.read;

  let plans = getContext('plans')
  let plan = {}

  const handleCancel = () =>{
    goto("/admin/subscription/browse")
  }

  const gotoEdit = () =>{
    goto(`/admin/subscription/edit/${readID}`)
  }

  onMount(()=>{
    plan = $plans.find((e)=>e.id == readID)
  })
</script>

<div class="flex flex-col gap-8 p-10 pl-8">
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <a href="/admin/subscription/browse" class="text-gray-3">Subscription</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button class="text-black">Read</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Subscription</span>
    <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
      <button on:click={handleCancel} type="button" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md">
        <img src="/images/icons/cancel.svg" alt="cancel">
        Cancel
      </button>
      <button 
        on:click={gotoEdit}  
        class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md">
        <img class="w-4 h-4" src="/images/icons/edit.svg" alt="edit">
        Edit
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Type</span>
        <span class="leading-6 text-gray-13">{plan?.type}</span>
      </div>
    </div>
  </div>
</div>
