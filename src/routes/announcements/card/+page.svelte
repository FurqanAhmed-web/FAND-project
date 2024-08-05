<script>
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"

  const moreHandler = () =>{
    if($page.route.id.includes("admin")){
      goto("/admin/feed/browse")
    }else{
      goto("/feed/browse")
    }
  }
</script>
<div id="announcement" class="hidden flex flex-col gap-4 bg-yellow rounded-lg p-4">
  <p class="leading-6 font-regular">Masai Russell reported that "100 Signed Cards" for "Let’s Go" campaign have be returned. Track this package?</p>
  <div class="flex flex-row justify-between">
      <button href={"#"} class="font-semibold leading-4 text-gray-6">Dismiss</button>
      <button 
        on:click={moreHandler}
        class="font-semibold leading-4"
        >More
      </button>
  </div>
</div>