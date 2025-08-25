import { IsString, Length, IsEmail, IsPhoneNumber, IsNotEmpty, IsOptional } from "class-validator"

export class createUserDto {
  
  @IsString()
  @Length(2, 100, {
  message: "First name must be between 2 and 100 characters long",
  })
  @IsNotEmpty({
    message: "First name is required"
  })
  firstName: string

  @IsString()
  @Length(2, 100, {
    message: "Last name must be between 2 and 100 characters long"
  })
  @IsNotEmpty({
    message: "Last name is required"
  })
  lastName: string

  @IsString()
  @Length(2, 100, {
    message: "Middle name must be between 2 and 100 characters long"
  })
  @IsOptional()
  middleName?: string

  @IsEmail()
  email: string

  @IsPhoneNumber('GH')
  phone: string

  @IsString()
  @IsNotEmpty({
    message: "Address is required"
  })
  address: string
  
  @IsString()
  @IsNotEmpty({
    message: "City is required"
  })
  city: string

  @IsString()
  @IsNotEmpty({
    message: "Region is required"
  })
  region: string
}