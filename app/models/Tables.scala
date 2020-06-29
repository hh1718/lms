package models
import play.api.libs.json._
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
trait TableRow {}

case class Account(
    id: String, 
    name: String,
    email: String,
    password: String,
    publicStatus: String,
    billingStatus: String,
    typeId: String,
    description: String,
    createdAt: Long,
    updateAt: Long
) extends TableRow

case class AccountType(id: String, accountType: String) extends TableRow

case class AccountGenre(id: String, accountId: String, partnerId: String) extends TableRow

case class Genre(id: String, name: String) extends TableRow

case class MachingAccount(id: String, accountId: String, partnerId: String) extends TableRow

case class SuggestAccount(
    accountId: String,
    batchDate: Long,
    partner_id1: String,
    partner_id2: String,
    partner_id3: String,
    partner_id4: String,
    partner_id5: String,
    partner_id6: String,
    partner_id7: String,
    partner_id8: String,
    partner_id9: String,
    partner_id10: String,
) extends TableRow

case class SwipeResult(
    accountId: String,
    partnerId: String,
    result: Boolean,
    swipeDate: Long
)  extends TableRow


trait Tables {
  val profile: slick.driver.JdbcProfile
  import profile.api._

  class Accounts(tag: Tag) extends Table[Account](tag, "accounts") {
      def id = column[String]("id", O.PrimaryKey)
      def name = column[String]("name")
      def email = column[String]("email")
      def password = column[String]("password")
      def publicStatus = column[String]("publicStatus")
      def billingStatus = column[String]("billingStatus")
      def typeId = column[String]("typeId")
      def description = column[String]("description")
      def createdAt = column[Long]("createdAt")
      def updateAt = column[Long]("updateAt")

      def * = (id, name, email, password, publicStatus, billingStatus, typeId, description, createdAt, updateAt) <> ((Account.apply _).tupled, Account.unapply)
  }
  val accounts = TableQuery[Accounts]

  
  class AccountTypes(tag: Tag) extends Table[AccountType](tag, "accountTypes") {
      def id = column[String]("id", O.PrimaryKey)
      def accountType = column[String]("type")

      def * = (id, accountType) <> ((AccountType.apply _).tupled, AccountType.unapply)
  }
  val accountTypes = TableQuery[AccountTypes]

  class AccountGenres(tag: Tag) extends Table[AccountGenre](tag, "accountGenres") {
      def id = column[String]("id", O.PrimaryKey)
      def accountId = column[String]("accountId")
      def partnerId = column[String]("partnerId")

      def * = (id, accountId, partnerId) <> ((AccountGenre.apply _).tupled, AccountGenre.unapply)
  }
  val accountGenres = TableQuery[AccountGenres]

  class Genres(tag: Tag) extends Table[Genre](tag, "genres") {
      def id = column[String]("id", O.PrimaryKey)
      def name = column[String]("name")

      def * = (id, name) <> ((Genre.apply _).tupled, Genre.unapply)
  }
  val genres = TableQuery[Genres]

  class MachingAccounts(tag: Tag) extends Table[MachingAccount](tag, "machingAccounts") {
      def id = column[String]("id", O.PrimaryKey)
      def accountId = column[String]("accountId")
      def partnerId = column[String]("partnerId")

      def * = (id, accountId, partnerId) <> ((MachingAccount.apply _).tupled, MachingAccount.unapply)
  }
  val machingAccounts = TableQuery[MachingAccounts]

  class SuggestAccounts(tag: Tag) extends Table[SuggestAccount](tag, "suggestAccounts") {
      def accountId = column[String]("accountId")
      def batchDate = column[Long]("batchDate")
      def partnerId1 = column[String]("partnerId1")
      def partnerId2 = column[String]("partnerId2")
      def partnerId3 = column[String]("partnerId3")
      def partnerId4 = column[String]("partnerId4")
      def partnerId5 = column[String]("partnerId5")
      def partnerId6 = column[String]("partnerId6")
      def partnerId7 = column[String]("partnerId7")
      def partnerId8 = column[String]("partnerId8")
      def partnerId9 = column[String]("partnerId9")
      def partnerId10 = column[String]("partnerId10")

      def * = (accountId, batchDate, partnerId1, partnerId2, partnerId3, partnerId4, partnerId5, partnerId6, partnerId7, partnerId8, partnerId9, partnerId10) <> ((SuggestAccount.apply _).tupled, SuggestAccount.unapply)
  }
  val suggestAccounts = TableQuery[SuggestAccounts]

  class SwipeResults(tag: Tag) extends Table[SwipeResult](tag, "swipeResults") {
      def accountId = column[String]("accountId")
      def partnerId = column[String]("partnerId")
      def result = column[Boolean]("result")
      def swipeDate = column[Long]("swipeDate")

      def * = (accountId, partnerId, result, swipeDate) <> ((SwipeResult.apply _).tupled, SwipeResult.unapply)
  }
  val swipeResults = TableQuery[SwipeResults]

}

object Tables extends {
  val profile = slick.driver.MySQLDriver
} with Tables