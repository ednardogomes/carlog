import { Module } from '@nestjs/common';
import { MaintenancesController } from './maintenances.controller';
import { MaintenancesService } from './maintenances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Maintenance]), VehiclesModule],
  controllers: [MaintenancesController],
  providers: [MaintenancesService]
})
export class MaintenancesModule { }
