import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { GoogleStrategy } from './auth/google.strategy'
import { User } from './users/entities/user.entity'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { AuthController } from './auth/auth.controller'
import { UsersController } from './users/users.controller'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [AppService, UsersModule],
  exports: [UsersModule]
})
export class AppModule {}
