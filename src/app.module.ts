import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from './users/entities/user.entity'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import AuthController from './auth/auth.controller'
import { UsersController } from './users/users.controller'
import configuration from './config/configuration'
import { CategoriesModule } from './categories/categories.module'
import { CategoriesController } from './categories/categories.controller'
import { Category } from './categories/entities/category.entity'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [User, Category],
      synchronize: true
    }),
    ConfigModule.forRoot({
      load: [configuration]
    }),
    UsersModule,
    AuthModule,
    CategoriesModule
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    CategoriesController
  ],
  providers: [AppService, UsersModule],
  exports: [UsersModule]
})
export class AppModule {}
