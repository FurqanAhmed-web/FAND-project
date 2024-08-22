<script>
	import { onMount } from 'svelte';
	export let label;
	export let options = [];
	export let value;
	export let error;

	let open = false;
	let selected = undefined;

	$: {
		if (value) {
			selected = getName(options) || getType(options);
		}
	}

	const handler = () => {
		open = true;
	};

	const getType = (e) => e?.find((e) => e.id == value)?.type;
	const getName = (e) => e?.find((e) => e.id == value)?.name;

	let showDiv = false;

	const toggleDiv = () => {
		open = !open;
	};

	const handleClickOutside = (event) => {
		const div = document.getElementById(`dropdown-${label}`);
		if (div && !div.contains(event.target)) {
			open = false;
		}
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const handleSelect = (e) => {
		error = '';
		value = e.target.id;
		open = false;
	};

	$: console.log(options);
</script>

<div class="flex flex-col gap-3">
	<span class="text-[16px] font-bold leading-5 text-gray-11">{label}</span>
	<div class="relative" id={`dropdown-${label}`}>
		<button
			type="button"
			on:click={handler}
			class="text-start cursor-pointer leading-6 relative w-full h-[40px] max-h-[40px] rounded-lg px-3 py-2 border-[1px] {error ==
			'not_exist'
				? 'text-error border-error'
				: 'text-gray-13 border-gray-2'}"
		>
			<span>
				{selected || 'Select an option'}
			</span>
		</button>
		{#if open}
			<div
				class="max-h-[240px] overflow-auto custom-scroll bg-white z-50 py-2 px-3 flex flex-col gap-2 rounded-lg absolute top-0 left-0 m-auto h-auto w-full border-[1px] border-gray-2 shadow-md"
			>
				{#each options as option (option.id)}
					<button
						type="button"
						id={option.id}
						class="hover:bg-yellow px-2 rounded-md text-start"
						on:click={handleSelect}
						>{option?.type || option?.name}
					</button>
				{/each}
			</div>
		{/if}
		<img
			class="z-10 absolute right-3 top-0 bottom-0 m-auto pointer-events-none"
			src="/images/icons/select-down-arrow.svg"
			alt="down arrow"
		/>
	</div>
	{#if error == 'not_exist'}
		<span class="text-error leading-5">Please select {label?.toLowerCase()}</span>
	{/if}
</div>
