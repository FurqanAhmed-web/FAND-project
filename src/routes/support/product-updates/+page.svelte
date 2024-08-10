<script>
	import CustomCheckbox from "../../../components/customCheckbox.svelte";

  const checkBox = [
    {label:"Do you want to receive product updates via email?"}
  ]
</script>

<div class="flex flex-col gap-8 p-12">
  <div class="flex flex-row gap-1 text-[16px] leading-5 font-medium items-center">
    <a href="/support" class="text-gray-3">Support</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <a href="/support/contact" class="text-black">Product Updates</a>
  </div>
  <span class="text-[36px] font-semibold leading-8 w-full">Product Updates</span>
  <div class="flex flex-col gap-8">
    <form id="subscribe" class="flex flex-col gap-10">
      <span class="text-[16px] leading-8 font-normal">Stay in the know about our latest product enhancements, features, and improvements. We're dedicated to continually improving your experience with our products. Sign up below to receive updates directly in your inbox.</span>
      <fieldset class="flex flex-col gap-8">
        <span class="text-[24px] font-bold leading-5 text-black">Subscribe to Product Updates</span>
        <div class="flex flex-col gap-3">
          <label for="email" class="text-[16px] font-bold leading-5 text-gray-11">Email Address</label>
          <input name="email" type="email" class="py-2 px-3 text-gray-13 border-[1px] border-gray-2 rounded-lg" id="email" value="" placeholder="Enter Email">
          <CustomCheckbox checkBox={checkBox}/>
        </div>
        <button type="submit" class="text-[14px] font-semibold leading-normal flex flex-row justify-center gap-2 items-center py-3 px-2 w-full max-w-[88px] max-h-[40px] bg-yellow rounded-md">
          Subscribe
        </button>
      </fieldset>
      <div class="flex flex-col gap-3">
        <span class="text-[16px] font-bold leading-5 text-gray-11">By subscribing to our product updates, you'll be among the first to hear about:</span>
        <span class="text-gray-13">- New features and functionalities</span>
        <span class="text-gray-13">- Enhancements to existing features</span>
        <span class="text-gray-13">- Bug fixes and performance improvements</span>
        <span class="text-gray-13">- Tips and tricks for using our products effectively</span>
      </div>
      <span class="text-gray-13">We respect your privacy and will only use your email address to send you relevant product updates. You can unsubscribe at any time by clicking the "Unsubscribe" link in the emails you receive.</span>
      <span class="text-gray-13">Don't miss out on the latest developments – subscribe now and stay ahead with our product updates!</span>
    </form>
  </div>
</div>
