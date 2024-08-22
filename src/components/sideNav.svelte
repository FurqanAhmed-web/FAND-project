<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { includes } from 'ramda';

	let announcement = false;
	let currentRoute;

	let campaignNav = [
		{ label: 'Chat', route: 'chat', icon: 'chat' },
		{ label: 'Athletes', route: 'athletes/browse', icon: 'athletes' },
		{ label: 'Campaigns', route: 'campaigns/browse', icon: 'campaigns' },
		//{ label: 'Feed', route: 'feed/browse', icon: 'feed' },
		{ label: 'Teams', route: 'teams/browse', icon: 'teams' },
		{ label: 'Media Library', route: 'media/browse', icon: 'media-library' }
	];

	let adminNav = [
		{ label: 'Chat', route: 'admin/chat', icon: 'chat' },
		{ label: 'Athletes', route: 'admin/athletes/browse', icon: 'athletes' },
		{ label: 'Campaigns', route: 'admin/campaigns/browse', icon: 'campaigns' },
		{ label: 'Analytics', route: 'admin/analytics', icon: 'analytics' },
		{ label: 'Media Library', route: 'admin/media/browse', icon: 'media-library' }
	];

	let subNav = [
		{ label: 'Organization', route: 'organization/browse', icon: 'organization' },
		{ label: 'Status', route: 'status', icon: 'status' },
		{ label: 'Support', route: 'support', icon: 'support' },
		{ label: 'Settings', route: 'settings/', icon: 'settings' }
	];

	let adminSubNav = [
		{ label: 'Organizations', route: 'organizations/browse', icon: 'organization' },
		{ label: 'Roadmap', route: 'roadmap/browse', icon: 'roadmap' },
		{ label: 'Subscription', route: 'subscription/browse', icon: 'subscription' },
		{ label: 'Settings', route: 'settings/prompt/browse', icon: 'settings' }
	];

	currentRoute = $page.route.id;

	const unsubscribe = page.subscribe(() => {
		currentRoute = $page.route.id;
	});

	onMount(() => {
		return unsubscribe;
	});
</script>

