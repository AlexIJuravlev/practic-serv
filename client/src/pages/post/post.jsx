import styled from 'styled-components';
import { useMatch, useParams } from 'react-router';
import { PostContent, Comments, PostForm } from './companents';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostAsync, RESET_POST_DATA } from '../../action';
import { selectPost } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');
	const params = useParams();

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [ dispatch, params.id, post, isCreating]);

	if (isLoading) {
		return null;
	}



	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	padding: 0px 80px;
	margin: 40px 0;
`;
