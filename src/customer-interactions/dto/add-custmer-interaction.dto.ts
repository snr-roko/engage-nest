import { IsEnum, IsNumber, IsString, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { InteractionType } from "src/entities/interaction.entity"

export class addCustomerInteractionDto {
  
  @ApiProperty({ description: 'Customer ID', example: 1 })
  @IsNumber()
  customerId: number

  @ApiProperty({ description: 'Type of interaction', enum: InteractionType, example: InteractionType.CALL })
  @IsEnum(InteractionType)
  interactionType: InteractionType

  @ApiProperty({ description: 'Subject of the interaction', example: 'Follow up call' })
  @IsString()
  @Length(4, 20)
  subject: string

  @ApiProperty({ description: 'Detailed note about the interaction', example: 'Customer was interested in our premium package' })
  @IsString()
  @Length(10, 100)
  note: string
}