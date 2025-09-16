import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { removeCommentAsync, openModal, CLOSE_MODAL } from '../../../../../../action';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import PropTypes from 'prop-types';



const commentContainer = ({
	className,
	id,
	authorLogin,
	publishedAt,
	content,
	postId,
}) => {
	const dispatch = useDispatch();

	const userRole = useSelector(selectUserRole)

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL)
			}),
		);

	};

	const isAccessDelete = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)

	return (
		<>
			<div className={className}>
				<div className='comment-block'>
					<div className='info-panel'>
						<div className='author'>
							<Icon
								id='fa-user-circle'
								size='18px'
								margin='5px 0 10px 10px'
							/>
							<div className='authorName'> {authorLogin}</div>
						</div>
						<div className='publishedAt'>
							<Icon
								id='fa-calendar-o'
								size='18px'
								margin='5px 10px 0 10px'
							/>
							<div className='publishedAtDate'>{publishedAt}</div>
						</div>
					</div>
					<div className='text'>{content}</div>
				</div>
				{isAccessDelete && <Icon
					id='fa-trash-o'
					size='22px'
					margin='0 0 0 10px'
					onClick={() => onCommentRemove(id)}
				/>}
			</div>
		</>
	);
};

export const Comment = styled(commentContainer)`
	margin-top: 15px;
	display: flex;

	.comment-block {
		border: 1px solid black;
		width: 550px;
		padding: 5px 10px;
	}

	.info-panel {
		display: flex;
		justify-content: space-between;
	}

	.author {
		display: flex;
	}

	.authorName {
		text-transform: capitalize;
		margin: 5px 0 0 10px;
		font-size: 18px;
	}

	.publishedAt {
		display: flex;
		align-items: center;
	}

	.publishedAtDate {
		margin: 5px 0 0 0 ;
	}

	.text {
		margin: 10px;
		font-size: 20px;
	}
`;

Comment.propTypes = {
				id: PropTypes.string.isRequired,
				authorLogin: PropTypes.string.isRequired,
				content: PropTypes.string.isRequired,
				postId: PropTypes.string.isRequired,
				publishedAt: PropTypes.string.isRequired,
}
