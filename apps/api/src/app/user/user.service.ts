import { ForbiddenException, Injectable } from '@nestjs/common';
import { USERS_DB } from '../auth/model/users.model';

@Injectable()
export class UserService {

    getUser(name: string){
        const user = USERS_DB.find(x => x.name === name);
        if (!user) {
            throw new ForbiddenException('Name Does not exists'); 
        }
        const cloneUser = {...user};
        delete cloneUser.password;
        return cloneUser;
    }
}
