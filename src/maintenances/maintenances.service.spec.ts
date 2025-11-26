import { Test, TestingModule } from '@nestjs/testing';
import { MaintenancesService } from './maintenances.service';
import { VehicleService } from 'src/vehicles/vehicles.service';
import { Maintenance } from './entities/maintenance.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MaintenancesService', () => {
  let service: MaintenancesService;

  const mockMaintenanceRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockVehicleService = {
    getMaintenanceById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenancesService,
        {
          provide: getRepositoryToken(Maintenance),
          useValue: mockMaintenanceRepository,
        },
        {
          provide: VehicleService,
          useValue: mockVehicleService,
        },
      ],
    }).compile();

    service = module.get<MaintenancesService>(MaintenancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
