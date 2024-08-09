<div
	class="flex flex-col gap-4 lg:gap-7 2xl:gap-10 p-12 h-[100vh] max-w-[1440px] absolute top-0 left-0 bottom-0 right-0 m-auto"
>
	<header class="w-fit">
		<a href={'#'} class="w-fit h-fit">
			<img class="min-w-[128px] w-[12vw]" src="/images/logo-black.png" alt="black logo" />
		</a>
	</header>
	<main class="mt-2">
		<div class="cursor-pointer relative w-full h-auto">
			<img
				class="object-center object-cover w-full h-[65vh]"
				src="/images/welcome-video.jpg"
				alt="guy on track"
			/>
			<img
				class="absolute top-0 right-0 bottom-0 left-0 m-auto w-[10vw]"
				src="/images/icons/play-button.svg"
				alt="video play button"
			/>
		</div>
	</main>
	<footer class="flex flex-row justify-between items-center h-fit">
		<label
			class="flex items-center gap-3 text-[2vw] lg:text-[1.8vw] 2xl:text-[1.2vw] font-bold leading-10 text-gray"
			for="show"
		>
			<input class="custom-checkbox-4 w-6 h-6" type="checkbox" name="show" id="show" />
			Show this video whenever I log in.
		</label>
		<a
			href="/chat"
			class="flex items-center justify-center bg-yellow py-3 px-8 text-[20px] lg:text-[24px] font-semibold leading-8 rounded-lg max-w-[138px] lg:max-w-[172px] max-h-[48px] lg:max-h-[56px]"
		>
			Continue
		</a>
	</footer>
</div>
