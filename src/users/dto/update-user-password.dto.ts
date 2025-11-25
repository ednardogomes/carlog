import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class UpdateUserPasswordDto {
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