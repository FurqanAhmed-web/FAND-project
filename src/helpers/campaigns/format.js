import { formatDate, getType } from '../../lib/utils';
import { campaign_types } from '../../lib/data';
const formatCampaign = (e, { organizations, platforms }) => {
	return {
		...e,
		organization_id: organizations?.find((org) => org.id == e.organization_id)?.name || '',
		type: getType(e.type, campaign_types),
		platform: getType(e.platform, platforms),
		isactive: e.isactive ? 'Yes' : 'No',
		hasphysicalproduct: e.hasphysicalproduct ? 'Yes' : 'No',
		isgenerativeai: e.isgenerativeai ? 'Yes' : 'No',

		start_date: formatDate(e.start_date),
		end_date: formatDate(e.end_date)
	};
};

export { formatCampaign };
