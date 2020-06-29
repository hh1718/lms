//sample
import { Dispatch } from "redux";
import { actionCreatorFactory,  Action } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Account, AccountReq, AccountRes, FetchError} from '../api/dataModels'
import { fetchAction, fetchGet, FetchAction } from '../api/fetchAction'
//https://qiita.com/m0a/items/703d64c74e43cb392a64

//state
export interface TopState { 
  account: Account,
  countTop: number
}
const initialState: TopState = {
    account: {
      id: "",
      name: "",
      userClass: "free"
    } as Account,
    countTop: 0
}

//action
const actionCreator = actionCreatorFactory();
export const topActions = {
  updateCount: actionCreator<number>('ACTIONS_UPDATE_COUNT'),
  fetchAccount: actionCreator.async<AccountReq, AccountRes, FetchError>('FETCH_ACCOUNT'),
};
//fetch action
export function topFetchSuccess(req: AccountReq): (dispatch: Dispatch<Action<any>>) => FetchAction<AccountReq, AccountRes, FetchError> {
  return fetchAction(req, topActions.fetchAccount, fetchGet('http://localhost:9000/api/account?id=1'))
}
export function topFetchFailed(req: AccountReq): (dispatch: Dispatch<Action<any>>) => FetchAction<AccountReq, AccountRes, FetchError>  {
  return fetchAction(req, topActions.fetchAccount, fetchGet('http://localhost:9000/api/account/?acount'))
}

//reducer
export const topReducer = reducerWithInitialState(initialState)
  .case(topActions.updateCount, (state, payload) => {
    return Object.assign({}, state, {countTop: state.countTop + payload});
  })
  .case(topActions.fetchAccount.started, (state, payload) => {
    return state;
  })
  .case(topActions.fetchAccount.done, (state, payload) => {
    return Object.assign({}, state, {account: payload.result as Account});
  })
  .case(topActions.fetchAccount.failed, (state, payload) => {
    return Object.assign({}, initialState)
  });

export default topReducer;