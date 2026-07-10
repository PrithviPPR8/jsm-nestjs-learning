import { Injectable } from '@nestjs/common';
import { LoggerService } from "./user.logger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export interface User {
    id: number,
    name: string,
    email: string
}

@Injectable()
export class UserService {
    constructor(private readonly logger: LoggerService) {};

    private users: User[] = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" }
    ];

    findAllUsers(name: string = '') {
        this.logger.log('Finding all users');

        return this.users.filter((user) => 
            user.name.toLowerCase().includes(name.toLowerCase())
        )
    }

    findUserById(id: number) {
        this.logger.log(`Finding user ${id}`);

        return this.users.find(user => user.id === id) ?? null;
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.users.length + 1,
            ...createUserDto
        }

        this.users.push(newUser);

        return {
            message: "User created successfully",
            data: newUser
        }
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        const index = this.users.findIndex(
            user => user.id === id
        )
        if (index === -1) return null;

        this.users[index] = {
            ...this.users[index],
            ...updateUserDto
        }

        return {
            message: "User updated successfully",
            data: this.users[index]
        }
    }

    deleteUser(id: number) {
        const index = this.users.findIndex(
            user => user.id === id
        )
        if (index === -1) return null;

        this.users.splice(index, 1);

        return {
            message: "User deleted successfully"
        }
    }
}

// UserController    ->  needs UserService
// UserService       ->  needs LoggerService
// NestJS            ->  creates and connects everything
