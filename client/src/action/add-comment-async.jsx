import { request } from "../utils";
import { addComment } from "./add-cooment";

export const addCommentAsync =
	(postId, content) => (dispatch) => {
		request(
			`http://localhost:3001/posts/${postId}/comments`,
			'POST',
			{ content },
		).then((comment) => {
			dispatch(addComment(comment.data));
			console.log(postId);
			console.log(content);

		});
	};
