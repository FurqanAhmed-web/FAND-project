<script>
	import { onMount } from "svelte";

  let termsOfUse = [
    {header:"Acceptance of Terms", text: "Your access and use of the website constitute your agreement to these Terms."},
    {header:"Intellectual Property", text: "The content on this website, including text, graphics, images, and logos, is protected by copyright and other intellectual property laws."},
    {header:"User Conduct", text: "You agree not to use the website for any unlawful or prohibited purposes, and you will not engage in any activities that may disrupt or interfere with the proper functioning of the site."},
    {header:"Privacy", text:"Your use of the website is also governed by our Privacy Policy [link to Privacy Policy]. By using the website, you consent to the collection, use, and sharing of your information as described in the Privacy Policy."},
    {header:"Third-Party Links", text:"The website may contain links to third-party websites. We are not responsible for the content or practices of these sites."},
    {header:"Disclaimer of Warranties", text:`The website is provided "as is" and without any warranties or representations. We do not guarantee the accuracy, reliability, or completeness of the content.`},
    {header:"Limitation of Liability", text:"We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the website."},
    {header:"Indemnification", text:"You agree to indemnify and hold us harmless from any claims, losses, liabilities, and expenses arising out of your use of the website."},
    {header:"Changes to Terms", text:"We may update these Terms from time to time. The updated Terms will be posted on this page, and your continued use of the website after any changes constitutes your acceptance of the updated Terms."},
    {header:"Governing Law", text:"These Terms are governed by the laws of [Your Country], and any disputes shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction]."},
  ]

</script>
<div class="flex flex-col gap-8 p-12" novalidate>
  <div class="flex flex-row gap-1 text-[16px] leading-5 font-medium items-center">
    <a href="/support" class="text-gray-3">Support</a>
    <span><img src="/images/icons/slash-divider.svg" alt="divider"></span>
    <a href="/support/legal/terms-of-use" class="text-black">Terms of Use</a>
  </div>
  <span class="text-[36px] font-semibold leading-8 w-full">Terms of Use</span>
  <div class="flex flex-col gap-8">
    <span class="text-gray-16">These Terms of Use ("Terms") govern your use of our website. By accessing or using the website, you agree to these Terms. Please read them carefully.</span>
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-8">
        {#each termsOfUse as terms, i}
          <div class="flex flex-col gap-3">
            <span class="font-bold leading-5 text-gray-11">{i+1}. {terms.header}</span>
            <span class="text-gray-16">{terms.text}</span>
          </div>
        {/each}
        <span class="text-gray-16">If you have any questions about these Terms, please contact us at [Contact Email].</span>
        <span class="text-gray-16">Last updated: August 2023</span>
      </div>
    </div>
  </div>
</div>
