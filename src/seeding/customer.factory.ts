import { en, en_GH, Faker } from "@faker-js/faker";
import { Customer, CustomerStatus } from "../entities/customer.entity";
import { setSeederFactory } from "typeorm-extension";

const faker = new Faker({locale: [en_GH, en]})

export const customerFactory = setSeederFactory(
  Customer, () => {
    const customer = new Customer()

    customer.firstName = faker.person.firstName()
    customer.lastName = faker.person.lastName()
    customer.address = faker.location.streetAddress()
    customer.city = faker.location.city()
    customer.email = faker.internet.email()
    customer.phone = faker.phone.number({style: 'national'})
    customer.region = faker.location.state()
    customer.status = faker.helpers.arrayElement([CustomerStatus.ACTIVE, CustomerStatus.INACTIVE, CustomerStatus.PROSPECT])

    return customer
  }
)