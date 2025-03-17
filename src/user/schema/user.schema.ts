import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'yourpassword',
    required: true
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: 'yourname',
    required: true
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: '0999999999',
  })
  @Prop()
  tel: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});