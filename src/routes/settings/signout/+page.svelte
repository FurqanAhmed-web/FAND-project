<script>
	import { goto, invalidateAll } from '$app/navigation';
	import { signOut } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let data;
	const handleLogout = async () => {
		await signOut(data.supabase);
		await invalidateAll();  
		goto('/sign-out');
	};

  onMount(()=>{
    handleLogout()
  })

</script>

