import { Faker, en } from "@faker-js/faker";
import { CustomerInteraction, InteractionType } from "../entities/interaction.entity";
import { setSeederFactory } from "typeorm-extension";

const faker = new Faker({locale: en})

export const customerInteractionsFactory = setSeederFactory(CustomerInteraction, () => {
  const customerInteraction = new CustomerInteraction()

  customerInteraction.interactionType = faker.helpers.arrayElement([InteractionType.CALL, InteractionType.EMAIL, InteractionType.CHAT, InteractionType.INPERSON])
  customerInteraction.note = faker.lorem.sentence({min: 20, max: 100})
  customerInteraction.subject = faker.lorem.sentence({min: 5, max: 10})

  return customerInteraction

})