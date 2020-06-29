package controllers

import com.google.inject.{Guice, Injector}
import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, ControllerComponents, _}
import scala.concurrent.{ExecutionContext}
import helper.{ AccountHelper }
import helper.CommonUtil._ 
import models._
import play.api.libs.json.Json

@Singleton
class AccountController @Inject()(cc: ControllerComponents, dao: Dao)(implicit ec: ExecutionContext)
  extends ValidateController(cc) {

  def getAccountById(id: Int) = Action { implicit request =>
    val account = s"""{"id": "11", "name": "xxx", "userClass": "paid"}"""
    Ok(account)
      .as("application/json")
  }

  //sample
  def getUsers(size: Int) = Action { implicit  request =>
    Ok(Json.toJson(AccountHelper.getUsers(size)))
  }

  /**
    * アカウント作成
    *
    * POST /account/create
    *
    * @return
    */
  def createAccount() = Action { implicit request: Request[AnyContent] =>

    // データ取得
    val idParam = request.body.asFormUrlEncoded.get("idParam")(0)

    Ok("test")
      .as("application/json")
  }

  /**
    *
    * @return
    */
  def deleteAccount() = Action { implicit request: Request[AnyContent] =>

    // データ取得
    val idParam = request.body.asFormUrlEncoded.get("idParam")(0)

    Ok("test")
      .as("application/json")
  }
}
