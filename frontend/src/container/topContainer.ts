import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { topActions, topFetchSuccess, topFetchFailed } from '../modules/top';
import { userListFetch } from '../modules/userList';
import { AccountReq, AccountRes, FetchError, UserListReq, UserListRes } from '../api/dataModels'
import { TopComponent } from '../components/top/TopComponent';
import { FetchAction, fetchDispatch } from '../api/fetchAction'

export interface topActions {
  updateCount: (i: number) => Action<number>; 
  fetchAccount: (req: AccountReq) => FetchAction<AccountReq, AccountRes, FetchError>,
  fetchAccountFailed: (req: AccountReq) => FetchAction<AccountReq, AccountRes, FetchError>,
  fetchUserList: (req: UserListReq) => FetchAction<UserListReq, UserListRes, FetchError>,
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    updateCount: (i: number) => dispatch(topActions.updateCount(i)),
    fetchAccount: (req: AccountReq) => fetchDispatch(dispatch,topFetchSuccess(req)),
    fetchAccountFailed: (req: AccountReq) => fetchDispatch(dispatch,topFetchFailed(req)),
    fetchUserList: (req: UserListReq) => fetchDispatch(dispatch, userListFetch(req))
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.top, appState.userList);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopComponent);