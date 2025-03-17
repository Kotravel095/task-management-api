
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The status of the task => pending, in-progress, completed' })
  @IsEnum(['pending', 'in-progress', 'completed'])
  status: string;
}