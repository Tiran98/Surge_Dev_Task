import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user.controller';
import { UserSchema } from 'src/models/user.schema';
import { UserService } from 'src/services/user.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from 'src/utils/constatnt';
import { join } from 'path/posix';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
        JwtModule.register({
            secret: secret,
            signOptions: { expiresIn: '1h' },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [UserController],
    providers: [UserService, JwtService]
})

export class UserModule {}