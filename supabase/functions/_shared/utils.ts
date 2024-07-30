const phone_code = "+1";

const campaign_manager_phone = "4158001337";

const isCampaignManager = (num: string): boolean =>
  num == campaign_manager_phone ||
  num == `${phone_code}${campaign_manager_phone}`;

export { isCampaignManager, phone_code };
