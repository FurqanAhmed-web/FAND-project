<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let currentRoute = $page.route.id;

	const getCurrRoute = page.subscribe(() => {
		let formattedRoute = $page.route.id;

		formattedRoute = formattedRoute.split('/');

		currentRoute = formattedRoute.filter((e) => {
			return e !== '' && !e.includes('[') && !e.includes(']');
		});

		currentRoute = currentRoute.join('/');

		console.log(currentRoute);
	});

	onMount(() => {
		return getCurrRoute;
	});

	console.log(currentRoute, currentRoute.includes('chat'), currentRoute.split('/profile')[0]);
</script>

<div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
	{#each currentRoute.split('/') as breadcrumb, i}
		{#if i === 0 && breadcrumb !== 'admin' && breadcrumb}
			{#if currentRoute.includes('chat')}
				<a href="/{currentRoute.split('/profile')[0]}" class="text-gray-3">
					{breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1).toLowerCase()}
				</a>
			{:else}
				<a href="/{breadcrumb.toLowerCase()}/browse" class="text-gray-3">
					{breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1).toLowerCase()}
				</a>
			{/if}
		{:else if i === 1 && currentRoute.split('/').length > 2}
			{#if currentRoute.includes('chat')}
				<a href="/{currentRoute.split('/profile')[0]}" class="text-gray-3">
					{breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1).toLowerCase()}
				</a>
			{:else}
				<a
					href="/{currentRoute.split('/')[0]}/{currentRoute.split('/')[1]}/browse"
					class="text-gray-3"
				>
					{breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1).toLowerCase()}
				</a>
			{/if}
		{:else if i === currentRoute.split('/').length - 1}
			<button class="text-black"
				>{breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1).toLowerCase()}</button
			>
		{/if}

		{#if i !== currentRoute.split('/').length - 1 && breadcrumb !== 'admin'}
			<span><img src="/images/icons/slash-divider.svg" alt="divider" /></span>
		{/if}

		<!--
    {#if !(breadcrumb === '')}
      {#if i === 1}
        <a href="/{breadcrumb.toLowerCase()}/browse" class="text-gray-3">
          { breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1).toLowerCase() }
        </a>
      {:else if i === currentRoute.split('/').length - 1}
        <button class="text-black">{breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1).toLowerCase()}</button>
      {/if}
      
      {#if i !== (currentRoute.split('/').length - 1)}
        <span><img src="/images/icons/slash-divider.svg" alt="divider" /></span>
      {/if}
    {/if}
  -->
	{/each}
</div>
