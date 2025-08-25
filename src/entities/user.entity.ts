import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column({nullable: true})
  middleName?: string

  @Column()
  lastName: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  address: string

  @Column()
  city: string

  @Column()
  region: string

  // to add role and password
}