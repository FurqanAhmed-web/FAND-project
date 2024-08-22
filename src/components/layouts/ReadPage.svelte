<script>
	import { goto } from '$app/navigation';
	import { includes, is } from 'ramda';
	import Breadcrumb from '../../components/ui/breadcrumb.svelte';

	export let title;
	export let headers = [];

	const getBrowseURL = () => {
		// URLS
		let currentPageRoute = window.location.pathname;
		if (currentPageRoute.includes('chat')) {
			return currentPageRoute.split('/profile')[0];
		} else {
			return currentPageRoute.split('read')[0] + 'browse';
		}
	};

	const getEditURL = () => {
		// URLS
		let currentPageRoute = window.location.pathname;
		if (currentPageRoute.includes('chat')) {
			return currentPageRoute.split('/profile')[0];
		} else {
			return currentPageRoute.replace('read', 'edit');
		}
	};

	const handleCancel = () => {
		goto(getBrowseURL());
	};
</script>

<div class="flex flex-col gap-8 p-12">
	<Breadcrumb />
	<div class="flex flex-row justify-between items-start w-full gap-20">
		<span class="text-[36px] font-semibold leading-8 w-full">{title}</span>
		<div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
			<button
				on:click={handleCancel}
				type="button"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md"
			>
				<img src="/images/icons/cancel.svg" alt="cancel" />
				Cancel
			</button>
			<a
				href={getEditURL()}
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md"
			>
				<img class="w-4 h-4" src="/images/icons/edit.svg" alt="edit" />
				Edit
			</a>
		</div>
	</div>
	<div class="flex flex-col gap-10">
		{#each headers as { name, label, value } (name)}
			<div class="flex flex-col gap-3">
				<span class="font-bold leading-5 text-gray-11">{label}</span>
				{#if name == 'profile_image_guid'}
					{#if is(String)(value) && !value.includes('null') && (value.includes('token') || value.includes('https://'))}
						<img
							class="max-w-[120px] min-w-[120px] min-h-[120px] rounded-full"
							src={value}
							alt="avatar-2"
						/>
					{:else}
						<img
							class="max-w-[120px] min-w-[120px] min-h-[120px] rounded-full"
							src="/images/icons/athletes.svg"
							alt="avatar-2"
						/>
					{/if}
				{:else}
					<span class="leading-6 text-gray-13">{value}</span>
				{/if}
			</div>
		{/each}
	</div>
</div>
