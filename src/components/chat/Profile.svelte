<script>
	import { both, equals, has, hasPath, includes, isNotNil } from 'ramda';
	import { page } from '$app/stores';
	export let athlete;

	const isUrl = (url) => url && url.includes('https');

	const getReadUrl = (id) => `${$page.route.id}/profile/${id}`;

	const isValid = both(isNotNil, has('profile_image_guid'));
</script>

<div class="w-full bg-yellow shadow-lg">
	<header
		class="min-h-[184px] max-h-[184px] flex flex-row gap-6 items-center justify-between w-full px-[40px] 2xl:px-[88px] py-8 max-w-[656px] mx-auto"
	>
		<span class="relative">
			{#if isValid(athlete) && isUrl(athlete.profile_image_guid)}
				<img
					class="max-w-[120px] min-w-[120px] min-h-[120px] rounded-full"
					src={athlete.profile_image_guid}
					alt="avatar-2"
				/>
			{:else}
				<img
					class="max-w-[120px] min-w-[120px] min-h-[120px] rounded-full"
					src="/images/icons/image-2.svg"
					alt="avatar-2"
				/>
			{/if}

			<img
				class="absolute bottom-1 right-3 w-[20px] h-[20px]"
				src={`/images/icons/${athlete?.isactive ? 'online' : 'offline'}-indicator.svg`}
				alt=""
			/>
		</span>
		<div class="flex flex-col gap-4 w-full">
			<div class="flex flex-row gap-10 relative w-full">
				<div class="flex flex-col gap-1 w-full">
					<h2
						class="text-[20px] xl:text-[22px] 2xl:text-[24px] leading-sm font-bold whitespace-nowrap"
					>
						{athlete?.full_name || ''}
					</h2>
					<div class="flex flex-row gap-[2px] items-center w-fit h-full">
						<span class="h-full flex items-center">
							<img
								class="w-[12px] h-[12px] h-fit"
								src="/images/icons/instagram.svg"
								alt="instagram"
							/>
						</span>
						<span class="h-full flex items-center">
							<small class="text-[10px] leading-[8px] font-medium relative h-fit pb-[2px]"
								>@{athlete?.instagram_username || ''}</small
							>
						</span>
						<span
							class="ml-1 bg-black text-white py-[3px] px-2 rounded-full font-regular text-[8px] text-gray-9 leading-[8px]"
						>
							{athlete?.instagram_follower_count || ''}
						</span>
					</div>
				</div>
				<a
					href={getReadUrl(athlete?.id)}
					class="absolute right-0 mt-1 text-[12px] rounded-[15px] leading-xs font-semibold bg-white py-[2px] px-3 whitespace-nowrap xl:px-4 h-fit w-fit"
					>VIEW FULL PROFILE</a
				>
			</div>
			<div class="flex flex-row gap-8 w-full text-[10px] leading-[12px] items-center">
				<div
					class="flex flex-row gap-2 overflow-hidden max-w-[232px] 2xl:max-w-[260px] whitespace-nowrap text-ellipsis overflow-hidden"
				>
					<div class="flex flex-col font-bold gap-2">
						<span class="text-left">Class</span>
						<span class="text-left">Hometown</span>
						<span class="text-left">Active Campaigns</span>
					</div>
					<div class="flex flex-col font-medium gap-2">
						<span>{athlete?.class || ''}</span>
						<span>{athlete?.hometown || ''}</span>
						<span>{athlete?.athlete_campaigns || ''}</span>
					</div>
				</div>
				<div
					class="flex flex-row gap-2 items-center justify-center max-w-[220px] 2xl:max-w-[260px] whitespace-nowrap text-ellipsis overflow-hidden"
				>
					<div class="flex flex-col font-bold gap-2 justify-center">
						<span class="text-left">Top</span>
						<span class="text-left">Bottom</span>
						<span class="text-left">Shoe Size</span>
					</div>
					<div class="flex flex-col font-medium gap-2 justify-center">
						<div class="relative flex flex-row items-center gap-1">
							{athlete?.clothing_top || ''}
							<span
								class="text-[8px] leading-[8px] text-white rounded-[10px] w-[16px] h-[12px] bg-black flex justify-center items-center"
								>{athlete?.clothing_gender || ''}</span
							>
						</div>
						<div class="relative flex flex-row items-center gap-1">
							{athlete?.clothing_bottom || ''}
							<span
								class="text-[8px] leading-[8px] text-white rounded-[10px] w-[16px] h-[12px] bg-black flex justify-center items-center"
								>{athlete?.clothing_gender || ''}</span
							>
						</div>
						<div class="relative flex flex-row items-center gap-1">
							{athlete?.clothing_shoe_size || ''}
							<span
								class="text-[8px] leading-[8px] text-white rounded-[10px] w-[16px] h-[12px] bg-black flex justify-center items-center"
								>{athlete?.clothing_gender || ''}</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</div>
