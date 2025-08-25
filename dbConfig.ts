import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import 'dotenv/config'
import { Customer } from "src/entities/customer.entity";
import { User } from "src/entities/user.entity";

export const dbConfig: PostgresConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  synchronize: true,
  entities: [Customer, User],
  port: 3306
}