<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isAuthenticated } from '$lib/utils';
	import { equals, join } from 'ramda';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import '../app.css';
	import SettingSideNav from '../components/settingSideNav.svelte';
	import SideNav from '../components/sideNav.svelte';
	import ToastError from '../components/toastMessages/toastError.svelte';
	import ToastSuccess from '../components/toastMessages/toastSuccess.svelte';
	import { StorageService, SupabaseService, MediaService } from '../lib/supabase';
	import { getPublicBucketUrl } from '../lib/supabase';

	export let data;
	let loading = true;

	let athletes = writable([]);
	let campaigns = writable([]);
	let platforms = writable([]);
	let organizations = writable([]);
	let athletes_campaigns = writable([]);
	let prompts = writable([]);
	let product_notes = writable([]);
	let users = writable([]);
	let plans = writable([]);
	let product_status = writable([]);
	let roles = writable([]);
	let campaign_milestones = writable([]);
	let media = writable([]);
	let media_types = writable([]);

	setContext('athletes', athletes);
	setContext('campaigns', campaigns);
	setContext('platforms', platforms);
	setContext('organizations', organizations);
	setContext('athletes_campaigns', athletes_campaigns);
	setContext('prompts', prompts);
	setContext('product_notes', product_notes);
	setContext('users', users);
	setContext('plans', plans);
	setContext('product_status', product_status);
	setContext('roles', roles);
	setContext('campaign_milestones', campaign_milestones);
	setContext('media', media);
	setContext('media_types', media_types);
	// setContext('roadmap', roadmap);
	// setContext('teams', teams);

	let storageService;
	let mediaService;

	let signedUrls = [];

	const getPublicImageURL = (path) => mediaService.getPublicUrl(path);

	const getAsyncImageURLs = async (paths) => await storageService?.createSignedURLs(paths);

	async function fetchAthleteData() {
		const resp = await data.supabase
			.from('athletes')
			.select('athletes.id AS athlete_id', 'athletes.*', 'campaigns.industry')
			.join('athletes_campaigns', { 'athletes.id': 'athletes_campaigns.athlete_id' })
			.join('campaigns', { 'athletes_campaigns.campaign_id': 'campaigns.id' })
			.eq('campaigns.isactive', true);

		if (resp.error) {
			console.error('Error:', resp.error);
		} else {
			console.log('Result:', resp.data);
			// Handle the data here
		}
	}

	const addActiveCampaigns = (athletes = [], athletes_campaigns = [], campaigns = []) => {
		const getIndustry = (campaign_id) => {
			return campaigns.find((e) => e.id == campaign_id && e.isactive)?.industry || '';
		};

		athletes = athletes.map((athlete) => {
			const athlete_campaigns = athletes_campaigns
				.filter((e) => e.athlete_id == athlete.id)
				.map((e) => e.campaign_id);
			return {
				...athlete,
				athlete_campaigns: join(',')(
					athlete_campaigns.map((campaign_id) => getIndustry(campaign_id)).filter((e) => e)
				)
			};
		});

		return athletes;
	};

	const fetchAllAthletesImages = async () => {
		let image_guids = $athletes.map((e) => e.profile_image_guid);
		if (!equals(image_guids, signedUrls)) {
			signedUrls = await getAsyncImageURLs(image_guids).then((docs) =>
				docs.map((e) => e.signedUrl)
			);
			athletes.set(
				$athletes.map((e, i) => {
					return {
						...e,
						profile_image_guid: signedUrls[i]
					};
				})
			);
		}
	};

	const fetchAllOrganizationsImages = () => {
		organizations.set(
			$organizations.map((e, i) => {
				const url = getPublicImageURL(e.profile_image_guid);
				return {
					...e,
					profile_image_guid: url
				};
			})
		);
	};

	const isAuthUrl = (pathname) => {
		const authUrls = ['/link', '/sign-in', '/sign-out', '/sign-up'];
		return authUrls.includes(pathname);
	};

	const isAdminUrl = (pathname) => {
		return pathname.includes('admin');
	};

	const init = async () => {
		try {
			loading = true;
			const collections = [
				'athletes',
				'campaigns',
				'platforms',
				'organizations',
				'athletes_campaigns',
				'prompts',
				'product_notes',
				'users',
				'plans',
				'product_status',
				'roles',
				'campaign_milestones',
				'media',
				'media_types'
				// 'roadmap',
				// 'teams'
			];

			const collectionPromises = Promise.all(
				collections.map((e) => new SupabaseService(data.supabase, e).get())
			);

			await collectionPromises.then(
				([
					_athletes,
					_campaigns,
					_platforms,
					_organizations,
					_athletes_campaigns,
					_prompts,
					_product_notes,
					_users,
					_plans,
					_product_status,
					_roles,
					_campaign_milestones,
					_media,
					_media_types
					// _roadmap,
					// _teams
				]) => {
					athletes.set(addActiveCampaigns(_athletes, _athletes_campaigns, _campaigns));
					campaigns.set(_campaigns);
					platforms.set(_platforms);
					organizations.set(_organizations);
					athletes_campaigns.set(_athletes_campaigns);
					prompts.set(_prompts);
					product_notes.set(_product_notes);
					users.set(_users);
					plans.set(_plans);
					product_status.set(_product_status);
					roles.set(_roles);
					campaign_milestones.set(_campaign_milestones);
					media.set(_media);
					media_types.set(_media_types);
					// roadmap.set(_product_notes);
					// teams.set(_users);
				}
			);

			loading = false;
		} catch (error) {
			throw error;
		}
	};

	$: {
		if ($athletes && storageService) {
			fetchAllAthletesImages();
		}
	}

	$: {
		if ($organizations && mediaService) {
			fetchAllOrganizationsImages();
		}
	}

	$: {
		if (browser && data)
			if (isAuthUrl($page.url.pathname) && isAuthenticated(data.session)) {
				goto('/chat');
			} else if (!isAuthUrl($page.url.pathname) && !isAuthenticated(data.session)) {
				goto('/sign-in');
			}
	}

	$: {
		if (isAuthenticated(data.session)) {
			init();
		}
	}

	onMount(() => {
		storageService = new StorageService(data.supabase, 'athletes');
		mediaService = new MediaService(data.supabase, '/organizations');
		return $page.route.id;
	});
