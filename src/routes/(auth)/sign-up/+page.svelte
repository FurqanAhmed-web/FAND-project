<script>
	import SignUpHandler from '../../../components/signUpHandler.svelte';
	import { isEmpty } from 'ramda';
	import { signInWithEmail } from '$lib/supabase';

	export let data;

	let error = '';
	let success = '';
	let loading = false;

	const handleSignUp = async (e) => {
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
			success = 'Check your email for sign-up link';
		}
		loading = false;
	};
</script>

<div class="flex flex-col gap-6 w-full">
	<div class="flex flex-col items-center">
		<span id="placeholder-header" class="text-black-2 text-[18px] font-semibold leading-7"
			>Sign Up</span
		>
		<span id="placeholder-text" class="text-gray text-[14px] leading-5"
			>Please enter your email</span
		>
	</div>
	<form on:submit={handleSignUp} class="flex flex-col gap-4 w-full items-center">
		<input
			id="input-email"
			name="email"
			class="w-full max-w-[352px] max-h-[44px] py-3 px-4 rounded-lg border-[1px] border-gray-2 shadow-sm"
			type="email"
			required={true}
			placeholder="Enter email"
		/>
		<button
			type="submit"
			disabled={loading}
			id="signup-button"
			class="w-full max-w-[352px] min-h-[44px] max-h-[44px] px-4 rounded-lg shadow-sm bg-yellow font-semibold"
		>
			{#if loading}
				Loading...
			{:else}
				Sign Up
			{/if}</button
		>
		{#if success}
			<div
				class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<p class="font-bold">Sign Up Link</p>
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
		<p
			class="mt-2 mx-auto max-w-[352px] text-center text-[12px] font-semibold leading-6 text-black"
		>
			Unlock a world of possibilities by signing up, where you'll gain instant access to a platform
			designed to enhance your life, streamline tasks, and connect you with a vibrant community.
		</p>
	</form>
</div>
