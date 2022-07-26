import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constatnt';
import { join } from 'path/posix';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://TiranSurge:surge1234@cluster0.kftxq.mongodb.net/?retryWrites=true&w=majority'),

    JwtModule.register({
      secret,
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MailerModule.forRoot({
      transport:{
        host:'smtp.sendgrid.net',
        auth:{
          user:'apikey',
          pass:'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'
        }
      }
    })
  ],
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}
