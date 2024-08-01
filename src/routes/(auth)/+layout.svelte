<main class="flex flex-row min-h-screen w-full">
    <div class="overflow-hidden min-w-[65%] w-[65%]">
        <img class="object-cover h-screen object-top w-full" src="/images/auth-bg-image.jpg" alt="guy playing a sport">
    </div>
    <div class="w-[35%] relative">
        <div class="flex flex-col gap-y-10 h-fit items-center justify-center absolute top-[20vh] m-auto w-full">
            <h1 class="text-[50px] font-bold">FAND</h1>
            <slot/>
        </div>
    </div>
</main>
