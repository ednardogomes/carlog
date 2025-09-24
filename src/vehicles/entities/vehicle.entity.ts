import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  make: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  model: string;

  @Column()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  color: string;

  @Column()
  @IsString()
  @IsOptional()
  model_year: string;
}
