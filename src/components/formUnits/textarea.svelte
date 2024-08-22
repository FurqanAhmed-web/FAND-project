<script>
	export let name;
	export let label;
	export let error = '';
	export let value = '';
</script>

<div class="flex flex-col gap-3">
	<span for={name} class="text-[16px] font-bold leading-5 text-gray-11">{label}</span>
	<div class="relative w-full">
		<textarea
			on:change={() => (error = '')}
			{name}
			bind:value
			class="{error == 'not_exist'
				? 'border-error text-error'
				: 'border-gray-2'} p-3 border-[1px] w-full resize-none rounded-lg outline-none"
			id=""
			cols="30"
			rows="10"
			placeholder={`Enter ${label}...`}
		/>
		{#if error == 'not_exist'}
			<span class="text-error leading-5">Please enter {label?.toLowerCase()}</span>
		{/if}
	</div>
</div>
