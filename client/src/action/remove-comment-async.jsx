import { request } from "../utils";
import { removeComment } from "./remove-cooment";

export const removeCommentAsync =
	(postId, commentId) => (dispatch) => {
		request(`/api/posts/${postId}/comments/${commentId}`, 'DELETE').then(() => {
			dispatch(removeComment(commentId));
		});
	};
