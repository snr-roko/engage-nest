import { Entity, OneToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./user.entity";

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User, (user) => user.profile)
  user: User

  @Column({nullable: true})
  bio?: string

  @Column({nullable: true})
  profilePicture?: string

  @Column({nullable: true})
  dateOfbirth?: Date

  @Column({type: 'enum', enum: Gender})
  gender?: Gender

}