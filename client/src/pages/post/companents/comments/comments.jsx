import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { addCommentAsync } from '../../../../action';
import { selectUserRole } from '../../../../selectors';
import { checkAccess } from '../../../../utils';
import { PROP_TYPE, ROLE } from '../../../../constants';
import PropTypes from 'prop-types';



const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch()
		const userRole = useSelector(selectUserRole)


	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));

	};

	const clearTextInput = () =>{
		onNewCommentAdd(postId, newComment);
		setNewComment('');
}


const isGuest = checkAccess([ROLE.GUEST], userRole);

	return (
		<>
			<div className={className}>
				{!isGuest && (
					<div className='new-comment'>
						<textarea
							name='comment'
							value={newComment}
							placeholder='Комментарий...'
							onChange={({ target }) => {
								setNewComment(target.value);
							}}
						></textarea>
						<Icon
							id='fa-paper-plane'
							size='24px'
							margin='0 0 0 5px'
							onClick={clearTextInput}
						/>
					</div>
				)}
				<div className='comments'>
					{comments.map(({ id, author, content, publishedAt }) => (
						<Comment
							key={id}
							id={id}
							postId={postId}
							authorLogin={author}
							content={content}
							publishedAt={publishedAt}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 30px auto;
	width: 580px;

	.new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0 ;
	}

	textarea {
		width: 550px;
		resize: none;
		height: 120px;
		font-size: 18px;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
