/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'Halflife123?',
    username: 'postgres',
    entities: [User],
    database: 'postgres',
    synchronize: true,
    logging: true,
  }), 
  UsersModule,
  AuthModule, UsersModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
