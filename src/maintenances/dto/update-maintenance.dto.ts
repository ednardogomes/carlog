import { Transform, TransformFnParams } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateMaintenance {
    @IsString()
    @IsOptional()
    service: string

    @IsNumber({}, { message: 'O valor de Custo deve ser um número' })
    @IsOptional()
    cost: number;

    @IsOptional()
    @IsString({ message: 'O valor de Km deve ser uma string' })
    @MaxLength(10, { message: 'O valor máximo de Km é de 10 caracteres' })
    km: string;

    @IsString({ message: 'A Data deve ser uma string nos formato DD-MM-YYYY ou DD/MM/YYYY' })
    @IsOptional()
    @Transform(({ value }: TransformFnParams) => {
        if (value && typeof value === 'string') {
            const formattedDate = value.replace(/\//g, '-');
            if (formattedDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
                const [day, month, year] = formattedDate.split('-');
                return `${year}${month}${day}`;
            }
        }
        return value;
    })
    maintenance_date: string;
}