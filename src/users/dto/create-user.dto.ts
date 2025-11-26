import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'O nome deve ser uma string' })
    @IsNotEmpty({ message: 'O o nome não pode está vazio' })
    @MaxLength(50, { message: 'O nome não de ter mais que 50 caracteres' })
    name: string;

    @IsString({ message: 'O sobrenome deve ser uma string' })
    @IsNotEmpty({ message: 'A o sobrenome não pode está vazio' })
    @MaxLength(50, { message: 'O sobrenome não de ter mais que 50 caracteres' })
    surname: string;

    @IsNotEmpty({ message: 'O email não pode estar vazio.' })
    @IsEmail({}, { message: 'O formato do email é inválido.' })
    email: string;

    @IsString({ message: 'A senha deve ser uma string' })
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    }, {
        message: 'A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra minúscula, uma maiúscula e um número.'
    })
    @MaxLength(100, { message: 'A senha não deve exceder 100 caracteres.' })
    password: string;
}