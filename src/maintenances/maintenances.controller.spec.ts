import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancesController } from './maintenances.controller';
import { MaintenancesService } from './maintenances.service';

describe('MaintenancesController', () => {
  let controller: MaintenancesController;

  const mockMaintenanceService = {
    getMaintenanceById: jest.fn(),
    getMaintenanceByVehicleId: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenancesController],
      providers: [
        {
          provide: MaintenancesService,
          useValue: mockMaintenanceService
        }
      ]
    }).compile();

    controller = module.get<MaintenancesController>(MaintenancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
