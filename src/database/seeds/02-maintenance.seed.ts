import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Maintenance } from '../../maintenances/entities/maintenance.entity';
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
const NUM_MAINTENANCES_PER_VEHICLE = 15;
const SERVICES = [
    'Troca de Óleo',
    'Troca de Pneu',
    'Revisão de Freios',
    'Balanceamento/Alinhamento',
    'Troca de Filtros (Ar/Combustível)',
    'Inspeção Geral',
];

async function seedMaintenances() {
    await AppDataSource.initialize();

    const maintenanceRepository = AppDataSource.getRepository(Maintenance);
    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    const vehicles = await vehicleRepository.find();

    if (vehicles.length === 0) {
        console.warn("Nenhum veículo encontrado. Execute o seed dos veículos primeiro!");
        await AppDataSource.destroy();
        return;
    }

    const allNewMaintenances: Maintenance[] = [];
    let maintenanceCounter = 0;
    for (const vehicle of vehicles) {
        for (let i = 0; i < NUM_MAINTENANCES_PER_VEHICLE; i++) {

            // Lógica para alternar serviços
            const serviceIndex = i % SERVICES.length;

            // Criar a data com base no contador
            const year = 2025 - Math.floor(i / 4); // Alterna o ano a cada 7 manutenções
            const month = String((i % 12) + 1).padStart(2, '0');
            const day = String((i % 28) + 1).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            const newMaintenance = maintenanceRepository.create({
                vehicle_id: vehicle.id,
                service: SERVICES[serviceIndex],
                cost: parseFloat((100 + Math.random() * 500).toFixed(2)), // Custo aleatório
                km: String(4000 + maintenanceCounter * 4000), // KM crescente
                maintenance_date: dateStr,
            });

            allNewMaintenances.push(newMaintenance);
            maintenanceCounter++;
        }
    }
    await maintenanceRepository.save(allNewMaintenances);
};
seedMaintenances().catch(error => {
    console.error('Erro durante a população de dados:', error);
    process.exit(1);
})