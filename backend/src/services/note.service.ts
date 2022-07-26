import { Injectable, HttpException, HttpStatus, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note, NoteDocument } from "../models/notes.schema";

@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    ) {}

    //Service for create new Note
    async create(note: Note): Promise<Note> {
        const reqBody ={
            id: note.id,
            userId: note.userId,
            title: note.title,
            description: note.description
        }
        const newNote = new this.noteModel(reqBody);
        return newNote.save();
    }

    //Service for get all notes for current user
    async findAll(userId: number): Promise<Note[]> {
        return await this.noteModel.find({userId: userId}).exec();
    }

    //Service for get selected note details
    async findOne(id: number): Promise<Note> {
        return await this.noteModel.findById(id).exec();
    }

    //Service for Update selected note with new changes
    async update(id, note: Note): Promise<Note> {
        const reqBody ={
            id: note.id,
            userId: note.userId,
            title: note.title,
            description: note.description,
        }
        return await this.noteModel.findByIdAndUpdate(id, reqBody, {new: true}).exec();
    }
    
    //Service for Delete note for current user
    async delete(id: number): Promise<Note> {
        return await this.noteModel.findByIdAndDelete(id).exec();
    }
    
}