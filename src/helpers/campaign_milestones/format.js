import { milestone_types } from '../../lib/data';
import { formatDate } from '../../lib/utils';

const formatCampaignMilestone = (e, { campaigns }) => {
	return {
		...e,
		campaign_id: campaigns?.find((campaign) => campaign.id == e.campaign_id)?.name || '',
		milestone_type:
			milestone_types?.find((milestone) => milestone.id == e.milestone_type).type || '',
		target_date: formatDate(e.target_date),
		actual_date: formatDate(e.actual_date),
		created_at: formatDate(e.created_at),
		updated_at: formatDate(e.updated_at),
		date: formatDate(e.date),
		isgenerativeai: e.isgenerativeai ? 'Yes' : 'No'
	};
};

export { formatCampaignMilestone };
