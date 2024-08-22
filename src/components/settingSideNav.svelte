<script>
  import { page } from "$app/stores"

  let currectActiveNav
  let isAdminPage

  const subNavItems = []

  page.subscribe(()=>{
    currectActiveNav = $page.route.id
  })
  isAdminPage = currectActiveNav.includes("admin");

  if (isAdminPage) {
    //subNavItems.push({ name: 'Announcements', img: 'announcements', href: 'announcements/edit/1' });
    subNavItems.push({ name: 'Prompt', img: 'prompt', href: 'prompt/browse' });
  }else{
    //subNavItems.push({name:"Notifications", img:"notification", href:"notifications/edit/0"});
    //subNavItems.push({name:"Teams", img:"teams", href:"teams/browse"});
  }
  subNavItems.push({ name: "Sign Out", img: "signout", href: "signout" });
</script>

<aside
  class="max-h-screen overflow-hidden flex flex-col gap-5 xl:gap-8 w-[18.5%] 
    {isAdminPage ? 'border-r-[1px]' : ''} border-gray-4 py-5 xl:py-6 h-screen"
  >
  <div class="flex flex-col gap-5 px-10 py-[54px] text-gray-5 h-full text-left leading-6 text-sm font-semibold">
    {#each subNavItems as items }
      <a 
        href={currectActiveNav.includes('admin')?`/admin/settings/${items.href}`:`/settings/${items.href}`}
        class="relative flex flex-row items-center gap-6 w-full"
        >
        {#if currectActiveNav.includes(items.name.toLowerCase())}
          <img class="max-w-[28px]" src={`/images/icons/${items.img}-active.svg`} alt={items.name}>
          <span class="text-semibold text-black">{items.name}</span>
          <span class="-left-10 absolute w-2 h-10 bg-yellow"></span>
        {:else if currectActiveNav == "signout" && items.img == "signout"}
          <img class="max-w-[24px]" src={`/images/icons/${items.img}-active.svg`} alt={items.name}>
          <span class="text-semibold text-black">{items.name}</span>
          <span class="-left-10 absolute w-2 h-10 bg-yellow"></span>
        {:else if items.img == "signout"}
          <img class="max-w-[24px]" src={`/images/icons/${items.img}.svg`} alt={items.name}>
          <span>{items.name}</span>
        {:else}
          <img class="max-w-[28px]" src={`/images/icons/${items.img}.svg`} alt={items.name}>
          <span>{items.name}</span>
        {/if}
      </a>  
    {/each}
  </div>
</aside>