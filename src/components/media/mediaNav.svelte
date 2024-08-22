<script>
	import { onMount } from "svelte";
	import { page } from '$app/stores';

  const routes = ["browse", "Images", "Audio", "Documents", "Videos"]
</script>

<div class="flex flex-row font-semibold gap-8 border-b-[1px] border-black min-w-[328px] w-fit">
  {#each routes as route }
    {#if $page.route.id.includes("admin")}
      {#if route.toLowerCase() == $page.route.id.split("/")[3]}
        {#if route === "browse"}
          <a href="/admin/media/{route.toLowerCase()}" class="underline underline-offset-[6px] decoration-4 decoration-yellow">All</a>
        {:else}
          <a href="/admin/media/{route.toLowerCase()}" class="underline underline-offset-[6px] decoration-4 decoration-yellow">{route}</a>
        {/if}
      {:else if route === "browse"}
        <a href="/admin/media/{route.toLowerCase()}" class="text-gray-4">All</a>
      {:else}
        <a href="/admin/media/{route.toLowerCase()}" class="text-gray-4">{route}</a>
      {/if}
    {:else}
      {#if route.toLowerCase() == $page.route.id.split("/")[2]}
        {#if route === "browse"}
          <a href="/media/{route.toLowerCase()}" class="underline underline-offset-[6px] decoration-4 decoration-yellow">All</a>
        {:else}
          <a href="/media/{route.toLowerCase()}" class="underline underline-offset-[6px] decoration-4 decoration-yellow">{route}</a>
        {/if}
      {:else if route === "browse"}
        <a href="/media/{route.toLowerCase()}" class="text-gray-4">All</a>
      {:else}
        <a href="/media/{route.toLowerCase()}" class="text-gray-4">{route}</a>
      {/if}
    {/if}
  {/each}
</div>