{#if currentRoute.includes('admin')}
	<aside
		id="side-nav"
		class="overflow-auto p-8 pr-4 flex flex-col
    {announcement ? 'gap-20 justify-between' : 'gap-6'} 
    w-[18.5%] border-r-[1px] border-gray-4 custom-scroll"
	>
		<div class="flex flex-col gap-6 items-start">
			<a href={'#'}><img src="/images/icons/fand-logo.svg" alt="FAND logo" /></a>
			<div class="flex flex-col text-color-9 gap-4 xl:gap-5 text-[16px] w-full">
				{#each adminNav as nav}
					<a
						href="/{nav.route}"
						class="relative flex flex-row gap-6 items-center justify-start w-full"
					>
						<img
							class="w-[24px] h-[24px]"
							src="/images/icons/{currentRoute.toLowerCase().includes(nav.icon.split('-')[0])
								? `${nav.icon}-active.svg`
								: `${nav.icon}.svg`}"
							alt="Logo"
						/>
						<span
							class="leading-6 font-semibold {currentRoute
								.toLowerCase()
								.includes(nav.icon.split('-')[0])
								? 'text-black'
								: 'text-gray-5'}">{nav.label}</span
						>
						{#if currentRoute.toLowerCase().includes(nav.icon.split('-')[0])}
							<div class="absolute -left-8 w-[8px] h-[40px] bg-yellow" />
						{/if}
					</a>
				{/each}
			</div>
		</div>
		<div class="flex flex-col gap-8 text-[16px]">
			<div id="sub-nav" class="flex flex-col gap-6 text-left font-semibold leading-6">
				{#each adminSubNav as nav}
					<a
						href="/admin/{nav.route}"
						class="relative flex flex-row gap-6 items-center justify-start w-full {currentRoute
							.toLowerCase()
							.includes(nav.icon.toLowerCase())
							? 'text-black'
							: 'text-gray-5'}"
					>
						<img
							class="w-[24px] h-[24px]"
							src="/images/icons/{currentRoute.toLowerCase().includes(nav.icon.toLowerCase())
								? `${nav.icon}-active.svg`
								: `${nav.icon}.svg`}"
							alt="Logo"
						/>
						{nav.label}
						{#if currentRoute.toLowerCase().includes(nav.icon.toLowerCase())}
							<div class="absolute -left-8 w-[8px] h-[40px] bg-yellow" />
						{/if}
					</a>
				{/each}
				<a
					href="/chat/"
					class="relative flex flex-row gap-6 items-center justify-start w-full text-gray-5"
				>
					Campaign Manager
				</a>
			</div>
		</div>
	</aside>
{:else}
	<aside
		id="side-nav"
		class="overflow-auto p-8 pr-4 flex flex-col
  {announcement ? 'gap-20 justify-between' : 'gap-6'} 
  w-[18.5%] border-r-[1px] border-gray-4 custom-scroll"
	>
		<div class="flex flex-col gap-6 items-start">
			<a href={'#'}><img src="/images/icons/fand-logo.svg" alt="FAND logo" /></a>
			<div class="flex flex-col text-color-9 gap-4 xl:gap-5 text-[16px] w-full">
				{#each campaignNav as nav}
					<a
						href="/{nav.route}"
						class="relative flex flex-row gap-6 items-center justify-start w-full"
					>
            {#if !(currentRoute.split('/')[1] === 'athletes')}
              <img
                class="w-[24px] h-[24px]"
                src="/images/icons/{currentRoute.toLowerCase().includes(nav.icon.split('-')[0]) &&
                  (nav.icon.split('-')[0] !== 'athletes' ||
                    (nav.icon.split('-')[0] === 'athletes' &&
                    (currentRoute.toLowerCase() === '/athletes/browse' ||
                      currentRoute.toLowerCase() === '/athletes/add')))
                  ? `${nav.icon}-active.svg`
                  : `${nav.icon}.svg`}"
                alt="Chat logo"
              />
            {:else}
              <img
                class="w-[24px] h-[24px]"
                src="/images/icons/{currentRoute.toLowerCase().includes(nav.icon.split('-')[0]) &&
                  (nav.icon.split('-')[0] !== 'athletes' ||
                    (nav.icon.split('-')[0] === 'athletes' &&
                    (currentRoute.toLowerCase() === '/athletes/browse' ||
                      currentRoute.toLowerCase() === '/athletes/add' ||
                      currentRoute.toLowerCase().includes('/athletes/read/') ||
                      currentRoute.toLowerCase().includes('/athletes/edit/'))))
                  ? `${nav.icon}-active.svg`
                  : `${nav.icon}.svg`}"
                alt="Chat logo"
              />
            {/if}

            {#if !(currentRoute.split('/')[1] === 'athletes')}
              <span
                class="leading-6 font-semibold {currentRoute
                  .toLowerCase()
                  .includes(nav.icon.split('-')[0]) &&
                  (nav.icon.split('-')[0] !== 'athletes' ||
                  (nav.icon.split('-')[0] === 'athletes' &&
                  (currentRoute.toLowerCase() === '/athletes/browse' ||
                  currentRoute.toLowerCase() === '/athletes/add' ||
                  currentRoute.toLowerCase() === '/athletes/edit' ||
                  currentRoute.toLowerCase() === '/athletes/read')))
                  ? 'text-black'
                  : 'text-gray-5'}"
                >
                {nav.label}
              </span>
            {:else}
              <span
                class="leading-6 font-semibold {currentRoute
                  .toLowerCase()
                  .includes(nav.icon.split('-')[0]) &&
                  (nav.icon.split('-')[0] !== 'athletes' ||
                  (nav.icon.split('-')[0] === 'athletes' &&
                  (currentRoute.toLowerCase() === '/athletes/browse' ||
                  currentRoute.toLowerCase() === '/athletes/add' ||
                  currentRoute.toLowerCase().includes('/athletes/edit') ||
                  currentRoute.toLowerCase().includes('/athletes/read'))))
                  ? 'text-black'
                  : 'text-gray-5'}"
                >
                {nav.label}
              </span>
            {/if}

          {#if !(currentRoute.split('/')[1] === 'athletes')}
            {#if currentRoute.toLowerCase().includes(nav.icon.split('-')[0]) &&
              (nav.icon.split('-')[0] !== 'athletes' ||
                (nav.icon.split('-')[0] === 'athletes' &&
                (currentRoute.toLowerCase() === '/athletes/browse' ||
                  currentRoute.toLowerCase() === '/athletes/add' ||
                  currentRoute.toLowerCase() === '/athletes/edit' ||
                  currentRoute.toLowerCase() === '/athletes/read')))
              }
              <div class="absolute -left-8 w-[8px] h-[40px] bg-yellow" />
            {/if}
          {:else}
            {#if currentRoute.toLowerCase().includes(nav.icon.split('-')[0]) &&
              (nav.icon.split('-')[0] !== 'athletes' ||
                (nav.icon.split('-')[0] === 'athletes' &&
                (currentRoute.toLowerCase() === '/athletes/browse' ||
                  currentRoute.toLowerCase() === '/athletes/add' ||
                  currentRoute.toLowerCase().includes('/athletes/edit') ||
                  currentRoute.toLowerCase().includes('/athletes/read'))))
              }
              <div class="absolute -left-8 w-[8px] h-[40px] bg-yellow" />
            {/if}
          {/if}
					</a>
				{/each}
			</div>
		</div>
		<div class="flex flex-col gap-8 text-[16px]">
			<div id="sub-nav" class="flex flex-col gap-6 text-left font-semibold leading-6">
				{#each subNav as nav}
					<a
						href="/{nav.route}"
						class="relative flex flex-row gap-6 items-center justify-start w-full {currentRoute
							.toLowerCase()
							.includes(nav.icon.split('-')[0])
							? 'text-black'
							: 'text-gray-5'}"
					>
						<img
							class="w-[24px] h-[24px]"
							src="/images/icons/{currentRoute.toLowerCase().includes(nav.icon.split('-')[0])
								? `${nav.icon}-active.svg`
								: `${nav.icon}.svg`}"
							alt="Logo"
						/>
						{nav.label}
						{#if currentRoute.toLowerCase().includes(nav.icon.split('-')[0])}
							<div class="absolute -left-8 w-[8px] h-[40px] bg-yellow" />
						{/if}
					</a>
				{/each}
				<a
					href="/admin/analytics/"
					class="relative flex flex-row gap-6 items-center justify-start w-full text-gray-5"
				>
					Admin
				</a>
			</div>
		</div>
	</aside>
{/if}
