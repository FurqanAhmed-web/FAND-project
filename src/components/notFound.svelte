<script>
  const goBack = () =>{
    window.history.back()
  }
</script>

<main class="flex flex-row">
  <div class="relative w-[50%] h-auto">
    <div class="flex flex-col gap-6 absolute top-0 bottom-0 left-0 right-0 m-auto pl-32 pr-40 h-fit">
      <span class="text-[60px] leading-[72px] font-semibold tracking-[-1.2px]">404</span>
      <p class="text-[20px] leading-8 text-gray-19">Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <button 
        on:click={goBack}
        class="mt-6 w-full max-w-[108px] flex flex-row items-center gap-0.5 bg-yellow justify-center py-3 px-5 max-h-[48px] rounded-lg text-black"
        >
        <img src="/images/icons/arrow-left-black.svg" alt="go back">
        Back
      </button>
    </div>
  </div>
  <div class="w-[50%]">
    <img class="object-cover h-screen object-top w-full" src="/images/404.jpg" alt="404">
  </div>
</main>