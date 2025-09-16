import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router';
import PropTypes from 'prop-types';


const PostCardContainer = ({
	className,
	id,
	title,
	publishedAt,
	commentsCount,
	imageUrl,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className='post-card-footer'>
					<h4>{title}</h4>
					<div className='post-card-info'>
						<div className='published-at'>
							{publishedAt && (
								<Icon id='fa-calendar-o' margin='-2px 10px 0 10px' />
							)}
							{publishedAt}
						</div>
						<div className='comments-count'>
							<Icon id='fa-comment-o' margin='-2px 10px 0 10px' />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 280px;
	border: 1px solid black;
	margin: 20px;

	img {
		display: block;
		width: 275px;
		height: 150px;
	}

	h4 {
		margin: 0;
	}

	.post-card-footer {
		border-top: 1px solid black;
		padding: 5px;
	}

	.post-card-info {
		display: flex;
		justify-content: space-between;
		margin: 10px 10px 0 0;
		font-size: 18px;
		align-items: center;
	}

	.published-at {
		display: flex;
	}
	.comments-count {
		display: flex;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
	imgUrl: PropTypes.string.isRequired,
};
