import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('maintenances')
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  vehicle_id: string;

  @Column()
  @IsString()
  service: string;

  @Column('numeric', { precision: 10, scale: 2 })
  @IsNumber()
  cost: number;

  @Column()
  @IsString()
  km: string;

  @Column()
  maintenance_date: string;

  @ManyToOne(() => Vehicle, vehicle => vehicle.maintenances)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
