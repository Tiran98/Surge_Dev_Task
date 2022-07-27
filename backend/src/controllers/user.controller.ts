import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "../models/user.schema";
import { UserService } from "../services/user.service";
import { JwtService } from '@nestjs/jwt'
import { response } from "express";

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
        console.log(token)
        let foundUser = token.foundUser;
        if(token.status === "True"){
            return response.status(HttpStatus.OK).json({
                token : token,
                user,
                foundUser
            })
        }else{
            return response.status(HttpStatus.OK).json({
                message: "Inavalid Credentials"
            })
        }
        
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

    //Get details from email of selected user
    @Get('/getUseremail')
    async findbyEmail(@Res() response,@Body() user:User) {
        const result = await this.userService.findMail(user);
        if(result.message == "User Found"){
            return response.status(HttpStatus.OK).json({
                user
            })
        }else{
            return response.status(HttpStatus.OK).json({
                message: "Inavalid email"
            })
        }
        
    }
}