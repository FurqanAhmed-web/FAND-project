<script>
	import { onMount } from "svelte";
	import ReadOnly from "../../../components/forms/readOnly.svelte";
  import ReadEdit from "../../../components/forms/readEdit.svelte";
  import { currComponent } from "$lib/store"
</script>

<section class="flex flex-row min-h-screen max-h-screen">
  <aside class="overflow-auto gap-20 p-8 pr-4 flex flex-col justify-between w-[18.5%] border-r-[1px] border-gray-4 custom-scroll">
      <div class="flex flex-col gap-6 items-start">
          <a href={"#"}><img src="/images/icons/fand-logo.svg" alt="FAND logo"></a>
          <div class="flex flex-col text-color-9 gap-4 xl:gap-5 text-sm xl:text-md w-full">
              <a href="/chat" class="flex flex-row gap-6 items-center justify-start w-full"> 
                  <img class="w-[24px] h-[24px]" src="/images/icons/chat.svg" alt="Chat logo">
                  <span class="leading-6 font-semibold text-gray-5">Chat</span>
              </a>
              <a href="/athletes" class="relative flex flex-row gap-6 items-center justify-start w-full"> 
                  <img class="w-[24px] h-[24px]" src="/images/icons/athletes.svg" alt="Athletes logo">
                  <span class="font-semibold text-gray-5 leading-6">Athletes</span>
              </a>
              <a href="/campaigns" class="flex flex-row gap-6 items-center justify-start text-right w-full"> 
                  <img class="w-[24px] h-[24px]" src="/images/icons/campaigns.svg" alt="Campaigns logo">
                  <span class="font-semibold text-gray-5 leading-6">Campaigns</span>
              </a>
              <a href="/feed" class="flex flex-row gap-6 items-center justify-start text-right w-full"> 
                  <img class="w-[24px] h-[24px]" src="/images/icons/feed.svg" alt="Feed logo">
                  <span class="font-semibold text-gray-5 leading-6">Feed</span>
              </a>
              <a href="/media" class="flex flex-row gap-6 items-center justify-start w-full"> 
                  <img class="w-[24px] h-[24px]" src="/images/icons/media-library.svg" alt="Chat logo">
                  <span class="font-semibold text-gray-5 leading-6">Media Library</span>
              </a>
          </div>
      </div>
      <div class="flex flex-col gap-8 text-[16px]">
          <div class="flex flex-col gap-4 bg-yellow rounded-lg p-4">
              <p class="leading-6 font-regular">Masai Russell reported that "100 Signed Cards" for "Let’s Go" campaign have be returned. Track this package?</p>
              <div class="flex flex-row justify-between">
                  <a href={"#"} class="font-semibold leading-4 text-gray-6">Dismiss</a>
                  <a href={"#"} class="font-semibold leading-4">More</a>
              </div>
          </div>
          <div class="flex flex-col gap-6 text-gray-5 font-semibold leading-6">
              <a href="/organization" class="text-left">Organization</a>
              <a href="/status" class="text-left">Status</a>
              <a href="/support" class="text-left">Support</a>
              <a href="/settings" class="text-left">Settings</a>
          </div>
      </div>
  </aside>
  <main class="w-[81.5%] overflow-x-hidden custom-scroll max-h-screen">
    {#if $currComponent == "readOnly"}
      <ReadOnly/>
    {:else}
      <ReadEdit/>
    {/if}
  </main>
</section>