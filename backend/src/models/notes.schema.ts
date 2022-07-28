import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type NoteDocument = Note & Document;

@Schema()
export class Note {
    @Prop({required:true})
    id: number;
    @Prop({required:true})
    userId: number;
    @Prop({required:true})
    title: string;
    @Prop({required:true})
    description: string;
}
export const NoteSchema = SchemaFactory.createForClass(Note)