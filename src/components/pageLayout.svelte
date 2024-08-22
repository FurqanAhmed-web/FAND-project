{#if $$slots.menu}
	<slot name="menu" />
{/if}
{#if $$slots.menu}
	<main class="w-[63%] overflow-auto custom-scroll">
		<slot />
	</main>
{:else}
  <slot/>
{/if}