</script>

<section class="flex flex-row overflow-auto">
	{#if isAuthUrl($page.url.pathname)}
		{#if !isAuthenticated(data.session)}
			<slot />
		{/if}
	{:else if isAuthenticated(data.session)}
		<SideNav />

		{#if $page.route.id.includes('settings')}
			<SettingSideNav />
		{/if}

		<main class="relative w-[{$page.route.id.includes('settings') ? '63%' : '81.5%'}] mx-auto">
			<div class="overflow-auto custom-scroll min-h-screen max-h-screen">
				{#if loading}
					<div
						class="load absolute top-0 left-0 bottom-0 right-0 m-auto w-[100px] h-[100px] border-yellow border-tr-transparent border-[10px] rounded-full"
					/>
				{:else if isAdminUrl($page.url.pathname)}
					<slot />
				{:else}
					<slot />
				{/if}
			</div>
		</main>
	{/if}
</section>

<!--
  {#if currentRoute.includes('link') || currentRoute.includes('sign')}
    {#if isAuthUrl($page.url.pathname)}
      {#if !isAuthenticated(data.session)}
        <slot />
      {/if}
    {:else if isAuthenticated(data.session)}
      {#if loading}
        <div
          class="load absolute top-0 left-0 bottom-0 right-0 m-auto w-[100px] h-[100px] border-yellow border-tr-transparent border-[10px] rounded-full"
        />
      {:else}
        <slot />
      {/if}
    {/if}
  {:else}
    <section class="flex flex-row min-h-screen max-h-screen">
      <SideNav />

      {#if isAuthUrl($page.url.pathname)}
        {#if !isAuthenticated(data.session)}
          <slot />
        {/if}
      {:else if isAuthenticated(data.session)}
        {#if loading}
          <div
            class="load absolute top-0 left-0 bottom-0 right-0 m-auto w-[100px] h-[100px] border-yellow border-tr-transparent border-[10px] rounded-full"
          />
        {:else if isAdminUrl($page.url.pathname)}
          <slot />
        {:else}
          <main class="relative w-full mx-auto overflow-auto custom-scroll">
            <slot />
          </main>
        {/if}
      {/if}
    </section>
  {/if}
-->

<ToastSuccess />
<ToastError />
