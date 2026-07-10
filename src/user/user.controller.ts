import { Body, Controller, Get, Param, Post, Put, Query, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { RoleGuard } from "../guards/role.guard";

// @Get('all')          // GET /user/all
// @Get(':id')          // GET /user/:id   -dynamic segment
// @Post()              // POST /user/
// @Put(':id')          // PUT /user/:id
// @Delete(':id')       // DELETE /user/:id

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // GET /user
    @Get()
    getUsers(@Query('name') name: string): unknown {
        return this.userService.findAllUsers(name);;
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(
        @Param('id') id: string, 
        @Body() updateUserDto: UpdateUserDto) {
            return this.userService.updateUser(Number(id), updateUserDto);
        }

    @Delete(':id')
    @UseGuards(RoleGuard)
    deleteUser(@Param('id') id:string) {
        return this.userService.deleteUser(Number(id));
    }
}
