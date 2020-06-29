export interface Account {
  id: string,
  name: string,
  userClass: string
}

export interface AccountReq{}

export interface AccountRes extends Account {}

export interface User {
  id: string,
  name: string,
  message: string
}

export interface UserListReq {
  size: number
}

export interface UserListRes {
  userList: User[]
}


export interface FetchError {
  message: string
}