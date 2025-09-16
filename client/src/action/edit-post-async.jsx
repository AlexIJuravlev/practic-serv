import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const editPostAsync = (id, newPostData) => (dispatch) => {
	const saveRequest = id
		? request(`http://localhost:3001/posts/${id}`, 'PATCH', newPostData)
		: request('http://localhost:3001/posts/', 'POST', newPostData);

		return saveRequest.then(
				(updatedPost) => {
					dispatch(setPostData(updatedPost.data));

					return updatedPost.data;
				},
			);
}
