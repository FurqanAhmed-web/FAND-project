<script>
  import { page } from "$app/stores"
  import { goto } from "$app/navigation";
	import { getContext, onMount } from "svelte";

  let teamContext = getContext('users')
  let teams
  let roles = getContext('roles')
  let organizations = getContext('organizations')

  let readID = $page.params.read

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		weekday: 'short'
	});

  onMount(()=>{
    teams = $teamContext.find(e=>e.id == readID)
  })

  const handleCancel = () =>{
    goto("/teams/browse/")
  }
</script>

<div class="flex flex-col gap-8 p-10 pl-8">
  <div class="flex flex-row gap-1 text-[14px] leading-5 font-medium items-center">
    <a href="/teams/browse/" class="text-gray-3">Teams</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <button class="text-black">Read</button>
  </div>
  <div class="flex flex-row justify-between items-start w-full gap-20">
    <span class="text-[36px] font-semibold leading-8 w-full">Teams</span>
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
				href="/teams/edit/{readID}"
				class="flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md"
			>
				<img class="w-4 h-4" src="/images/icons/edit.svg" alt="edit" />
				Edit
			</a>
    </div>
  </div>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Organization</span>
        <span class="leading-6 text-gray-13">{ 
          $organizations.find((e)=> e.id == teams?.organization_id)?.name 
          || '' }
        </span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">First Name</span>
        <span class="leading-6 text-gray-13">{ teams?.first_name || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Last Name</span>
        <span class="leading-6 text-gray-13">{ teams?.last_name || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Email</span>
        <span class="leading-6 text-gray-13">{ teams?.email || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Mobile Number</span>
        <span class="leading-6 text-gray-13">{ teams?.mobile_number || '' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Roles</span>
        <span class="leading-6 text-gray-13">
          { $roles.find((e)=> e.id == teams?.role)?.type || '' }
        </span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Active</span>
        <span class="leading-6 text-gray-13">{ teams?.isactive || 'No' }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Created</span>
        <span class="leading-6 text-gray-13">{ teams?.created_at && dateFormatter.format(new Date(teams.created_at)) }</span>
      </div>
      <div class="flex flex-col gap-3">
        <span class="font-bold leading-5 text-gray-11">Updated</span>
        <span class="leading-6 text-gray-13">{ teams?.updated_at && dateFormatter.format(new Date(teams.updated_at)) }</span>
      </div>
    </div>
  </div>
</div>