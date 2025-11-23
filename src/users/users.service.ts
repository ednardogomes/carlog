import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getUserById(id: string): Promise<User> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Insira um ID válido');
        }

        const foundUser = await this.userRepository.findOne({ where: { id } })

        if (!foundUser) {
            throw new NotFoundException('Usuário não encontrado.!');
        }

        return foundUser;
    }

    async findByEmail(email: string): Promise<User> {
        if (!email) {
            throw new BadRequestException('Email não pode está vazio');
        }

        const foundUser = await this.userRepository.findOne({ where: { email } })

        if (!foundUser) {
            throw new NotFoundException('Usuário não encontrado.!');
        }

        return foundUser;
    }

    async createUser(createUserDto: CreateUserDto): Promise<string> {
        const foundUser = await this.userRepository.findOne({ where: { email: createUserDto.email } })

        if (foundUser) {
            throw new BadRequestException('Já existe um usuário com este email')
        }

        const newUserDb = new User();
        newUserDb.id = uuid();
        newUserDb.name = createUserDto.name;
        newUserDb.surname = createUserDto.surname;
        newUserDb.email = createUserDto.email;
        newUserDb.password = await bcrypt.hash(createUserDto.password, 10);

        try {
            await this.userRepository.save(newUserDb);
            return 'Usuário criado com sucesso';
        } catch (error) {
            throw new BadRequestException(
                `Ocorreu um erro ao criar a usuário ${error.message}`,
            );
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<string> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Insira um ID válido');
        }

        const foundUser = await this.userRepository.findOne({ where: { id } })

        if (!foundUser) {
            throw new NotFoundException('Usuário não encontrado.!');
        }

        try {
            await this.userRepository.update(id, updateUserDto);
            Object.assign(foundUser, updateUserDto)
            return 'Usuário atualizado com sucesso'
        } catch (error) {
            throw new BadRequestException(`Erro inesperado ${error.message}`)
        }

    }

    async deleteUser(id: string): Promise<string> {
        if (!isValidUUID(id)) {
            throw new BadRequestException('Insira um ID válido');
        }

        const foundUser = await this.userRepository.findOne({ where: { id } })

        if (!foundUser) {
            throw new NotFoundException('Usuário não encontrado.!');
        }

        const result = await this.userRepository.delete(id);
        if (result.affected > 0) {
            return 'Usuário excluido com sucesso'
        }
    }

}
