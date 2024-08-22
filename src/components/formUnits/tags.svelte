<script>
	export let tags = [];
	export let error;

	let value;

	const handleKeyDown = (e) => {
		error = '';
		if (e.key === ' ' || e.key === 'Enter') {
			if (value && value !== '') {
				tags = [...tags, value];
				value = '';
			}
		}
	};

  const handleOnBlur = (e) =>{
    error = '';
    if (value && value !== '') {
      tags = [...tags, value];
      value = '';
    }
  }

	const removeTag = (index) => {
		tags = tags.filter((_, i) => i !== index);
	};
</script>

<div class="relative w-full flex flex-col gap-4">
	<input
		bind:value
		on:keydown={handleKeyDown}
    on:blur={handleOnBlur}
		id="tags"
		name="tags"
		type="text"
		class="{ error == 'not_exist' ? "border-error text-error" : "border-gray-2 text-gray-13" } border-[1px] py-2 px-3 rounded-lg appearance-none w-full"
		placeholder="Enter tags"
	/>
	<div id="tag-output" class="flex flex-row flex-wrap gap-4">
		{#each tags as tag, index (index)}
			<span class="relative bg-black py-3 px-4 rounded-2xl text-white text-[14px]">
				#{tag}
				<button
					on:click={() => removeTag(index)}
					class="bg-[#F2D2BD] absolute -top-1 -right-1 z-20 w-4 rounded-full"
				>
					<img src="/images/icons/close.svg" alt="remove" />
				</button>
			</span>
		{/each}
	</div>
	{#if error == 'not_exist'}
		<span class="text-error leading-5 -mt-5">Please enter atleast one tag</span>
	{/if}
</div>
