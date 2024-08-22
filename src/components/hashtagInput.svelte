<script>
	import { onMount } from "svelte"

  export let initialValue = []

  let wordArray = [initialValue]
  let hashtagInput, hashtagOutput

  onMount(()=>{
    hashtagInput.addEventListener("keydown", e=>{
      const inputValue = hashtagInput.value.trim()

      if (e.key === " " || e.key === "Enter") {
          const prevWordArray = [...wordArray]

          wordArray.length = 0

          if (inputValue !== "") {
              wordArray.push(...prevWordArray, inputValue)
          }

          hashtagInput.value = ""
      }
    })
  })

  const removeHashtag = (index) =>{
    wordArray.splice(index, 1)
    wordArray = [...wordArray]
  }
</script>

<div class="relative w-full flex flex-col gap-4">
  <input 
    bind:this={hashtagInput}
    id="hashtags" 
    name="hashtags" 
    type="text" 
    class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg appearance-none w-full" 
    placeholder="Enter Hashtags"
    >
  <div 
    bind:this={hashtagOutput}
    id="hashtag-output" 
    class="flex flex-row flex-wrap gap-4">
    {#each wordArray as hashtags, index}
      <span class="relative bg-black py-3 px-4 rounded-2xl text-white text-[14px]">
        #{ hashtags }
        <button type="button" on:click={()=>removeHashtag(index)} class="bg-[#F2D2BD] absolute -top-1 -right-1 z-20 w-4 rounded-full">
          <img src="/images/icons/close.svg" alt="remove">
        </button>
      </span>
    {/each}
  </div>
</div>