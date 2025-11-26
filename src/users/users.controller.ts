import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly UserService: UsersService) { }

    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.UserService.getUserById(id);
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<string> {
        return await this.UserService.createUser(createUserDto)
    }

    @Put('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<string> {
        return await this.UserService.updateUser(id, updateUserDto)
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<string> {
        return await this.UserService.deleteUser(id)
    }
}
