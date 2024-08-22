<script>
	import { onMount } from "svelte";

  onMount(()=>{
      const sideBar = document.getElementById("side-nav")

      if(window.location.pathname.includes("/admin/media/videos") 
      || window.location.pathname.includes("/admin/media")){
          const overlay = document.createElement("div")
          const removeBtn = document.createElement("button")
          const removeFileBtn = document.getElementById("remove-file-button")
          const container = document.getElementById("container")
          const contentContainer = document.querySelectorAll("#content-container > div")
          const contentButtonContainer = document.querySelectorAll("#content-buttons") 
          const contentButtons = document.querySelectorAll("#content-buttons > button")
          const deleteModal = document.getElementById("delete-modal")

          let buttonText
          
          overlay.style.minWidth = "inherit"
          overlay.classList.add(
              "z-10", 
              "absolute", 
              "top-0", 
              "right-0", 
              "left-0", 
              "bottom-0", 
              "m-auto", 
              "bg-[#00000080]", 
              "w-full", 
              "h-auto", 
              "overflow-auto",
              "pointer-events-none")

          removeBtn.textContent = "Remove"
          removeBtn.setAttribute("id", "remove-button")
          removeBtn.classList.add(
            "rounded-md", 
            "p-2", 
            "w-full", 
            "min-w-[176px]",
            "min-h-[28px]",
            "bg-white")

          removeFileBtn.addEventListener("click",()=>{
            if(removeFileBtn.innerText === "Remove Files"){  
              buttonText = "Done"
              removeFileBtn.innerText = buttonText
              removeFileBtn.classList.add("z-20")
              container.classList.add("pointer-events-none")
              sideBar.classList.add("pointer-events-none")
              document.querySelector("body").appendChild(overlay)
              contentContainer.forEach((item)=>{
                item.classList.add("z-20", "pointer-events-auto")
              })
              contentButtons.forEach((btn)=>{
                btn.classList.add("hidden")
              })
              contentButtonContainer.forEach((cont)=>{
                const cloneBtn = removeBtn.cloneNode(true)
                cont.appendChild(cloneBtn)

                cloneBtn.addEventListener("click", ()=>{
                  contentContainer.forEach(btn=>{
                    btn.classList.remove("pointer-events-auto")
                  })
                  deleteModal.classList.remove("hidden")
                })
              })
            }else if(removeFileBtn.innerText === "Done"){
              buttonText = "Remove Files"
              removeFileBtn.innerText = buttonText
              removeFileBtn.classList.remove("z-20")
              container.classList.remove("pointer-events-none")
              sideBar.classList.remove("pointer-events-none")
              document.querySelector("body").removeChild(overlay)
              contentContainer.forEach((item)=>{
                item.classList.remove("z-20", "pointer-events-auto")
              })
              contentButtons.forEach((btn)=>{
                btn.classList.remove("hidden")
              })
              contentButtonContainer.forEach((cont)=>{
                cont.querySelectorAll("#remove-button").forEach(btn=>{
                  btn.remove()
                })
              })
            }
          })
      }
  })
  function cancelDelete(){
    const contentContainer = document.querySelectorAll("#content-container > div")
    const deleteModal = document.getElementById("delete-modal")
    contentContainer.forEach((item)=>{
      item.classList.add("z-20", "pointer-events-auto")
    })
    deleteModal.classList.add("hidden")
  }

</script>
<button 
  id="remove-file-button" 
  class="pointer-events-auto text-[12px] leading-normal font-semibold bg-yellow rounded-md min-w-[200px] w-full max-w-[206px] py-2"
  >Remove Files
</button>

<div 
  id="delete-modal" 
  class="pointer-events-auto hidden flex flex-col gap-8 p-6 w-full max-w-[366px] 2xl:scale-125 bg-white rounded-[12px] h-auto max-h-[176px] z-30 absolute top-0 right-0 left-0 bottom-0 m-auto"
  >
  <div>
    <span class="text-gray-13 text-[18px] font-semibold leading-7">Delete</span>
    <p class="text-gray-12 text-[14px] leading-5">Are you sure you want to delete this image?</p>
  </div>
  <div class="flex flex-row gap-4 font-semibold leading-6">
    <button on:click={cancelDelete} class="z-50 pointer-click border-[1px] border-black shadow-sm rounded-lg w-full px-[18px] py-[10px]">Cancel</button>
    <button class="z-50 cursor-pointer border-[1px] border-yellow bg-yellow shadow-sm rounded-lg w-full px-[18px] py-[10px]">Confirm</button>
  </div>
</div>