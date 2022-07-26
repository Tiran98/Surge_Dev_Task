import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from 'src/controllers/email.controller';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        MailerModule.forRoot({
            transport:{
              host:'smtp.sendgrid.net',
              auth:{
                user:'apikey',
                pass:'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'
              }
            }
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [EmailController]
})

export class EmailModule {}