<script>
	import { equals, is } from 'ramda';
	import { createEventDispatcher, getContext } from 'svelte';
	import { formatAthlete } from '../helpers/athletes';

	const dispatch = createEventDispatcher();

	export let athlete = {};

	let athletes = getContext('athletes');
	let campaigns = getContext('campaigns');
	let athletes_campaigns = getContext('athletes_campaigns');

	let filteredAthletes,
		filterOpenButton,
		selectedFilter = '';
	let filterOption = false;

	let filters = {
		search: '',
		campaign: null
	};

	const handleSelect = (e) => {
		athlete = filteredAthletes.find(({ id }) => id == e.currentTarget.id);
		dispatch('select', { athlete });
	};

	$: {
		if ($athletes) {
			if (filters.search) {
				filteredAthletes = $athletes
					.filter((e) => e.full_name?.toLowerCase()?.includes(filters.search.toLowerCase()))
					.map(formatAthlete);
				athlete = filteredAthletes[0];
			} else if (filters.campaign) {
				if ($athletes_campaigns.length) {
					const _athletesCampaigns = $athletes_campaigns
						.filter((e) => e.campaign_id == filters.campaign)
						.map((e) => e.athlete_id);
					if (_athletesCampaigns) {
						filteredAthletes = $athletes
							.filter((e) => _athletesCampaigns.includes(e.id))
							.map(formatAthlete);
						athlete = filteredAthletes[0];
					}
				} else {
					filteredAthletes = $athletes.map(formatAthlete);
					athlete = filteredAthletes[0];
				}
			} else {
				filteredAthletes = $athletes.map(formatAthlete);
				athlete = filteredAthletes[0];
			}
		}
	}

	//filter
	const selectFilter = (campaign_id) => {
		if (campaign_id == 'all') {
		} else {
			filters.campaign = campaign_id;
			selectedFilter = campaign_id;
		}
		filterOption = false;
	};

	const hideFilter = (e) => {
		if (e.target !== filterOpenButton && filterOption && !filterOpenButton.contains(e.target)) {
			filterOption = false;
		}
	};

	window.addEventListener('click', hideFilter);
</script>

<aside
	class="max-h-screen overflow-hidden flex flex-col gap-5 xl:gap-8 w-[22.5%] border-r-[1px] border-gray-4 py-5 xl:py-6 h-screen"
>
	<div class="flex flex-col gap-8 text-[16px] leading-6 px-6 2xl:px-8">
		<div class="flex flex-col gap-4">
			<div class="relative h-fit w-full">
				<input
					id="search-filter"
					placeholder="Search Athlete"
					class="w-full px-4 py-2 max-h-10 border-[1px] border-gray-2 rounded-lg"
					type="text"
					bind:value={filters.search}
				/>
				<img
					id="search-icon"
					class="cursor-pointer top-0 right-5 bottom-0 absolute m-auto w-3.5"
					src="/images/icons/search.svg"
					alt="search"
				/>
				<button
					on:click={() => (filters.search = '')}
					class:hidden={filters.search == ''}
					class="top-0 right-5 bottom-0 absolute m-auto w-4"
					><img src="/images/icons/clear.svg" alt="clear" />
				</button>
			</div>
			<!--
        <div class="relative h-fit">
          <label
            class="pointer-events-none absolute top-0.5 bottom-0 left-3 m-auto h-fit"
            for="filter-by">Filter by:</label
          >
          <select
            class="cursor-pointer pl-20 w-full dropdown rounded-lg appearance-none px-4 py-2 max-h-10 border-[1px] border-gray-2"
            name="filter-by"
            bind:value={filters.campaign}
          >
            {#each getFormattedCampaigns($campaigns) as { id, hashtags } (id)}
              <option value={id}>{hashtags}</option>
            {/each}
          </select>
          <img
            class="pointer-events-none absolute top-0.5 bottom-0 right-4 m-auto"
            src="/images/icons/down-arrow-yellow.svg"
            alt="down arrow"
          />
        </div>
      -->
			<div class="relative w-full whitespace-nowrap">
				<button
					bind:this={filterOpenButton}
					on:click={() => (filterOption = !filterOption)}
					class="w-full flex flex-row gap-2 relative h-fit py-2 px-4 max-h-10 border-[1px] border-gray-2 rounded-lg"
				>
					<div>Filter by:</div>
					<div class="flex justify-start w-[40%] 2xl:w-[55%] 3xl:w-[80%]">
						<span class="text-left text-ellipsis overflow-hidden"
							>{$campaigns.find((e) => e.id == filters.campaign)?.name || ''}</span
						>
					</div>
					<button
						class="absolute top-0.5 bottom-0 right-4 m-auto
            {selectedFilter ? '' : 'pointer-events-none'}"
						on:click={() => {
							selectedFilter = '';
							filters.campaign = '';
							filterOption = !filterOption;
						}}
					>
						<img
							class={filterOption ? 'rotate-180' : ''}
							src="/images/icons/{selectedFilter ? 'clear' : 'down-arrow-yellow'}.svg"
							alt="down arrow"
						/>
					</button>
				</button>
				{#if filterOption}
					<ul
						bind:this={filterOption}
						class="px-3 py-2 bg-white z-20 absolute top-12 border-[1px] border-gray-2 w-full max-h-[256px] overflow-y-auto overflow-x-hidden custom-scroll rounded-md"
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						{#each $campaigns.filter((e) => e.name) as { id, name } (id)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

							<li
								{id}
								on:click={selectFilter(id)}
								class="rounded-md py-2 px-4 hover:bg-yellow cursor-pointer text-ellipsis overflow-hidden"
							>
								<span class="px-2">
									{name}
								</span>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
	<div
		class="custom-scroll min-h-[30vh] max-h-[65vh] xl:max-h-[60vh] 2xl:max-h-screen overflow-y-auto"
	>
		<div class="flex flex-col gap-0 overflow-auto">
			{#each filteredAthletes as { id, isactive, full_name, clothing_gender, instagram_username, instagram_follower_count, profile_image_guid }, i (id)}
				<div
					{id}
					on:click={handleSelect}
					on:keydown={handleSelect}
					role="button"
					aria-label={full_name}
					tabindex={i}
					class:bg-yellow={equals(id, athlete.id)}
					class="focos:outline-none flex flex-row gap-3 cursor-pointer items-center px-6 2xl:px-10 py-3 hover:bg-yellow"
				>
					<span class="relative">
						{#if is(String)(profile_image_guid) && profile_image_guid.includes('token')}
							<img
								class="w-[40px] h-[40px] object-cover rounded-full"
								src={profile_image_guid}
								alt="avatar-2"
							/>
						{:else}
							<img class="w-[40px] h-[40px]" src="/images/icons/athletes.svg" alt="avatar-2" />
						{/if}
						<img
							class="absolute bottom-0 right-0"
							src={`/images/icons/${isactive ? 'online' : 'offline'}-indicator.svg`}
							alt="offline"
						/>
					</span>
					<div class="flex flex-col">
						<b class="text-md leading-[16px] font-semibold">{full_name}</b>
						<small class="text-[12px] text-gray-9 leading-[16px] font-medium"
							>@{instagram_username}
							<span
								class="ml-1 border-[1px] border-gray-9 py-[1px] px-[6px] rounded-md font-regular text-[8px] text-gray-9 leading-[8px]"
								>{instagram_follower_count}</span
							>
						</small>
					</div>
				</div>
			{/each}
		</div>
	</div>
</aside>
