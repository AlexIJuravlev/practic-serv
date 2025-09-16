import { request } from "../utils";
import { removeComment } from "./remove-cooment";

export const removeCommentAsync =
	(postId, commentId) => (dispatch) => {
		request(
			`http://localhost:3001/posts/${postId}/comments/${commentId}`, 'DELETE'
		).then(() => {
			dispatch(removeComment(commentId));
		});
	};
