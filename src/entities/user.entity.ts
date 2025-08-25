import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./profile.entity";

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

  // to add role and password
}