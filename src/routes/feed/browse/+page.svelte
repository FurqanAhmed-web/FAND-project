<script>
	import Pagination from "../../../components/pagination.svelte";
</script>
<div class="flex flex-col w-full justify-between pt-10 h-screen">
    <div class="flex flex-col gap-10 px-10">
        <span class="text-[36px] font-bold leading-8">Feed</span>
        <div class="flex flex-col gap-9">
            <div class="flex flex-row font-semibold gap-8 border-b-[1px] border-black w-fit">
                <a  href={"#"} class="underline underline-offset-[6px] decoration-4 decoration-yellow">Latest</a>
                <a href={"#"} class="text-gray-4" >Trending</a>
                <a href={"#"} class="text-gray-4" >For you</a>
            </div>
            <div class="flex flex-row gap-10 justify-between items-center">
                <input class="py-3 max-h-[44px] w-full px-4 rounded-lg border-[1px] border-gray-2" type="text" placeholder="Search">
                <button class="text-[12px] leading-normal font-semibold bg-yellow rounded-md min-w-[200px] w-full max-w-[206px] py-2">Search</button>
            </div>
        </div>
    </div>

    <div class="overflow-y-auto custom-scroll mt-10">
        <div class="flex flex-col font-normal">
            <div class="flex flex-row items-start gap-4 pb-4 border-b-[1px] border-gray-16 px-10 pt-2">
                <div class="relative">
                    <img class="h-12 w-12" src="/images/drake-maye.png" alt="drake maye">
                    <img class="absolute -right-0.5 -bottom-[2px]" src="/images/icons/online-indicator.svg" alt="indicator">
                </div>
                <div class="flex flex-col gap-2 max-w-[651px]">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="text-black-2 font-semibold leading-6 h-fit">Drake Maye</span>
                        <span class="mt-0.5 text-gray-12 leading-4 text-[12px] h-fit">2 minutes ago</span>
                    </div>
                    <p class="whitespace-pre-line leading-6">
                        🔥🏀 Hoops on Fire! 🔥🏀

                        Just wrapped up an intense training session on the court.💪 Working hard day in and day out to elevate my game to the next level! 🚀
                        
                        #TrainingMode #BasketballLife #HardWorkPaysOff
                    </p>
                </div>
            </div>
            <div class="flex flex-row items-start gap-4 pb-4 border-b-[1px] border-gray-16 px-10 pt-2">
                <div class="relative">
                    <img class="h-12 w-12" src="/images/imani-davis.png" alt="imani davis">
                    <img class="absolute -right-0.5 -bottom-[2px]" src="/images/icons/online-indicator.svg" alt="indicator">
                </div>
                <div class="flex flex-col gap-2 max-w-[651px]">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="text-black-2 font-semibold leading-6 h-fit">Imani Davis</span>
                        <span class="mt-0.5 text-gray-12 leading-4 text-[12px] h-fit">40 minutes ago</span>
                    </div>
                    <p class="whitespace-pre-line leading-6">
                        Another day, another step closer to my goals! Just finished a rigorous training session, pushing myself to be the best I can be. Hard work pays off!
                        
                        #Training #Dedication #Progress
                    </p>
                </div>
            </div>
            <div class="flex flex-row items-start gap-4 pb-4 px-10 pt-2">
                <div class="relative">
                    <img class="h-12 w-12" src="/images/hansel-emmanuel.png" alt="imani davis">
                    <img class="absolute -right-0.5 -bottom-[2px]" src="/images/icons/online-indicator.svg" alt="indicator">
                </div>
                <div class="flex flex-col gap-2 max-w-[651px]">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="text-black-2 font-semibold leading-6 h-fit">Hansel Emmanuel</span>
                        <span class="mt-0.5 text-gray-12 leading-4 text-[12px] h-fit">2 hours ago</span>
                    </div>
                    <p class="whitespace-pre-line leading-6">
                        Another day, another step closer to my goals! Just finished a rigorous training session, pushing myself to be the best I can be. Hard work pays off!

                        #Training #Dedication #Progress
                    </p>
                    <div>
                        <img class="w-full h-auto max-w-[272px]" src="/images/hansel-emmanuel-dunk.png" alt="dunk">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="w-full px-11">
        <Pagination/>
    </div>
</div>