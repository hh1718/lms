import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
//import promise from "redux-promise-middleware";
import { combineReducers } from "redux";
import { topReducer, TopState} from "./modules/top";
import { UserListState, userListReducer } from "./modules/userList"

const middleware = applyMiddleware(thunk, createLogger());

export type AppState = {
    top: TopState
    userList: UserListState
}

const store = createStore(
    combineReducers<AppState>({
      top: topReducer,
      userList: userListReducer
    })
    ,middleware
  );
  
export default store;