import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { response } from "express";
import { Note } from "../models/notes.schema";
import { NoteService } from "../services/note.service";

@Controller('api/note')
export class NoteController {
    constructor(private readonly noteService: NoteService,
    )
    {}

    //Create new note
    @Post('/newNote')
    async createNote(@Res() response, @Body() note: Note) {
        const newNote = await this.noteService.create(note);
        return response.status(HttpStatus.CREATED).json({
            newNote
        })
    }

    //Get all notes for the user
    @Get('/allNotes:userId')
    async index(@Param('userId') userId: number) {
      return await this.noteService.findAll(userId);
    }

    //Get note details for selected id
    @Get('/getNote:id')
    async find(@Param('id') id: number) {
        return await this.noteService.findOne(id);
    }

    //Update note details with new changes
    @Put('/updateNote:id')
    async update(@Param('id') id: number, @Body() note: Note) {
        return await this.noteService.update(note,id);
    }

    //Delete selected note for selected User
    @Delete('/deleteNote:id')
    async delete(@Param('id') id: number) {
        return await this.noteService.delete(id);
     }
}