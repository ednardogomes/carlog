import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    @IsNotEmpty({ message: 'O email não pode estar vazio.' })
    @IsEmail({}, { message: 'O formato do email é inválido.' })
    email: string

    @IsString({ message: 'A senha deve ser uma string' })
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    password: string
}