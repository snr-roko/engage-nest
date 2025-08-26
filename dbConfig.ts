import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import 'dotenv/config'
import { Customer } from "src/entities/customer.entity";
import { User } from "src/entities/user.entity";
import { Profile } from "src/entities/profile.entity";
import { CustomerInteraction } from "src/entities/interaction.entity";

export const dbConfig: PostgresConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  synchronize: true,
  entities: [Customer, User, Profile, CustomerInteraction],
  port: 3306
}