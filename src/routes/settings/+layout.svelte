<script>
	import { onMount, setContext } from "svelte";
	import { SupabaseService } from "$lib/supabase";
	import { writable } from "svelte/store";
	import PageLayout from "../../components/pageLayout.svelte";
</script>

<PageLayout>
  <slot/>
</PageLayout>