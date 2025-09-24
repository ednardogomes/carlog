import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Processor('vehicle-queue')
export class VehicleProcessor {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) { }

  @Process('process-vehicle')
  async handlevehicle(job: Job) {
    console.log(`Processing vehicle: ${job.data.title}`);

    // const vehicle = await this.vehicleRepository.findOne({
    //   where: { id: job.data.id },
    // });
    // if (vehicle) {
    //   vehicle.completed = true;
    //   await this.vehicleRepository.save(vehicle);
    // }
  }
}
