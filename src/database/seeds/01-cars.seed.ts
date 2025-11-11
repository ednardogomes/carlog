import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

console.log("Variaveis", configService.get('POSTGRES_USER'), configService.get('POSTGRES_PASSWORD'), configService.get('POSTGRES_DB'));

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    synchronize: false,
    logging: ['error'],
    migrations: [],
    subscribers: [],
});
async function seedVehicles() {
    await AppDataSource.initialize();
    const vehicleRepository = AppDataSource.getRepository(Vehicle);
    const vehicle1 = vehicleRepository.create({
        make: 'Fiat',
        model: 'Uno',
        license_plate: 'ABC1234',
        color: 'Vermelho',
        model_year: '2010',
    });
    const vehicle2 = vehicleRepository.create({
        make: 'Chevrolet',
        model: 'Onix',
        license_plate: 'XYZ5678',
        color: 'Preto',
        model_year: '2022',
    });

    const vehicle3 = vehicleRepository.create({
        make: 'Toyota',
        model: 'Corolla',
        license_plate: 'PQR9012',
        color: 'Prata',
        model_year: '2019',
    });

    const vehicle4 = vehicleRepository.create({
        make: 'Ford',
        model: 'Ka',
        license_plate: 'LMN3456',
        color: 'Azul',
        model_year: '2015',
    });

    const vehicle5 = vehicleRepository.create({
        make: 'Honda',
        model: 'Civic',
        color: 'Branco',
        model_year: '2020',
    });

    const allNewVehicles = [vehicle1, vehicle2, vehicle3, vehicle4, vehicle5];
    await vehicleRepository.save(allNewVehicles);
}
seedVehicles().catch(error => {
    console.error('Erro durante a população de dados:', error);
    process.exit(1);
});