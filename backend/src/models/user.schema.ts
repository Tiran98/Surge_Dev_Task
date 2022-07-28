import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop({required:true})
    id: number;
    @Prop({required:false})
    firstName: string;
    @Prop({required:false})
    lastName: string;
    @Prop({required:true, unique:true, lowercase:true})
    email: string;
    @Prop({required:false})
    datOfBirth: Date
    @Prop({required:false})
    mobile: number
    @Prop({required:true})
    status: boolean
    @Prop({required:true})
    password: string
    @Prop({required:false})
    accountType: string
}
export const UserSchema = SchemaFactory.createForClass(User)