<script>
	import { isNil, isNotNil } from 'ramda';
	import Date from './date.svelte';

	export let dates = {
		start: {
			value: {
				day: null,
				month: null,
				year: null
			}
		},
		end: {
			value: {
				day: null,
				month: null,
				year: null
			}
		}
	};
	export let error = '';

	let invalidStartDate = false;

	let isInvalidDate = (date) => {
		if (isNotNil(date)) {
			const { day, month, year } = date;
			return isNil(day) || isNil(month) || isNil(year);
		}
		return true;
	};

	$: {
		invalidStartDate = isInvalidDate(dates.start.value);
	}

	$: console.log(dates);
</script>

<Date
	title="Start Date"
	bind:error
	bind:day={dates.start.value.day}
	bind:month={dates.start.value.month}
	bind:year={dates.start.value.year}
/>
<Date
	title="End Date"
	bind:startYear={dates.start.value.year}
	bind:error
	bind:disabled={invalidStartDate}
	bind:day={dates.end.value.day}
	bind:month={dates.end.value.month}
	bind:year={dates.end.value.year}
/>
