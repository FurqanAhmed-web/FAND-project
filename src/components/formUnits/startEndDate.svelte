<script>
	export let dateArray = {};
	export let error;

	let startYear, startMonth, startDay, endYear, endMonth, endDay;
	let startYearOption = false,
		startMonthOption = false,
		startDayOption = false,
		endYearOption = false,
		endMonthOption = false,
		endDayOption = false;

	let currentDate = new Date();
	$: pageError = '';
	$: endDateToggler = false;
	$: {
		const startDate = new Date(
			dateArray.start.value.year,
			dateArray.start.value.month - 1,
			dateArray.start.value.day
		);
		const endDate = new Date(
			dateArray.end.value.year,
			dateArray.end.value.month - 1,
			dateArray.end.value.day
		);

		const isEmpty = Object.values(dateArray).some((dateObj) => {
			const { value } = dateObj;
			return value.day === '' || value.month === '' || value.year === '';
		});

		if (
			dateArray.start.value.year != '' &&
			dateArray.start.value.month != '' &&
			dateArray.start.value.day != ''
		) {
			endDateToggler = true;
		} else {
			endDateToggler = false;
		}

		if (!isEmpty) {
			if (startDate >= endDate) {
				error = 'Invalid campaign dates!';
			} else {
				error = '';
			}
		}

		if (pageError != '') {
			error = pageError;
		}
	}

	const validateStartYear = ({ self_ = false, year_ = null }) => {
		dateArray.start.value.year = '';

		if (year_) {
			startYear.value = year_;
		}

		let year = startYear.value;

		if (!year) {
			if (self_) {
				return;
			} else {
				pageError = 'Fill year of starting campaign date first!';
				return false;
			}
		}

		if (year.length != 4) {
			pageError = 'Invalid starting year for campaign!';
			return false;
		}

		year = parseInt(year);

		if (year < currentDate.getFullYear()) {
			pageError = 'Invalid starting year for campaign!';
			return false;
		}

		dateArray.start.value.year = year;
		return true;
	};

	const validateStartMonth = ({ self_ = false, month_ = null }) => {
		dateArray.start.value.month = '';

		if (month_) {
			startMonth.value = `${month_}`;
		}
		let month = startMonth.value;

		if (!month) {
			if (self_) {
				return;
			} else {
				pageError = 'Fill month of starting campaign date first!';
				return false;
			}
		}

		if (month.length > 2) {
			pageError = 'Invalid starting month for campaign!';
			return false;
		}
		month = parseInt(month);

		if (month < 1 || month > 12) {
			pageError = 'Invalid starting month for campaign!';
			return false;
		}

		if (
			parseInt(startYear.value) === currentDate.getFullYear() &&
			month < currentDate.getMonth() + 1
		) {
			pageError = 'Invalid starting month for campaign!';
			return false;
		}

		dateArray.start.value.month = month;
		return true;
	};

	const validateStartDay = ({ self_ = false, day_ = null }) => {
		dateArray.start.value.day = '';

		if (day_) {
			startDay.value = `${day_}`;
		}
		let day = startDay.value;

		if (!day) {
			if (self_) {
				return;
			} else {
				pageError = 'Fill day of starting campaign date first!';
				return false;
			}
		}

		if (day.length > 2) {
			pageError = 'Invalid starting day for campaign!';
			return false;
		}
		day = parseInt(day);

		let days = getDaysInMonth(parseInt(startYear.value), parseInt(startMonth.value));

		if (day < 1 || day > days) {
			pageError = 'Invalid starting day for campaign!';
			return false;
		}

		if (
			parseInt(startYear.value) === currentDate.getFullYear() &&
			parseInt(startMonth.value) === currentDate.getMonth() + 1 &&
			day < currentDate.getDate()
		) {
			pageError = 'Invalid starting day for campaign!';
			return false;
		}

		dateArray.start.value.day = day;
		return true;
	};

	const validateEndYear = ({ self_ = false, year_ = null }) => {
		dateArray.end.value.year = '';
		if (year_) {
			endYear.value = `${year_}`;
		}
		let year = endYear.value;

		if (!year) {
			if (self_) {
				return;
			} else {
				pageError = 'Fill year of ending campaign first!';
				return false;
			}
		}

		if (year.length != 4) {
			pageError = 'Invalid ending year for campaign!';
			return false;
		}

		year = parseInt(year);

		if (year < currentDate.getFullYear() && year < parseInt(startYear.value)) {
			pageError = 'Invalid ending year for campaign!';
			return false;
		}

		dateArray.end.value.year = year;
		return true;
	};

	const validateEndMonth = ({ self_ = false, month_ = null }) => {
		dateArray.end.value.month = '';
		if (month_) {
			endMonth.value = `${month_}`;
		}
		let month = endMonth.value;

		if (!month) {
			if (self_) {
				return;
			} else {
				pageError = 'Fill month of ending campaign first!';
				return false;
			}
		}

		if (month.length > 2) {
			pageError = 'Invalid ending month for campaign!';
			return false;
		}

		month = parseInt(month);

		if (month < 1 || month > 12) {
			pageError = 'Invalid ending month for campaign!';
			return false;
		}

		if (
			parseInt(startYear.value) === parseInt(endYear.value) &&
			month < parseInt(startMonth.value)
		) {
			pageError = 'Invalid ending month for campaign!';
			return false;
		}

		dateArray.end.value.month = month;
		return true;
	};

	const validateEndDay = ({ self_ = false, day_ = null }) => {
		dateArray.end.value.day = '';
		if (day_) {
			endDay.value = `${day_}`;
		}
		let day = endDay.value;

		if (!day) {
			if (self_) {
				return;
			} else {
				pageError = 'Fill day of ending campaign first!';
				return false;
			}
		}

		if (day.length > 2) {
			pageError = 'Invalid ending month for campaign!';
			return false;
		}

		day = parseInt(day);
		let days = getDaysInMonth(parseInt(endYear.value), parseInt(endMonth.value));

		if (day < 1 || day > days) {
			pageError = 'Invalid ending day for campaign!';
			return false;
		}

		if (
			parseInt(endYear.value) === parseInt(startYear.value) &&
			parseInt(endMonth.value) === parseInt(startMonth.value) &&
			day < parseInt(endDay.value)
		) {
			pageError = 'Invalid Campaign Dates!';
			return false;
		}

		dateArray.end.value.day = day;
		return true;
	};

	const getYears = (start = true) => {
		if (start) {
			return Array.from({ length: 6 }, (_, i) => currentDate.getFullYear() + i);
		}

		let sYear = startYear.value;
		let sMonth = startMonth.value;
		let sDay = startDay.value;

		const _startDate = new Date(sYear, sMonth - 1, sDay);
		_startDate.setDate(_startDate.getDate() + 1);

		const year = _startDate.getFullYear();

		return Array.from({ length: 6 }, (_, i) => year + i);
	};

	const getMonths = (start = true) => {
		let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

		if (start && startYear.value == currentDate.getFullYear()) {
			return months.slice(currentDate.getMonth());
		} else if (start) {
			return months;
		}

		let sYear = startYear.value;
		let sMonth = startMonth.value;
		let sDay = startDay.value;

		const _startDate = new Date(sYear, sMonth - 1, sDay);
		_startDate.setDate(_startDate.getDate() + 1);

		const month = _startDate.getMonth();
		return months.slice(month);
	};

	const getDays = (start = true) => {
		let days = Array.from(
			{ length: getDaysInMonth(parseInt(startYear.value), parseInt(startMonth.value)) },
			(_, i) => i + 1
		);
		if (
			start &&
			startYear.value == currentDate.getFullYear() &&
			startMonth.value == currentDate.getMonth() + 1
		) {
			return days.slice(currentDate.getDate() - 1);
		} else if (start) {
			return days;
		}

		days = Array.from(
			{ length: getDaysInMonth(parseInt(endYear.value), parseInt(endMonth.value)) },
			(_, i) => i + 1
		);
		let sYear = startYear.value;
		let sMonth = startMonth.value;
		let sDay = startDay.value;

		if (sYear == endYear.value && sMonth == endMonth.value) {
			const _startDate = new Date(sYear, sMonth - 1, sDay);
			_startDate.setDate(_startDate.getDate() + 1);

			const day = _startDate.getDate();
			return days.slice(day - 1);
		}

		return days;
	};

	const getDaysInMonth = (year, month) => {
		const date = new Date(year, month - 1, 1);

		date.setMonth(date.getMonth() + 1);
		date.setDate(date.getDate() - 1);

		return date.getDate();
	};

	$: console.log(dateArray);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex flex-col gap-6 w-full">
	{#if error != ''}
		<p class="text-error leading-5 mt-2">{error}</p>
	{/if}
	<div class="flex flex-col gap-3 w-full">
		<span class="text-[16px] font-bold leading-5 text-gray-11">{dateArray.start.label}</span>
		<div class="flex flex-col gap-1 w-full">
			<span>Choose year, month and day.</span>
			<div id="date" class="flex flex-row gap-5 font-poppins text-gray-13">
				<div class="relative w-full max-w-[80px]">
					<input
						bind:this={startYear}
						on:blur={() => validateStartYear({ self_: true })}
						on:focus={() => {
							pageError = '';
							error = '';
						}}
						maxlength="4"
						type="number"
						placeholder="YYYY"
						pattern="[0-9]"
						class="w-full py-2 px-3 border-[1px] rounded-[4px] pl-4 {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
					<button
						class="absolute top-0 bottom-0.5 right-2 m-auto"
						on:focus={() => (startYearOption = true)}
						on:blur={() => {
							setTimeout(() => {
								startYearOption = false;
							}, 100);
						}}
						type="button"
					>
						<img
							class={startYearOption ? 'rotate-180' : ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					{#if startYearOption}
						<div
							class="h-fit bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute bottom-12 m-auto flex flex-col gap-2 shadow-md"
						>
							{#each getYears() as year (`start:${year}`)}
								<button
									on:click={() => {
										error = '';
										pageError = '';
										validateStartYear({ self_: false, year_: year });
									}}
									type="button"
									class="hover:bg-yellow px-2 rounded-md text-start w-full flex items-center justify-center"
								>
									{year}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<div class="relative w-full max-w-[68px]">
					<input
						bind:this={startMonth}
						on:blur={() => validateStartMonth({ self_: true })}
						on:focus={() => {
							if (!validateStartYear({ self_: false })) {
							} else {
								pageError = '';
								error = '';
							}
						}}
						type="number"
						placeholder="MM"
						class="w-full py-2 px-3 border-[1px] rounded-[4px] pl-4 {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
					<button
						class="absolute top-0 bottom-0.5 right-2 m-auto"
						on:focus={() => (startMonthOption = true)}
						on:blur={() => {
							setTimeout(() => {
								startMonthOption = false;
							}, 100);
						}}
						type="button"
					>
						<img
							class={startMonthOption && startYear.value != '' ? 'rotate-180' : ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					{#if startMonthOption && startYear.value != ''}
						<div
							class="h-fit max-h-[200px] custom-scroll overflow-auto bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute z-20 bottom-12 m-auto flex flex-col gap-2 shadow-md"
						>
							{#each getMonths() as month (`start:${month}`)}
								<button
									on:click={() => {
										error = '';
										pageError = '';
										validateStartMonth({ self_: false, month_: month });
									}}
									type="button"
									class="hover:bg-yellow px-2 rounded-md text-start w-full flex items-center justify-center"
								>
									{month}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<div class="relative w-full max-w-[68px]">
					<input
						bind:this={startDay}
						on:blur={() => validateStartDay({ self_: true })}
						on:focus={() => {
							if (!validateStartYear({ self_: false }) || !validateStartMonth({ self_: false })) {
							} else {
								pageError = '';
								error = '';
							}
						}}
						type="number"
						placeholder="DD"
						class="w-full py-2 px-3 border-[1px] rounded-[4px] pl-4 {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
					<button
						class="absolute top-0 bottom-0.5 right-2 m-auto"
						on:focus={() => (startDayOption = true)}
						on:blur={() => {
							setTimeout(() => {
								startDayOption = false;
							}, 100);
						}}
						type="button"
					>
						<img
							class={startDayOption && startYear.value != '' && startMonth.value != ''
								? 'rotate-180'
								: ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>

					{#if startDayOption && startYear.value != '' && startMonth.value != ''}
						<div
							class="h-fit max-h-[200px] custom-scroll overflow-auto bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute z-20 bottom-12 m-auto flex flex-col gap-2 shadow-md"
						>
							{#each getDays() as day (`start:${day}`)}
								<button
									on:click={() => {
										error = '';
										pageError = '';
										validateStartDay({ self_: false, day_: day });
									}}
									type="button"
									class="hover:bg-yellow px-2 rounded-md text-start w-full flex items-center justify-center"
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

	<div class="flex flex-col gap-3 w-full">
		<span class="text-[16px] font-bold leading-5 text-gray-11">{dateArray.end.label}</span>
		<div class="flex flex-col gap-1 w-full">
			<span>Choose year, month and day.</span>
			<div id="date" class="flex flex-row gap-5 font-poppins text-gray-13">
				<div class="relative w-full max-w-[80px]">
					<input
						bind:this={endYear}
						on:blur={() => validateEndYear({ self_: true })}
						on:focus={() => {
							if (
								!validateStartYear({ self_: false }) ||
								!validateStartMonth({ self_: false }) ||
								!validateStartDay({ self_: false })
							) {
							} else {
								pageError = '';
								error = '';
							}
						}}
						disabled={!endDateToggler}
						type="number"
						placeholder="YYYY"
						class="w-full py-2 px-3 border-[1px] rounded-[4px] pl-4 {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
					<button
						class="absolute top-0 bottom-0.5 right-2 m-auto"
						on:focus={() => (endYearOption = true)}
						on:blur={() => {
							setTimeout(() => {
								endYearOption = false;
							}, 100);
						}}
						type="button"
						disabled={!endDateToggler}
					>
						<img
							class={endYearOption ? 'rotate-180' : ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					{#if endYearOption}
						<div
							class="h-fit bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute bottom-12 m-auto flex flex-col gap-2 shadow-md"
						>
							{#each getYears(false) as year (`end:${year}`)}
								<button
									on:click={() => {
										error = '';
										pageError = '';
										validateEndYear({ self_: false, year_: year });
									}}
									type="button"
									class="hover:bg-yellow px-2 rounded-md text-start w-full flex items-center justify-center"
								>
									{year}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<div class="relative w-full max-w-[68px]">
					<input
						bind:this={endMonth}
						on:blur={() => validateEndMonth({ self_: true })}
						on:focus={() => {
							if (
								!validateStartYear({ self_: false }) ||
								!validateStartMonth({ self_: false }) ||
								!validateStartDay({ self_: false }) ||
								!validateEndYear({ self_: false })
							) {
							} else {
								pageError = '';
								error = '';
							}
						}}
						disabled={!endDateToggler}
						type="number"
						placeholder="MM"
						class="w-full py-2 px-3 border-[1px] rounded-[4px] pl-4 {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
					<button
						class="absolute top-0 bottom-0.5 right-2 m-auto"
						on:focus={() => (endMonthOption = true)}
						on:blur={() => {
							setTimeout(() => {
								endMonthOption = false;
							}, 100);
						}}
						type="button"
						disabled={!endDateToggler}
					>
						<img
							class={endMonthOption && endYear.value != '' ? 'rotate-180' : ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					{#if endMonthOption && endYear.value != ''}
						<div
							class="h-fit max-h-[200px] custom-scroll overflow-auto bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute z-20 bottom-12 m-auto flex flex-col gap-2 shadow-md"
						>
							{#each getMonths(false) as month (`end:${month}`)}
								<button
									on:click={() => {
										error = '';
										pageError = '';
										validateEndMonth({ self_: false, month_: month });
									}}
									type="button"
									class="hover:bg-yellow px-2 rounded-md text-start w-full flex items-center justify-center"
								>
									{month}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<div class="relative w-full max-w-[68px]">
					<input
						bind:this={endDay}
						on:blur={() => validateEndDay({ self_: true })}
						on:focus={() => {
							if (
								!validateStartYear({ self_: false }) ||
								!validateStartMonth({ self_: false }) ||
								!validateStartDay({ self_: false }) ||
								!validateEndYear({ self_: false }) ||
								!validateEndMonth({ self_: false })
							) {
							} else {
								pageError = '';
								error = '';
							}
						}}
						disabled={!endDateToggler}
						type="number"
						placeholder="DD"
						class="w-full py-2 px-3 border-[1px] rounded-[4px] pl-4 {error == ''
							? 'text-gray-13 border-gray-2'
							: 'text-error border-error'}"
					/>
					<button
						class="absolute top-0 bottom-0.5 right-2 m-auto"
						on:focus={() => (endDayOption = true)}
						on:blur={() => {
							setTimeout(() => {
								endDayOption = false;
							}, 100);
						}}
						type="button"
						disabled={!endDateToggler}
					>
						<img
							class={endDayOption && endYear.value != '' && endMonth.value != ''
								? 'rotate-180'
								: ''}
							src="/images/icons/select-down-arrow.svg"
							alt="arrow"
						/>
					</button>
					{#if endDayOption && endYear.value != '' && endMonth.value != ''}
						<div
							class="h-fit max-h-[200px] custom-scroll overflow-auto bg-white w-full p-2 border-[1px] border-gray-2 rounded-[4px] absolute z-20 bottom-12 m-auto flex flex-col gap-2 shadow-md"
						>
							{#each getDays(false) as day (`end:${day}`)}
								<button
									on:click={() => {
										error = '';
										pageError = '';
										validateEndDay({ self_: false, day_: day });
									}}
									type="button"
									class="hover:bg-yellow px-2 rounded-md text-start w-full flex items-center justify-center"
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
</div>
