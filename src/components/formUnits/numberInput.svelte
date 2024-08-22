<script>
	export let name;
	export let label;
	export let error = '';
	export let value = '';
</script>

<div class="flex flex-col gap-3">
	<label for={name} class="text-[16px] font-bold leading-5 text-gray-11">{label}</label>
	<input
		on:change={() => (error = '')}
		type="number"
		{name}
		bind:value
		class="py-2 px-3 border-[1px] {error == 'not_exist'
			? 'text-error border-error'
			: 'text-gray-13 border-gray-2'} rounded-lg"
		placeholder={`Enter ${label}`}
	/>
	{#if error == 'not_exist'}
		<span class="text-error leading-5">Please enter {label?.toLowerCase()}</span>
	{/if}
</div>
