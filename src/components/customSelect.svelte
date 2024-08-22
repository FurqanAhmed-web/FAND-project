<script>
  import { onMount } from "svelte"

  export let options = []
  export let id = ""
  export let selectedOption = "Select an option"

  onMount(() => {
    const customSelect = document.getElementById(`custom-select-${id}`);
    const customOptionsContainer = document.getElementById(`custom-options-container-${id}`);
    
    const customOptions = document.querySelectorAll(`#custom-options-container-${id} > div`);

    customOptions.forEach(options => {
      options.classList.add("hover:bg-yellow", "px-1", "cursor-pointer", "rounded-[4px]");

      options.addEventListener("click", () => {
        selectedOption = options.textContent;

        customOptions.forEach(option => {
          if (option === options) {
            option.classList.add("bg-yellow");
          } else {
            option.classList.remove("bg-yellow");
          }
        });

        customSelect.textContent = selectedOption;
        customOptionsContainer.classList.add("hidden");
      });
    });

    customSelect.addEventListener("click", () => {
      customOptionsContainer.classList.remove("hidden");
    });

    document.addEventListener("click", event => {
      const isClickedOutside = !customSelect.contains(event.target) && !customOptionsContainer.contains(event.target);
      if (isClickedOutside) {
        customOptionsContainer.classList.add("hidden")
      }
    });
  });
</script>

<div class="relative flex flex-col gap-3 w-full items-end">
  {#if window.location.pathname.includes("athletes/browse")}
    <div data-value={ selectedOption } id={`custom-select-${id}`} class="cursor-pointer text-gray-13 leading-6 relative w-full h-[40px] max-h-[40px] rounded-lg px-3 py-2 border-[1px] border-gray-2">
      {selectedOption}
    </div>
  {:else if id === "month" || id === "day" || id === "year"}
    <div data-value={ selectedOption } id={`custom-select-${id}`} class="cursor-pointer text-gray-13 leading-6 relative w-full h-[40px] max-h-[40px] rounded-lg px-3 py-2 border-[1px] border-gray-2">
      0
    </div>
  {:else}
    <div data-value={ selectedOption } id={`custom-select-${id}`} class="cursor-pointer text-gray-13 leading-6 relative w-full h-[40px] max-h-[40px] rounded-lg px-3 py-2 border-[1px] border-gray-2">
      {selectedOption}
    </div>
  {/if}

  {#if id === "time-start" || id === "time-end" || id === "month" || id==="day" || id==="year"}
    <div id={`custom-options-container-${id}`} class="max-h-[240px] overflow-auto custom-scroll hidden bg-white z-50 py-1 px-1 flex flex-col gap-2 rounded-lg absolute top-0 left-0 m-auto h-auto w-full border-[1px] border-gray-2 shadow-md">
      {#each options as option}
        <div value={option.value}>{option.label}</div>
      {/each}
    </div>
  {:else}
    <div id={`custom-options-container-${id}`} class="max-h-[240px] overflow-auto custom-scroll hidden bg-white z-50 py-2 px-3 flex flex-col gap-2 rounded-lg absolute top-0 left-0 m-auto h-auto w-full border-[1px] border-gray-2 shadow-md">
      {#each options as option}
        <div value={option.value}>{option.label}</div>
      {/each}
    </div>
  {/if}

  {#if !(id === "time-start" || id === "time-end")}
    <img class="z-10 absolute right-3 top-0 bottom-0 m-auto pointer-events-none" src="/images/icons/select-down-arrow.svg" alt="down arrow">
  {/if}
</div>
