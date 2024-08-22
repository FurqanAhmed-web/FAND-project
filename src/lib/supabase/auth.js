import { PUBLIC_REDIRECT_URL } from '$env/static/public';

async function signInWithEmail(supabase, email) {
	console.log(PUBLIC_REDIRECT_URL);
	try {
		const { data, error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: PUBLIC_REDIRECT_URL
			}
		});

		if (error) {
			return error;
		}

		return data;
	} catch (error) {
		return error;
	}
}

async function signOut(supabase) {
	const { error } = await supabase.auth.signOut();
	console.log(error);
}

export { signInWithEmail, signOut };
