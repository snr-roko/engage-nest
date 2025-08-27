import { Faker, en, en_GH } from "@faker-js/faker"
import { User } from "../entities/user.entity"
import { setSeederFactory } from "typeorm-extension"

const faker = new Faker({ locale: [en_GH, en] })

export const userFactory = setSeederFactory(
  User,
  () => {
    const user = new User()

    user.firstName = faker.person.firstName()
    user.lastName = faker.person.lastName()
    user.phone = faker.phone.number({ style: 'national' })
    user.address = faker.location.streetAddress()
    user.city = faker.location.city()
    user.region = faker.location.state()
    user.email = faker.internet.email()

    return user;
  }
);