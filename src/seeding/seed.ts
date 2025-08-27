import { dbConfig } from "../../dbConfig";
import { DataSourceOptions, DataSource } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { customerFactory } from "./customer.factory";
import { customerInteractionsFactory } from "./customerInteractions.factory";
import { userFactory } from "./user.factory";
import { profileFactory } from "./profile.factory";
import { MainSeeder } from "./main.seeder";

const seederOptions: DataSourceOptions & SeederOptions = {
  ...dbConfig,
  factories: [customerFactory, customerInteractionsFactory, userFactory, profileFactory],
  seeds: [MainSeeder]
}

const dataSource = new DataSource(seederOptions)

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true)
  await runSeeders(dataSource)
  process.exit()
})