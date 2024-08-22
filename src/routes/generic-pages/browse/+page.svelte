<script>
	import Pagination from "../../../components/pagination.svelte";
	import CustomTable from "../../../components/customTable.svelte";

  const headerRows =  [
    {name: "Name", size: "30%"},
    {name: "Owner", size: "15%"},
    {name: "Updated", size: "22%"},
    {name: "Tags", size: "20%"},
    {name: "Size", size: "8%"},
    {name: "Size", size: "8%"},
  ]
  const bodyContent = [
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"},
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"},
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"},
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"},
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"},
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"},
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"},
    {name: "Training Regimen and Workout", date:"March 28th - 4:38 pm" , owner: "Baker Mayfield", updated:[ "2d ago", "By Andreas Antonsson"], tags: ["Plan", "Training"], size: "20MB"}
  ]

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
    
    <main class="w-[81.5%] overflow-x-auto overflow-y-hidden custom-scroll max-h-screen">
      <div class="flex flex-col max-h-screen 2xl:pb-5">
        <div class="flex flex-col gap-6 p-10 pl-8 h-auto">
          <div class="flex flex-row justify-between">
            <span class="text-[36px] font-bold leading-8">Documents</span>
            <div class="flex flex-row gap-10 items-center">
                <button class="text-[12px] leading-normal font-semibold bg-yellow rounded-md min-w-[200px] w-full max-w-[206px] py-2">Add</button>
            </div>
          </div>
          <div class="flex flex-row gap-20 justify-between items-start">
            <p class="text-[14px] leading-5 font-medium text-black max-w-[356px]">All documents relating to the project are stored here. You will find updated documents or create new one.</p>
            <div class="flex flex-row gap-4 w-full justify-end items-center">
              <div class="relative"> 
                <input class="text-[16px] py-3 max-h-[44px] min-w-[336px] max-w-[336px] pl-4 pr-10 rounded-lg border-[1px] border-gray-2" type="text" placeholder="Search a name, email, or username">
                <img class="absolute top-0 bottom-0 right-5 m-auto max-w-4 max-h-4 h-fit pointer-events-none" src="/images/icons/search.svg" alt="search icon">
              </div>
              <button class="max-w-6 h-auto"><img src="/images/icons/filter.svg" alt="filter icon"></button>
            </div>
          </div>
        </div>
        
        <CustomTable tableHeaderRow={headerRows} tableBody={bodyContent}/>
        <Pagination/>
      </div>
    </main>
</section>