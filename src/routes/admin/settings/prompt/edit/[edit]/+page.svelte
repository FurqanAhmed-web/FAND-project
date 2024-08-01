<script>
	import { page } from "$app/stores";
	import { getContext, onMount } from "svelte";
	import { SupabaseService } from '$lib/supabase';
	import { toastError, toastErrorText, toastSuccess, toastSuccessText } from '$lib/store';
	import { getPromptFields, validateAndFormat } from "../../../../../../helpers/fields";
	import Fields from "../../../../../../components/formUnits/fields.svelte";
	import { asyncTryCatchToast } from "../../../../../../lib/utils";

	// Data
	export let data;

	let promptService;

	// Slug
	const editID = $page.params.edit;

	// Contexts
	let prompts = getContext('prompts');

	// vars
	let loading = false;
	let cancel = false;
	let fields = [];

	const handleSubmit = async () => {
		const e = validateAndFormat(fields);

		const { error, data } = e;

		if (error) {
			fields = e.fields;
			toastError.set(true);
			toastErrorText.set(error);
			return;
		}

		loading = true;

		asyncTryCatchToast(
			async () => {
				await promptService.update(editID, { ...data, updated_at: new Date().toISOString() });
				prompts.set(await promptService.get());
			},
			{
				message: 'Prompt Updated Successfully',
				redirect: `/admin/settings/prompt/read/${editID}`
			}
		);
	};

	onMount(() => {
		promptService = new SupabaseService(data.supabase, 'prompts');
		fields = getPromptFields({
			editable: true,
			data: $prompts.find((e) => e.id == editID)
		});
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if loading}
	<div
		class="load absolute top-0 left-0 bottom-0 right-0 m-auto w-[100px] h-[100px] border-yellow border-tr-transparent border-[10px] rounded-full"
	/>
{:else}
	<form
		on:keydown={(e) => e.key == 'Enter' && e.preventDefault()}
		on:submit|preventDefault={handleSubmit}
		class="flex flex-col gap-8 p-12"
	>
		<div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
			<a href="/admin/settings/prompt/browse" class="text-gray-3">Prompt</a>
			<span><img src="/images/icons/slash-divider.svg" alt="divider" /></span>
			<button class="text-black">Edit</button>
		</div>
		<div class="flex flex-row justify-between items-start w-full gap-20">
			<span class="text-[36px] font-semibold leading-8 w-full">Prompt</span>
			<div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
				<button
					type="button"
					on:click={() => (cancel = true)}
					class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md"
				>
					<img src="/images/icons/cancel.svg" alt="exit" />
					Cancel
				</button>
				<button
					type="submit"
					disabled={loading}
					class="flex flex-row justify-center gap-2 items-center py-3 px-4 max-h-[40px] bg-yellow rounded-md"
				>
					<img src="/images/icons/save.svg" alt="save" />
					{loading ? 'Loading...' : 'Update'}
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-10">
			<fieldset class="flex flex-col gap-8">
				<Fields bind:fields />
			</fieldset>
		</div>
	</form>

	<div class:hidden={!cancel} class=" absolute top-0 left-0 m-auto w-full h-screen bg-black-3 z-50">
		<div
			class="rounded-[12px] bg-white w-full max-w-[366px] h-fit flex flex-col gap-8 top-0 left-0 right-0 bottom-0 absolute m-auto p-6"
		>
			<div class="flex flex-col">
				<span class="text-[18px] text-gray-13 leading-7 font-semibold">Cancel</span>
				<span class="text-[14px] text-gray-12 leading-5"
					>Are you sure you want to cancel editing this record?</span
				>
			</div>
			<div class="flex flex-row gap-3 text-black font-semibold items-center w-full">
				<button
					on:click={() => (cancel = false)}
					id="hide-modal"
					class="rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] border-black-3"
					>Decline</button
				>
				<a
					href="/admin/settings/prompt/read/{editID}"
					class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow"
					>Confirm</a
				>
			</div>
		</div>
	</div>
{/if}
