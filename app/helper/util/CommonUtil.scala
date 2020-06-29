package helper
import play.api.libs.json._
import models._

object CommonUtil {
  implicit val jsonAccountReqWrites = Json.writes[AccountReq]
  implicit val jsonAccountReqReads = Json.reads[AccountReq]
  //implicit val jsonAccountResWrites = Json.writes[AccountRes]
  //implicit val jsonAccountResReads = Json.reads[AccountRes]
  implicit val jsonLoginReqWrites = Json.writes[LoginReq]
  implicit val jsonLoginReqReads = Json.reads[LoginReq]
  implicit val jsonLoginResWrites = Json.writes[LoginRes]
  implicit val jsonLoginResReads = Json.reads[LoginRes]
  implicit val jsonUserInfoWrites = Json.writes[UserInfo]
  implicit val jsonUserListResWrites = Json.writes[UserListRes]

}
