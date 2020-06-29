package di
import com.google.inject.AbstractModule
import com.google.inject.name.Names
import models.{ Dao, DaoImpl }

class Module extends AbstractModule {
  override def configure() = {
    bind(classOf[Dao])
      //.annotatedWith(Names.named("en"))
      .to(classOf[DaoImpl])
  }
}