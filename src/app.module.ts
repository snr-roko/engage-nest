import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'dbConfig';
import { UsersModule } from './users/users.module';


@Module({
  imports: [CustomersModule, TypeOrmModule.forRoot(dbConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
