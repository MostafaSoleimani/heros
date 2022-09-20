import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    getUser(@GetUser() user: any) {
        console.log('user:   ', user)
        return this.userService.getUser(user.name);
    }
}
