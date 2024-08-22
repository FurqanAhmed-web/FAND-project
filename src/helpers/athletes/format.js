import { formatDate, formatNumber, getType } from '../../lib/utils';
import { shoe_sizes, genders, clothing_sizes, school_levels } from '../../lib/data';

const formatAthlete = (e) => {
	return {
		...e,
		instagram_follower_count: formatNumber(e.instagram_follower_count),
		class: getType(e.class, school_levels),
		clothing_gender: getType(e.clothing_gender, genders),
		clothing_top: getType(e.clothing_top, clothing_sizes),
		clothing_bottom: getType(e.clothing_bottom, clothing_sizes),
		clothing_shoe_size: getType(e.clothing_shoe_size, shoe_sizes),
		//
		created_at: formatDate(e.created_at),
		updated_at: formatDate(e.updated_at),
		last_message_sent: formatDate(e.last_message_sent),
		last_message_received: formatDate(e.last_message_received),
		isactive: e.isactive ? 'Yes' : 'No',
		isoptedin: e.isoptedin ? 'Yes' : 'No',
		isgenerativeai: e.isgenerativeai ? 'Yes' : 'No'
	};
};

export { formatAthlete };
