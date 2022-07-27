import { Injectable, HttpException, HttpStatus, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../models/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { secret } from 'src/utils/constatnt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {} 

    async signup(user: User): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            datOfBirth: user.datOfBirth,
            mobile: user.mobile,
            status: user.status,
            password: hash,
            accountType: user.accountType
        }
        const newUser = new this.userModel(reqBody);
        return newUser.save();
    }

    async signin(user: User, jwt: JwtService): Promise<any> {
        const foundUser = await this.userModel.findOne({ email: user.email }).exec();
        console.log(foundUser)
        if (foundUser) {
            const { password } = foundUser;
            console.log(user.password)
            console.log(password)
            if (await bcrypt.compareSync(user.password, password)) {
                const payload = { email: user.email };  
                return {
                    token: jwt.sign(payload, { secret: secret }),
                    status : "True",
                    foundUser
                };
            }
            return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
        }
        return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id: number): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findMail(user: User): Promise<any> {
        const foundEmail = await this.userModel.findOne({email: user.email}).exec();
        if(foundEmail) {
            return {
                foundEmail,
                message: "User Found"
            }
        }
        return {
            message: "Invalid Email"
        }
    }

}