import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { secret } from './utils/constatnt';
import { join } from 'path/posix';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminSeed } from './models/admin.seed';
import { UserModule } from './modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './modules/email.module';
import { NoteModule } from './modules/note.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://TiranSurge:surge1234@cluster0.kftxq.mongodb.net/?retryWrites=true&w=majority'),
    
    UserModule,
    EmailModule,
    NoteModule,

  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
