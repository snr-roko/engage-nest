import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert} from "typeorm";
import { Profile } from "./profile.entity";
import { CustomerInteraction } from "./interaction.entity";
import * as bcrypt from "bcrypt"

export enum Role {
  ADMIN = 'admin',
  SALESREP = 'salesRep',
  SALESMANAGER = 'salesManager'
}

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

  @OneToOne(() => Profile, (profile) => profile.user, {cascade: true})
  @JoinColumn()
  profile: Profile

  @Column({type: 'enum', enum: Role, default: Role.SALESREP})
  role: Role

  @Column({default: bcrypt.hash('securePassword', 10)})
  password: string

  @OneToMany(() => CustomerInteraction, (customerInteraction) => customerInteraction.salesRep)
  customerInteractions: CustomerInteraction[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  async hashPassword () {
    this.password = await bcrypt.hash(this.password, 10)
  }

}