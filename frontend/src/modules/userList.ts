//sample
import { Dispatch } from "redux";
import { actionCreatorFactory,  Action } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { User, UserListReq, UserListRes, FetchError } from '../api/dataModels'
import { fetchAction, fetchGet, FetchAction } from '../api/fetchAction'

//state
export interface UserListState {
  userList: User[]
}
const initialState: UserListState = {
  userList: []
}

//action
const actionCreator = actionCreatorFactory();
export const userListFetchActions = {
  fetchUserList: actionCreator.async<UserListReq, UserListRes, FetchError>('FETCH_USER_LIST'),
};
//fetch action
export function userListFetch(req: UserListReq): (dispatch: Dispatch<Action<any>>) => FetchAction<UserListReq, UserListRes, FetchError> {
  return fetchAction(req, userListFetchActions.fetchUserList, fetchGet('http://localhost:9000/api/users?size=10'))
}

//reducer
export const userListReducer = reducerWithInitialState(initialState)
  .case(userListFetchActions.fetchUserList.started, (state, payload) => {
    return state
  })
  .case(userListFetchActions.fetchUserList.done, (state, payload) => {
    return Object.assign({}, state, {userList: state.userList.concat(payload.result.userList)})

  })
  .case(userListFetchActions.fetchUserList.failed, (state, payload) => {
    throw new Error("failed to fetch")
  })
export default userListReducer;