import { Module } from '@nestjs/common';
import { CustomerInteractionsService } from './customer-interactions.service';
import { CustomerInteractionsController } from './customer-interactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerInteraction } from 'src/entities/interaction.entity';
import { Customer } from 'src/entities/customer.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerInteraction, Customer, User])],
  providers: [CustomerInteractionsService],
  controllers: [CustomerInteractionsController]
})
export class CustomerInteractionsModule {}
