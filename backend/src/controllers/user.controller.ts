import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "../models/user.schema";
import { UserService } from "../services/user.service";
import { JwtService } from '@nestjs/jwt'

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService,
        private jwtService: JwtService
    ) 
    {}

    //Sign up function for student and admin can add user with tempory password
    @Post('/signup')
    async Signup(@Res() response, @Body() user: User) {
        const newUSer = await this.userService.signup(user);
        return response.status(HttpStatus.CREATED).json({
            newUSer
        })
    }

    //Sign in function for student
    @Post('/signin')
    async SignIn(@Res() response, @Body() user: User) {
        const token = await this.userService.signin(user, this.jwtService);
        return response.status(HttpStatus.OK).json(token)
    }

    //Get all users for admin panel
    @Get('/allUsers')
    async index() {
      return await this.userService.findAll();
    }

    //Get details of selected user
    @Get('/getUser:id')
    async find(@Param('id') id: number) {
        return await this.userService.findOne(id);
    }
}