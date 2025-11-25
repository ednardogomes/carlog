import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class UpdateUserDto {
    @IsString({ message: 'O nome deve ser uma string' })
    @IsNotEmpty({ message: 'O o nome não pode está vazio' })
    @MaxLength(50, { message: 'O nome não de ter mais que 50 caracteres' })
    name: string;

    @IsString({ message: 'O sobrenome deve ser uma string' })
    @IsNotEmpty({ message: 'A o sobrenome não pode está vazio' })
    @MaxLength(50, { message: 'O sobrenome não de ter mais que 50 caracteres' })
    surname: string;
}