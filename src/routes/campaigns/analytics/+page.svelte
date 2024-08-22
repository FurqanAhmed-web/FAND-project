<aside
	class="max-h-screen overflow-hidden flex flex-col gap-5 xl:gap-8 w-[18.5%] border-r-[1px] border-gray-4 py-5 xl:py-6"
>
	<div class="flex flex-col gap-5 xl:gap-8 px-3 xl:px-8">
		<div class="flex flex-col gap-4">
			<button
				onclick="handleOverlay()"
				class="text-sm font-semibold leading-xs py-2 px-[14px] rounded-lg bg-yellow"
				>BULK UPLOAD</button
			>
			<button
				onclick="window.location.href='campaign-create.html'"
				class="text-sm font-semibold leading-xs py-2 px-[14px] rounded-lg bg-yellow"
				>CREATE CAMPAIGN</button
			>
		</div>
		<div class="w-full border-b-[1px] border-bc-4" />
		<div class="flex flex-col gap-3 text-color-10">
			<b class="font-semibold text-black text-sm leading-sm">Browse & Search</b>
			<div
				id="open-select"
				class="relative text-sm xl:text-md font-regular leading-sm w-full flex flex-row"
			>
				<span class="cursor-pointer absolute top-[0.3rem] xl:top-[0.55rem] left-3 xl:left-4"
					>Sort by:</span
				>
				<select
					id="select-box"
					class="shadow-sm pl-[4.2rem] xl:pl-[5rem] py-1 xl:py-2 px-3 xl:px-4 items-center border-[1px] border-bc-1 rounded-lg w-full cursor-pointer appearance-none focus:outline-none"
				>
					<option selected>Name (A-Z)</option>
					<option>Sample 2</option>
					<option>Sample 3</option>
				</select>
				<img
					class="cursor-pointer absolute top-[0.3rem] xl:top-[0.55rem] right-3 xl:right-4 w-[24px] h-[24px]"
					src="/images/icons/down-arrow.svg"
					alt="down arrow"
				/>
			</div>
			<div class="flex relative cursor-pointer">
				<input
					id="filters"
					placeholder="Enter Keyword"
					type="text"
					class="text-black text-sm xl:text-md focus:outline-none placeholder:text-color-10 font-regular leading-sm w-full flex flex-row justify-between py-1 xl:py-2 px-3 xl:px-4 items-center border-[1px] border-bc-1 rounded-lg"
				/>
				<img
					class="absolute top-[0.6rem] xl:top-[0.8rem] right-4 xl:right-5 w-[16px] h-[16px]"
					src="/images/icons/search.svg"
					alt="down arrow"
				/>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-8 w-full">
		<div
			class="custom-scroll min-h-[30vh] max-h-[65vh] xl:max-h-[60vh] 2xl:max-h-screen overflow-y-auto w-full"
		>
			<div class="flex flex-col gap-4 text-xs leading-sm">
				<div class="w-[90%] xl:w-[80%] self-center border-b-[1px] border-bc-4" />
				<p class="px-8 text-color-9">
					<span class="font-semibold text-md">Favorite Flowers</span><br />
					02/11/23 - 02/14/23<br />
					Athletes
					<small
						class="rounded-lg p-1 border-[1px] border-bc-7 text-[8px] w-[16px] h-[16px] font-h1"
						>12</small
					>
				</p>
				<p class="bg-bg-2 px-8 py-2">
					<span class="font-semibold text-md">NIL Trash Talk</span><br />
					01/17/23 - 02/29/23<br />
					Athletes
					<small
						class="rounded-lg py-1 px-[6px] border-[1px] border-bc-10 text-[8px] w-[16px] h-[16px] font-h1 bg-white"
						>4</small
					>
				</p>
				<p class="px-8 text-color-9">
					<span class="font-semibold text-md">Tournament Pre-Game</span><br />
					12/03/22 - 02/14/23<br />
					Athletes
					<small
						class="rounded-md p-1 border-[1px] border-bc-7 text-[8px] w-[16px] h-[16px] font-h1"
						>17</small
					>
				</p>
			</div>
		</div>
	</div>
</aside>

<main class="w-[63%] py-5 xl:py-6">
</main>
