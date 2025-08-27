import { en, Faker } from "@faker-js/faker";
import { Gender, Profile } from "../entities/profile.entity";
import { setSeederFactory } from "typeorm-extension";

const faker = new Faker({locale: en})
export const profileFactory = setSeederFactory(
  Profile, () => {
    const profile = new Profile()
    profile.bio = faker.lorem.sentence()
    profile.dateOfbirth = faker.date.birthdate()
    profile.gender = faker.helpers.arrayElement([Gender.FEMALE, Gender.MALE])
    
    return profile
  }
)