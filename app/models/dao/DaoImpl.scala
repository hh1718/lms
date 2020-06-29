package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{ Future, ExecutionContext }
import models.{ Dao, Tables}

@Singleton
class DaoImpl @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) extends Dao {
  val dbConfig = dbConfigProvider.get[JdbcProfile]
  import dbConfig._
  import profile.api._

  //dbの用意ができたら実装
  def getAccountByIt(id: String) = db.run(
      Tables.accounts.result.map(_.filter(_.id == id).headOption)
  )
  //def getEventById(id: Int) = None
  def getAccountTypes() = db.run(
    Tables.accountTypes.result
  )
  def getMatchedList(id: String) = db.run(
    Tables.machingAccounts.result.map(_.filter(_.accountId == id))
  )
  def getSwipeList(id: String) = db.run(
    Tables.swipeResults.result.map(_.filter(_.accountId == id))
  )
  def getGenres() = db.run(
    Tables.genres.result
  )
  def getSuggesetAccounts(id: String) = db.run(
    Tables.suggestAccounts.result.map(_.filter(_.accountId == id))
  )

}
