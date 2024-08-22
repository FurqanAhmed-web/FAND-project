<script>
	export let checkboxes = [];
</script>

<div
	class="font-medium leading-6 text-gray-11 flex flex-row flex-wrap gap-y-4 gap-x-2 w-full max-w-[696px] whitespace-nowrap"
>
	{#each checkboxes as { name, label, value } (name)}
		<label class="flex flex-row items-center gap-3 w-full">
			<input bind:checked={value} class="checkbox-brand w-5 h-5 min-w-[20px]" type="checkbox" />
			{label}
		</label>
	{/each}
</div>
