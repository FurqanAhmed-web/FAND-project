<script>
	import { goto, invalidateAll } from '$app/navigation';
	import { signOut } from '$lib/supabase';

	export let data;
	const handleLogout = async () => {
		await signOut(data.supabase);
		await invalidateAll();  
		goto('/sign-out');
	};

  handleLogout()
</script>