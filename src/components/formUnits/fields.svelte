<script>
	import fieldsTypes from '../../helpers/fieldTypes.json';
	import { equals } from 'ramda';
	import Dropdown from './dropdown.svelte';
	import NumberInput from './numberInput.svelte';
	import TextInput from './textInput.svelte';
	import Textarea from './textarea.svelte';
	import Checkboxes from './checkboxes.svelte';
	import Hashtags from './hashtags.svelte';
	import DateRange from './daterange.svelte';
	import FileUpload from '../fileUpload.svelte';
	import DateInput from '../formUnits/dateInput.svelte';
	import EmailInput from '../formUnits/emailInput.svelte';

	export let fields = [];
</script>

{#each fields as e}
	{#if equals(fieldsTypes.DROPDOWN)(e.type)}
		<Dropdown bind:error={e.error} bind:value={e.value} {...e} />
	{:else if equals(fieldsTypes.NUMBER_INPUT)(e.type)}
		<NumberInput bind:error={e.error} bind:value={e.value} {...e} />
	{:else if equals(fieldsTypes.TEXT_INPUT)(e.type)}
		<TextInput bind:error={e.error} bind:value={e.value} {...e} />
	{:else if equals(fieldsTypes.EMAIL_INPUT)(e.type)}
		<EmailInput bind:error={e.error} bind:value={e.value} {...e} />
	{:else if equals(fieldsTypes.TEXT_AREA)(e.type)}
		<Textarea bind:error={e.error} bind:value={e.value} {...e} />
	{:else if equals(fieldsTypes.CHECK_BOXES)(e.type)}
		<Checkboxes bind:checkboxes={e.checkboxes} />
	{:else if equals(fieldsTypes.HASHTAGS)(e.type)}
		<div class="flex flex-col gap-3">
			<label for="hashtags" class="text-[16px] font-bold leading-5 text-gray-11">Hashtags</label>
			<Hashtags bind:hashtags={e.value} bind:error={e.error} />
		</div>
	{:else if equals(fieldsTypes.DATE)(e.type)}
		<DateInput bind:error={e.error} bind:value={e.value} {...e} />
	{:else if equals(fieldsTypes.DATE_RANGE)(e.type)}
		<DateRange bind:dates={e.dates} bind:error={e.error} {...e} />
	{:else if equals(fieldsTypes.FILE)(e.type)}
		<FileUpload bind:files={e.value} bind:error={e.error} {...e} />
	{/if}
{/each}
