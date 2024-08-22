import { formatDate } from '../../lib/utils';

const formatUserMedia = (e, { organizations }) => {
	return {
		...e,
		organization_id: organizations?.find((x) => e.organization_id == x.id)?.name || '',
		tags: e.tags ? e.tags?.split(',') || e.tags?.split(' ') : '',
		created_at: formatDate(e.created_at),
		updated_at: formatDate(e.updated_at)
	};
};

export { formatUserMedia };
