import { faker } from "@faker-js/faker";
import { Customer } from "../entities/customer.entity";
import { CustomerInteraction } from "../entities/interaction.entity";
import { Profile } from "../entities/profile.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
      
    const profileFactory = factoryManager.get(Profile)
    const userFactory = factoryManager.get(User)
    const customerInteractionsFactory = factoryManager.get(CustomerInteraction)
    const customerFactory = factoryManager.get(Customer)

    const users = await Promise.all(
      Array(15).fill('').map(async () => {
        const user = await userFactory.make({
          profile: await profileFactory.save()
        })
        return user
      })
    )

    const userRepository = dataSource.getRepository(User)
    
    console.log('seeding users with profiles...')
    const savedUsers = await userRepository.save(users)

    console.log('seeding customers...')
    const customers = await customerFactory.saveMany(30)

    const customerInteractions = await Promise.all(
      Array(50).fill('').map(async () => {
        const customerInteraction = await customerInteractionsFactory.make({
          salesRep: faker.helpers.arrayElement(savedUsers),
          customer: faker.helpers.arrayElement(customers)
        })

        return customerInteraction
      })
    )

    const customerInteractionsRepository = dataSource.getRepository(CustomerInteraction)
    
    console.log('seeding customer interactions...')
    await customerInteractionsRepository.save(customerInteractions)

  }
}