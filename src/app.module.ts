import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from 'dbConfig';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';


@Module({
  imports: [CustomersModule, TypeOrmModule.forRoot(dbConfig), UsersModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
