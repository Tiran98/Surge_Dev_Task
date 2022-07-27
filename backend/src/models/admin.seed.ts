import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from 'src/services/user.service';

@Injectable()
export class AdminSeed {
    constructor(private readonly userService: UserService,
    ) {}

    @Command({ command: 'create : admin', describe: 'create a admin'})
    async create() {
        const admin = await this.userService.signup({
            id : 1001,
            firstName : 'FirstName',
            lastName : 'LastName',
            email : 'Email',
            datOfBirth :new Date('2001-02-05'),
            mobile : 9999999999,
            status : false,
            password: 'password',
            accountType: 'Admin'
        });
        console.log(admin);
    }
}