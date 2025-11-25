import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString({ message: 'A marca deve ser uma string ' })
  @IsNotEmpty({ message: 'A marca não pode ser vazio' })
  @MaxLength(50, { message: 'A marca não pode ultrapassar 50 caractéres' })
  make: string;

  @IsString({ message: 'O modelo deve ser uma string ' })
  @IsNotEmpty({ message: 'O modelo não pode ser vazio' })
  @MaxLength(50, { message: 'O modelo não pode ultrapassar 50 caractéres' })
  model: string;

  @IsString({ message: 'A placa deve ser uma string ' })
  @IsOptional()
  @MinLength(7, { message: 'A placa deve ter 7 caractéres' })
  @MaxLength(7, { message: 'A placa deve ter 7 caractéres' })
  license_plate: string;

  @IsString({ message: 'A cor deve ser uma string' })
  @IsOptional()
  @MaxLength(20, { message: 'A cor não pode ultrapassar 20 caractéres' })
  color: string;

  @IsString({ message: 'O ano deve ser uma string' })
  @MinLength(4, { message: 'O ano deve ter 4 caractéres' })
  @MaxLength(4, { message: 'O ano deve ter  4 caractéres' })
  @IsOptional()
  model_year: string;
}
