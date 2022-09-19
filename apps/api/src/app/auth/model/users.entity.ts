import { ApiProperty } from '@nestjs/swagger';

export class UsersEntity {
    @ApiProperty()
    name: string
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty()
    age: number
}
