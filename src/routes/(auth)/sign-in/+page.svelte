<script>
	import { isEmpty } from 'ramda';
	import { signInWithEmail } from '$lib/supabase';

	export let data;

	let error = '';
	let success = '';
	let loading = false;

	const handleSignIn = async (e) => {
		error = '';
		success = '';
		loading = true;
		e.preventDefault();
		const email = new FormData(e.target).get('email');
		const response = await signInWithEmail(data.supabase, email);
		if (response.status === 429) {
			console.log(Object.entries(response));
			console.log(response);
			error = 'Email rate limit exceeded.';
		} else {
			success = 'Check your email for sign-in link';
		}
		loading = false;
	};
</script>

<div class="flex flex-col gap-6 w-full">
	<div class="flex flex-col items-center">
		<span class="text-black-2 text-[18px] font-semibold leading-7">Welcome Back</span>
		<span class="text-gray text-[14px] leading-5">Please enter your email</span>
	</div>
	<form on:submit={handleSignIn} class="flex flex-col gap-4 w-full items-center">
		<input
			name="email"
			class="w-full max-w-[352px] max-h-[44px] py-3 px-4 rounded-lg border-[1px] border-gray-2 shadow-sm"
			type="email"
			required={true}
			placeholder="Enter email"
		/>
		<button
			disabled={loading}
			type="submit"
			class="w-full max-w-[352px] min-h-[44px] max-h-[44px] px-4 rounded-lg shadow-sm bg-yellow font-semibold"
		>
			{#if loading}
				Loading...
			{:else}
				Sign In
			{/if}</button
		>
		{#if success}
			<div
				class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<p class="font-bold">Sign In Link</p>
				<p class="block text-sm text-black-2">{success}</p>
			</div>
		{:else if !isEmpty(error)}
			<div
				class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<strong class="font-bold">Server Error!</strong>
				<span class="block sm:inline text-black-2">{error}</span>
			</div>
		{/if}
		<span class="text-[14px] leading-5 text-gray">
			Don't have an acount?
			<a class="font-bold" href="/sign-up">Sign Up</a>
		</span>
	</form>
</div>
