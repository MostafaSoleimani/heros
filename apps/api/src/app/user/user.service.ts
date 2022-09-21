import { ForbiddenException, Injectable } from '@nestjs/common';
import { USERS_DB } from '../auth/model/users.model';

@Injectable()
export class UserService {

    getUser(userName: string){
        const user = USERS_DB.find(x => x.name === userName);
        if (!user) {
            throw new ForbiddenException('Name Does not exists'); 
        }
        const {name, email, age} = user;
        return {name, email, age};
    }
}
