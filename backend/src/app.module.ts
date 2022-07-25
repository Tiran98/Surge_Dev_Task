import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constatnt';
import { join } from 'path/posix';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
