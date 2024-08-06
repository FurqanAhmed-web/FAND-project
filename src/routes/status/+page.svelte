<script>
	import { getContext, onMount } from "svelte";

  let roadmapContext = getContext('product_notes')
  let status = getContext('product_status')
  let roadmaps = null

  onMount(()=>{
    let highestId = -1;

    for (const obj of $roadmapContext) {
      if (obj.id > highestId && obj.ispublic === true) {
        highestId = obj.id;
        roadmaps = obj;
      }
    }
  })
</script>

<div class="flex flex-col gap-8 p-10 pl-8">
  <span class="text-[36px] font-semibold leading-8 w-full">Status</span>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Title</span>
        <span class="leading-6 text-gray-13">{ roadmaps?.title || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Additional Notes</span>
        <span class="leading-6 text-gray-13">{ roadmaps?.additional_notes || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Description</span>
        <span class="leading-6 text-gray-13">{ roadmaps?.description || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Status</span>
        <span class="leading-6 text-gray-13">{ 
            $status.find((e)=> e.id === roadmaps?.status)?.type
          }
        </span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Tags</span>
        <span class="leading-6 text-gray-13">{ roadmaps?.tags || '' }</span>
      </div>
    </div>
  </div>
</div>