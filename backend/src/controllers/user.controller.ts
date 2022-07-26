import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "../models/user.schema";
import { UserService } from "../services/user.service";
import { JwtService } from '@nestjs/jwt'

@Controller('/api/user')
export class UserController {
    constructor(private readonly userServerice: UserService,
        private jwtService: JwtService
    ) 
    {}
    @Post('/signup')
    async Signup(@Res() response, @Body() user: User) {
        const newUSer = await this.userServerice.signup(user);
        return response.status(HttpStatus.CREATED).json({
            newUSer
        })
    }
    @Post('/signin')
    async SignIn(@Res() response, @Body() user: User) {
        const token = await this.userServerice.signin(user, this.jwtService);
        return response.status(HttpStatus.OK).json(token)
    }
    @Get()
    async index() {
      return await this.userServerice.findAll();
    }
    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.userServerice.findOne(id);
    }
}