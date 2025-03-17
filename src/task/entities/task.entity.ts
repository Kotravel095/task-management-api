import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['pending', 'in-progress', 'completed'] })
  status: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
