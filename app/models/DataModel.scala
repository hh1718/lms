package models
import models._

case class AccountReq(
  param: String
)

case class AccountRes(
  res: Account
)

case class LoginReq(
  param: String
)

case class LoginRes(
  res: String
)

//sample
case class UserInfo(
  id: String,
  name: String,
  message: String
)

case class UserListRes(
    userList: Seq[UserInfo]
)