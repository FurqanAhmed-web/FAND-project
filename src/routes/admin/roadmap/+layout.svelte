<script>
	import { onMount, setContext } from "svelte";
	import { writable } from "svelte/store";
	import { SupabaseService } from "../../../lib/supabase";
	import PageLayout from "../../../components/pageLayout.svelte";

  export let data

  let status = writable([])
  
  setContext('status', status)

  try {
    onMount(async ()=>{
      const statusService = new SupabaseService(data.supabase, 'product_status')
      status.set(await statusService.get())
    })
  } catch (error) {
    console.log(error);
  }

</script>

<PageLayout>
  <slot />
</PageLayout>