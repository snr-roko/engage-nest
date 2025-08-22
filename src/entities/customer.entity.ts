import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum CustomerStatus {
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}