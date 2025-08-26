import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { User } from "./user.entity";

export enum InteractionType {
  CALL = 'call',
  EMAIL = 'email',
  CHAT = 'chat',
  INPERSON = 'inPerson'

}

@Entity()
export class CustomerInteraction {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Customer, (customer) => customer.interactions)
  @JoinColumn()
  customer: Customer

  @ManyToOne(() => User, (user) => user.customerInteractions)
  @JoinColumn()
  salesRep: User

  @Column(
    {
      type: 'enum',
      enum: InteractionType
    }
  )
  interactionType: InteractionType

  @Column()
  subject: string

  @Column()
  note: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}