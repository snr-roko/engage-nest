import { IsEmail, IsEnum, IsPhoneNumber, IsString, Length } from "class-validator"
import { CustomerStatus } from "src/entities/customer.entity"


export class CreateCustomerDto {
  
  @IsString()
  @Length(2, 100, {
    message: "First name must be between 2 and 100 characters long",
  })
  firstName: string

  @IsString()
  @Length(2, 100, {
    message: "Last name must be between 2 and 100 characters long"
  })
  lastName: string

  @IsEmail()
  email: string

  @IsPhoneNumber('GH')
  phone: string

  @IsString()
  address: string

  @IsEnum(CustomerStatus)
  status: CustomerStatus

  @IsString()
  city: string

  @IsString()
  region: string
  
}