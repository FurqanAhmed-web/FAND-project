<script>
	export let name;
	export let label;
	export let error = '';
	export let value = '';

	const isValidEmail = (email) => {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(email);
	};

	const checkEmail = () => {
		isValidEmail(value) ? (error = '') : (error = 'invalid_email');
	};
</script>

<div class="flex flex-col gap-3">
	<label for={name} class="text-[16px] font-bold leading-5 text-gray-11">{label}</label>
	<input
		on:change={() => (error = '')}
		on:input={checkEmail}
		type="email"
		{name}
		bind:value
		class="py-2 px-3 border-[1px] {error == 'not_exist'
			? 'text-error border-error'
			: 'text-gray-13 border-gray-2'} rounded-lg"
		placeholder={`Enter ${label}`}
	/>
	{#if error == 'not_exist'}
		<span class="text-error leading-5">Please enter {label?.toLowerCase()}</span>
	{:else if error == 'invalid_email'}
		<span class="text-error leading-5">Please enter a valid email</span>
	{/if}
</div>
