import PropTypes from 'prop-types';
import { ROLE } from './role';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired
	}),
	COMMENT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		author_login: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		post_id: PropTypes.string.isRequired,
		published_at: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		imgUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
};
