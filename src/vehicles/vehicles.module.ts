import { Module } from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';

// import { VehicleProcessor } from './vehicles.processor';
// import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    // BullModule.registerQueue({
    //   name: 'tasks',
    // }),
  ],
  controllers: [VehiclesController],
  providers: [VehicleService /* VehicleProcessor*/],
})
export class VehiclesModule { }
