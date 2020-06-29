package models
import models._
import scala.concurrent.{ Future, ExecutionContext }

trait Dao {
    def getAccountByIt(id: String): Future[Option[Account]]
    //def getEventById(id: Int): Option[Event]
    def getAccountTypes(): Future[Seq[AccountType]]
    def getMatchedList(id: String): Future[Seq[MachingAccount]]
    def getSwipeList(id: String): Future[Seq[SwipeResult]]
    def getGenres(): Future[Seq[Genre]]
    def getSuggesetAccounts(id: String): Future[Seq[SuggestAccount]]
}