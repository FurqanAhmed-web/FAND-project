<script>
	import { SupabaseService } from '$lib/supabase';
	import { page } from '$app/stores';
	import { getContext, onMount } from "svelte";
	import { getSubscriptionFields, validateAndFormat } from "../../../../../helpers/fields";
	import Fields from "../../../../../components/formUnits/fields.svelte";
	import { asyncTryCatchToast } from "../../../../../lib/utils";

  export let data

  let planService
  const plans = getContext("plans")

	const editID = $page.params.edit;

	let loading = false;
	let fields = [];
	let cancel = false;

  //for submit/save
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
				await planService.update(editID, { ...data });
				plans.set(await planService.get());
			},
			{
				message: 'Subscription Updated Successfully',
				redirect: `/admin/subscription/read/${editID}`
			}
		);
	};

  //for modal cancel
  const showModalCancel = () =>{
    cancel = true
  }
  
  onMount(async()=>{
    planService = new SupabaseService(data.supabase, 'plans')

    fields = getSubscriptionFields({
			editable: true,
			data: $plans.find((e) => e.id == editID)
		});
  })
</script>

{#if loading}
	<div
		class="load absolute top-0 left-0 bottom-0 right-0 m-auto w-[100px] h-[100px] border-yellow border-tr-transparent border-[10px] rounded-full"
	/>
{:else}
  <form on:submit={handleSubmit} class="flex flex-col gap-8 p-10 pl-8" novalidate>
    <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
      <a href="/admin/subscription/browse" class="text-gray-3">Subscription</a>
      <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
      <button class="text-black">Edit</button>
    </div>
    <div class="flex flex-row justify-between items-start w-full gap-20">
      <span class="text-[36px] font-semibold leading-8 w-full">Subscription</span>
      <div class="flex flex-row gap-3 text-[13px] font-semibold leading-normal w-full justify-end">
        <button on:click={showModalCancel} type="button" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-inherit border-[1px] bg-black rounded-md">
          <img src="/images/icons/cancel.svg" alt="exit" />
          Cancel
        </button>
        <button type="submit" class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md">
          <img src="/images/icons/save.svg" alt="save" />
          Update
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
					href="/admin/subscription/read/{editID}"
					class="text-center rounded-lg py-[10px] px-5 w-full max-w-[152px] border-[1px] bg-yellow border-yellow"
					>Confirm</a
				>
			</div>
		</div>
	</div>
{/if}

