import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get(':name')
    getUser(@Param() param: any) {
        return this.userService.getUser(param.name);
    }
}
