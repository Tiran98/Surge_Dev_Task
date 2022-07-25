import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type UserDocument = User & Document;
@Schema()
export class User {
    @Prop({required:true})
    id: number;
    @Prop({required:true})
    firstName: string;
    @Prop({required:true})
    lastName: string;
    @Prop({required:true, unique:true, lowercase:true})
    email: string;
    @Prop({required:true})
    datOfBirth: Date
    @Prop({required:true})
    mobile: number
    @Prop({required:true})
    status: boolean
    @Prop({required:true})
    password: string
    @Prop({required:true})
    accountType: string
    @Prop({default: Date.now() })
    createdDate: Date
}
export const UserSchema = SchemaFactory.createForClass(User)