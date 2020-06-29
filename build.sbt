name := """lms-api"""
organization := "com.api"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.0"

libraryDependencies ++= Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.3" % Test,
  "mysql" % "mysql-connector-java" % "8.0.16",
  "com.typesafe.play" %% "play-slick" % "5.0.0-M4",
  "com.typesafe.play" %% "play-slick-evolutions" % "5.0.0-M4",
  "org.slf4j" % "slf4j-nop" % "1.6.4"
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.api.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.api.binders._"
