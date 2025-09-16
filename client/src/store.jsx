import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {userReducer, usersReducer, postReducer, postsReducer, appReducer} from './reducer'

const reducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
	app: appReducer,
});

const composeEnhangers = window.___RERUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhangers(applyMiddleware(thunk)));
