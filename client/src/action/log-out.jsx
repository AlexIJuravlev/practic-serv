import { ACTION_TYPE } from "./action-type";
import { request } from "../utils";

export const logout = () => {
	request('http://localhost:3001/logout', 'POST');

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};


