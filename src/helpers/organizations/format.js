import { formatDate, formatNumber, getType } from '../../lib/utils';
import { plans } from '../../lib/data';

const formatOrganization = (e) => {
	return {
		...e,
		plan: getType(e.plan, plans),
		created_at: formatDate(e.created_at),
		updated_at: formatDate(e.updated_at),
		isactive: e.isactive ? 'Yes' : 'No',
		ispaid: e.ispaid ? 'Yes' : 'No'
	};
};

export { formatOrganization };
