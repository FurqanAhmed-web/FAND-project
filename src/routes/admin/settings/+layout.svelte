<script>
	import PageLayout from '../../../components/pageLayout.svelte';
</script>

<PageLayout>
  <slot/>
</PageLayout>

<!--
<section class="relative flex flex-row min-h-screen max-h-screen">
	<aside
		class="max-h-screen overflow-hidden flex flex-col gap-5 xl:gap-8 w-[30%] border-r-[1px] border-gray-4 py-5 xl:py-6 h-screen"
	>
		<div
			class="flex flex-col gap-5 px-10 py-[54px] text-gray-5 h-full text-left leading-6 text-sm font-semibold"
		>
			{#each subNavItems as items}
				<a
					href={`/admin/settings/${items.href}`}
					class="relative flex flex-row items-center gap-6 w-full"
				>
					{#if currectActiveNav == items.name.toLowerCase()}
						<img
							class="max-w-[24px]"
							src={`/images/icons/${items.img}-active.svg`}
							alt={items.name}
						/>
						<span class="text-semibold text-black">{items.name}</span>
						<span class="-left-10 absolute w-2 h-10 bg-yellow" />
					{:else if currectActiveNav == 'signout' && items.img == 'signout'}
						<img
							class="max-w-[24px]"
							src={`/images/icons/${items.img}-active.svg`}
							alt={items.name}
						/>
						<span class="text-semibold text-black">{items.name}</span>
						<span class="-left-10 absolute w-2 h-10 bg-yellow" />
					{:else}
						<img class="max-w-[24px]" src={`/images/icons/${items.img}.svg`} alt={items.name} />
						<span>{items.name}</span>
					{/if}
				</a>
			{/each}
		</div>
	</aside>
  <main class="w-full mx-auto overflow-auto custom-scroll">
    <slot/>
  </main>
</section>
-->
