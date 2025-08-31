import { IsNumber, IsOptional, IsPositive, Max} from "class-validator"

export class PaginationDto {
  
  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset?: number
  
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Max(100)
  limit?: number
}