import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get(':name')
    getUser(@Param() name: string) {
        return this.userService.getUser(name);
    }
}
