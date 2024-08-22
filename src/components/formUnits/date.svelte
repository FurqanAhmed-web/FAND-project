<script>
	import { equals } from 'ramda';

	export let day = null;
	export let month = null;
	export let year = null;
	export let error = '';
	export let title = '';
	export let disabled = false;
	export let startYear;

	let options = {
		day: false,
		month: false,
		year: false
	};

	const getYears = (n = 10) => {
		if (!startYear) {
			const currentYear = new Date().getFullYear();
			return Array.from({ length: n }, (_, index) => currentYear + index).reverse();
		} else {
			return Array.from({ length: n }, (_, index) => startYear + index).reverse();
		}
	};

	const getMonths = () => {
		return Array.from({ length: 12 }, (_, index) => index + 1).reverse();
	};

	const getDays = (month, year) => {
		const daysInMonth = new Date(year, month, 0).getDate();
		return Array.from({ length: daysInMonth }, (_, index) => index + 1).reverse();
	};

	const handleSelect = (name, value) => () => {
		if (equals(name, 'day')) {
			day = value;
		} else if (equals(name, 'month')) {
			month = value;
			day = null;
		} else {
			year = value;
			month = null;
			day = null;
		}
	};

	const toggle =
		(name, blur = false) =>
		() => {
			if (blur) {
				setTimeout(() => {
					options[name] = !options[name];
				}, 100);
			} else options[name] = !options[name];
		};
</script>

<div class="flex flex-col gap-3 w-full">
	<span class="text-[16px] font-bold leading-5 text-gray-11">{title}</span>
	<div class="flex flex-col gap-1 w-full">
		<span>Choose year, month and day.</span>
		<div id="date" class="flex flex-row gap-5 font-poppins text-gray-13">
			<div class="relative w-full max-w-[80px]">
				{#if disabled}
					<input
						disabled={true}
						type="number"
						placeholder="YYYY"
						pattern="[0-9]"
						class="h-12 custom-scroll w-full py-2 px-3 border-[1px] rounded-[4px] pl-[12px] {error ==
						''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
				{:else}
					<input
						bind:value={year}
						min={getYears().pop()}
						max={getYears().shift()}
						type="number"
						placeholder="YYYY"
						pattern="[0-9]"
						class="h-12 w-full pl-[12px] py-2 px-3 border-[1px] rounded-[4px] {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
				{/if}

				{#if !disabled}
					<button
						class="absolute top-0 bottom-0 right-2 m-auto"
						on:click={toggle('year')}
						on:blur={toggle('year', true)}
						type="button"
					>
						<img
							class={options.year ? 'rotate-180' : ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					<div
						class:hidden={!options.year}
						class="h-48 overflow-y-auto bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute bottom-12 m-auto flex flex-col gap-2 shadow-md custom-scroll"
					>
						{#each getYears() as year (year)}
							<button
								on:click={handleSelect('year', year)}
								type="button"
								class="hover:bg-yellow cursor-pointer px-2 rounded-md text-start w-full flex items-center justify-center"
							>
								{year}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="relative w-full max-w-[72px]">
				{#if disabled}
					<input
						disabled={true}
						type="number"
						placeholder="MM"
						class="h-12 w-full py-2 px-3 border-[1px] rounded-[4px] pl-[12px] {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
				{:else}
					<input
						bind:value={month}
						min={getMonths().pop()}
						max={getMonths().shift()}
						type="number"
						placeholder="MM"
						class="h-12 w-full py-2 px-3 border-[1px] rounded-[4px] pl-[12px] {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
				{/if}

				{#if !disabled}
					<button
						class="absolute top-0 bottom-0 right-2.5 m-auto"
						{disabled}
						on:click={toggle('month')}
						on:blur={toggle('month', true)}
						type="button"
					>
						<img
							class={options.month ? 'rotate-180' : ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					<div
						class:hidden={!options.month}
						class="h-48 overflow-y-auto bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute bottom-12 m-auto flex flex-col gap-2 shadow-md custom-scroll"
					>
						{#each getMonths() as month (month)}
							<button
								on:click={handleSelect('month', month)}
								type="button"
								class="hover:bg-yellow cursor-pointer px-2 rounded-md text-start w-full flex items-center justify-center"
							>
								{month}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="relative w-full max-w-[72px]">
				{#if disabled}
					<input
						disabled={true}
						type="number"
						placeholder="DD"
						class="h-12 w-full py-2 px-3 border-[1px] rounded-[4px] {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
				{:else}
					<input
						bind:value={day}
						min={getDays(month, year).pop()}
						max={getDays(month, year).shift()}
						type="number"
						placeholder="DD"
						class="h-12 w-full pl-[12px] py-2 px-3 border-[1px] rounded-[4px] {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
				{/if}

				{#if !disabled}
					<button
						class="absolute top-0 bottom-0 right-2.5 m-auto"
						{disabled}
						on:click={toggle('day')}
						on:blur={toggle('day', true)}
						type="button"
					>
						<img
							class={options.day ? 'rotate-180' : ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					<div
						class:hidden={!options.day}
						class="h-48 overflow-y-auto bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute bottom-12 m-auto flex flex-col gap-2 shadow-md custom-scroll"
					>
						{#each getDays(month, year) as day (day)}
							<button
								on:click={handleSelect('day', day)}
								type="button"
								class="hover:bg-yellow cursor-pointer px-2 rounded-md text-start w-full flex items-center justify-center"
							>
								{day}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		{#if error == 'not_exist'}
			<span class="text-error leading-5 mt-2">Enter dates</span>
		{/if}
	</div>
</div>
