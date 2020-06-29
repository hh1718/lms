package helper
import models.{ UserInfo, UserListRes }

object AccountHelper {

    def getUsers(size: Int): UserListRes= {
      val userList: Seq[UserInfo]  = Range(1, size + 1).map(i => UserInfo(i.toString, "name" + i.toString, "hello!"))
      UserListRes(userList)
    }

}