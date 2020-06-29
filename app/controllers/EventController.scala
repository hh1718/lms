package controllers

import com.google.inject.{Guice, Injector}
import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}
import scala.concurrent.{ExecutionContext}
import helper.EventHelper
import models._

@Singleton
class EventController @Inject()(cc: ControllerComponents, dao: Dao)(implicit ec: ExecutionContext)
  extends ValidateController(cc) {


  def deleteEvent() = Action { implicit req =>
    Ok("")
      .as("application/json")
  }

  def getEventById(id:Int) = Action { implicit req =>

    Ok("test")
      .as("application/json")
  }

  def createEvent() = Action { implicit req =>

    Ok("test")
      .as("application/json")
  }
}
