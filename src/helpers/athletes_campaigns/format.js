import { formatDate } from '../../lib/utils';

const formatCampaignAthlete = (e, { athletes, campaigns }) => {
	return {
		...e,
		athlete_id: athletes?.find((athlete) => athlete.id == e.athlete_id)?.full_name || '',
		campaign_id: campaigns?.find((campaign) => campaign.id == e.campaign_id)?.name || '',
		created_at: formatDate(e.created_at),
		date_agreement_signed: formatDate(e.date_agreement_signed),
		terms_accepted: e.terms_accepted ? 'Yes' : 'No',
		is_agreement_signed: e.is_agreement_signed ? 'Yes' : 'No'
	};
};

export { formatCampaignAthlete };
