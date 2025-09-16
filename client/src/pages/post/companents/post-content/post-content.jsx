import styled from 'styled-components';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/specail-panel';
import { useNavigate } from 'react-router';

import { PROP_TYPE } from '../../../../constants';


const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate()
	const editPost = () => {
			navigate(`/post/${id}/edit`);
	}

	
	return (
		<>
			<div className={className}>
				<img src={imageUrl} alt={title} />
				<H2>{title}</H2>
				<SpecialPanel
					id={id}
					publishedAt={publishedAt}
					margin='-20px 0 20px'
					editButton={
						<Icon
							id='fa-pencil'
							margin='0 10px 0 10px'
							size='25px'
							onClick={editPost}
						/>
					}
				/>
				<div className='post-text'>{content}</div>
			</div>
		</>
	);
};

export const PostContent = styled(PostContentContainer)`
	h2 {
		font-size: 28px;
		display: flex;
	}
	img {
		width: 280px;
		height: 150px;
		float: left;
		margin: 0 20px 20px 0;
	}
	.post-text {
		font-size: 22px;
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired
}
