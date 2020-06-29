package controllers

import com.google.inject.{Guice, Injector}
import javax.inject._
import play.api.mvc._
import helper.ViewHelper

@Singleton
class ViewController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def index() = Action { implicit req =>
    Ok(views.html.top.main())
  }

  def sample() = Action { implicit req =>
    Ok(views.html.sample.main())
  }
}
