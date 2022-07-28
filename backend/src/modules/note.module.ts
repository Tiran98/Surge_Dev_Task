import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from 'src/controllers/note.controller';
import { NoteSchema } from 'src/models/notes.schema';
import { NoteService } from 'src/services/note.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema}]),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers:[NoteController],
    providers:[NoteService]
})

export class NoteModule {}