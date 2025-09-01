import { IsEnum, IsNumber, IsString, Length } from "class-validator"
import { InteractionType } from "src/entities/interaction.entity"

export class addCustomerInteractionDto {
  
  @IsNumber()
  customerId: number

  @IsEnum(InteractionType)
  interactionType: InteractionType

  @IsString()
  @Length(4, 20)
  subject: string

  @IsString()
  @Length(10, 100)
  note: string
}