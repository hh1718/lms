import { Dispatch } from "redux";
import { Action, AsyncActionCreators, actionCreatorFactory, Success, Failure } from 'typescript-fsa'
import { AppState } from '../store'
import { AccountRes, FetchError } from '../api/dataModels'
//https://qiita.com/khatada/items/98c0c7f0cc0412593f25

export type FetchAction<A,B,C> =  Promise<Action<Success<A,B>> | Action<Failure<A,C>>>

export function fetchDispatch<A,B,C>(
    dispatch: Dispatch<Action<any>>,
    fetchAction: (dispatch: Dispatch<Action<any>>) => FetchAction<A,B,C>): FetchAction<A,B,C>{
    return fetchAction(dispatch)
}

export function fetchAction<A, B, C>(req: A, action: AsyncActionCreators<A,B,C>, fetch: Promise<Response>)
    : (dispatch: Dispatch<Action<any>>) => FetchAction<A,B,C> {
    return (dispatch: Dispatch<Action<any>>) => {
        return new Promise((resolve, reject) => {
            dispatch(action.started(req));
            fetch.then((res: Response) => {
                return res.json().then((json: B|C) => {
                    if(res.ok) {
                        dispatch(action.done({result: json as B, params:req}));
                        resolve()
                    } else {
                        dispatch(action.failed({error: json as C, params:req}));
                        reject("")
                    }
                })              
            }).catch((e: C) => {
                
                dispatch(action.failed({error:e, params:req}));
            })
        })
    }
}

export function asyncAction<A, B, C>(req: A, action: AsyncActionCreators<A,B,C>, fetch: Promise<B|C>)
    : (dispatch: Dispatch<Action<any>>) => Promise<unknown> {
    return (dispatch: Dispatch<Action<any>>) => {
        return new Promise((resolve, reject) => {
            dispatch(action.started(req));
            fetch.then((res) => {
                dispatch(action.done({result: res as B, params:req}));
            }).catch((e: C) => {
                dispatch(action.failed({error:e, params:req}));
            })
        })
    }
}


export function fetchGet(uri: string){
    return fetch(uri, {
        method: "GET",
        //mode: "no-cors",
        cache: "no-cache",
        //credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
}

export function fetchPost(uri: string, req: any){
    return fetch(uri, {
        method: "POST",
        //mode: "no-cors",
        cache: "no-cache",
        //credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(req)
    })
}