<script>
  import { toastError, toastErrorText } from '$lib/store'

  let toast

  toastError.subscribe(value => {
    if (value === true) {

      setTimeout(() => {
        toast.classList.replace("opacity-0", "opacity-100")
        toast.classList.add("right-10")
      }, 300);

      setTimeout(() => {
        toast.classList.replace("opacity-100", "opacity-0")
        toast.classList.add("right-10")
      }, 2500);

      setTimeout(()=>{
        toastError.set(false)        
      }, 3000)
    }
  })

  const hideToast = () =>{
    toastError.set(false)
  }
</script>

{#if $toastError}
  <div bind:this={toast} class="opacity-0 right-0 transition-all ease-in-out duration-300 bg-error-5 absolute top-14 m-auto border-[1px] border-error rounded-[12px] w-fit max-h-[52px] p-4" style="z-index: 99999;">
    <div class="flex flex-row items-center justify-center gap-3 w-full h-fit">
      <img class="w-5 h-5" src="/images/icons/error.svg" alt="error">
      <span class="text-error-3 text-[14px] leading-5 font-semibold">
        { $toastErrorText }
      </span>
      <button 
        on:click={hideToast}
        class="w-full max-w-[20px]"
        >
        <img src="/images/icons/close-error.svg" alt="error">
      </button>
    </div>
  </div>
{/if}