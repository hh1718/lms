package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import models._
import scala.concurrent.{ExecutionContext, Future}
import play.api.libs.json.{Json, JsError, Reads}


abstract class ValidateController @Inject()(cc: ControllerComponents)(implicit ec: ExecutionContext)
 extends AbstractController(cc) {
  private val logger = Logger(getClass())
  def validateJson1[A: Reads]: BodyParser[A] = parse.json[A]
  def validateJson[A: Reads] = parse.json.validate(_.validate[A].asEither.left.map(e => {
    val err = JsError(e).toString()
    logger.warn("bad request: " + err)
    BadRequest(err)
  }))
}
