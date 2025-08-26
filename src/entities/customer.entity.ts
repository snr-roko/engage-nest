import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerInteraction } from "./interaction.entity";

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PROSPECT = 'prospect'
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column(
    {
      type: 'enum',
      enum: CustomerStatus,
      default: CustomerStatus.PROSPECT
    }
  )
  status: CustomerStatus

  @Column()
  address: string

  @Column()
  city: string

  @Column()
  region: string

  @OneToMany(() => CustomerInteraction, (interaction) => interaction.customer)
  interactions: CustomerInteraction[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}