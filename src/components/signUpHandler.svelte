<script>
	import { onMount } from "svelte";

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    onMount(()=>{
        let warningAppended = false 

        const placeholderHeader = document.getElementById("placeholder-header")
        const placeholderText = document.getElementById("placeholder-text")
        const signUpButton = document.getElementById("signup-button")
        const inputEmail = document.getElementById("input-email")
        const continueButton = document.createElement("button")
        const warningText = document.createElement("span")

        continueButton.classList.add(
            "w-full", 
            "max-w-[352px]", 
            "min-h-[44px]",
            "max-h-[44px]", 
            "px-4", 
            "rounded-lg", 
            "shadow-sm", 
            "bg-gray-3", 
            "font-semibold",
            "text-white")
        continueButton.disabled = true 
        continueButton.textContent = "Continue"

        warningText.textContent = "Enter valid email"
        warningText.classList.add("text-red-500", "text-[14px]")
        
        signUpButton.addEventListener("click",()=>{
            if(isValidEmail(inputEmail.value) === true){
                placeholderHeader.innerText = "Email Sent!"
                placeholderText.innerText = "Please check your email and click the link to login"
                inputEmail.classList.add("hidden")
                signUpButton.parentElement.replaceChild(continueButton, signUpButton)
                warningText.style.display = "none"
                warningAppended = false
            }else{
                if (!warningAppended) {
                    signUpButton.parentElement.appendChild(warningText);
                    warningAppended = true
                }
            }
        })
    })
</script>

<div class="flex flex-col gap-4 w-full items-center"> 
    <input id="input-email" class="w-full max-w-[352px] max-h-[44px] py-3 px-4 rounded-lg border-[1px] border-gray-2 shadow-sm" type="text" placeholder="Enter email">
    <button 
    id="signup-button" 
    class="w-full max-w-[352px] min-h-[44px] max-h-[44px] px-4 rounded-lg shadow-sm bg-yellow font-semibold"
    >Sign Up</button>
</div>
<p class="mt-2 mx-auto max-w-[352px] text-center text-[12px] font-semibold leading-6 text-black">
  Unlock a world of possibilities by signing up, where you'll gain instant access to a platform designed to enhance your life, streamline tasks, and connect you with a vibrant community.
</p>
