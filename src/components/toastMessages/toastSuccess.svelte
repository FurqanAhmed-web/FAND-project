  <script>
    import { toastSuccess, toastSuccessText } from '$lib/store'

    let toast

    toastSuccess.subscribe(value => {
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
          toastSuccess.set(false)        
        }, 3000)
      }
    })

    const hideToast = () =>{
      toastSuccess.set(false)
    }
  </script>

  {#if $toastSuccess}
    <div bind:this={toast} class="opacity-0 right-0 transition-all ease-in-out duration-300 bg-success-3 absolute top-14 m-auto z-20 border-[1px] border-success rounded-[12px] w-fit max-h-[52px] p-4">
      <div class="flex flex-row items-center justify-center gap-3 w-full h-fit">
        <img class="w-5 h-5" src="/images/icons/check-success.svg" alt="success">
        <span class="text-success-2 text-[14px] leading-5 font-semibold whitespace-nowrap">
          { $toastSuccessText }!
        </span>
        <button 
          on:click={hideToast}
          class="w-full max-w-[20px]"
          >
          <img src="/images/icons/close-success.svg" alt="success">
        </button>
      </div>
    </div>
  {/if}