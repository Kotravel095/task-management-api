import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The status of the task => pending, in-progress, completed' })
  @IsEnum(['pending', 'in-progress', 'completed'])
  @IsOptional()
  status?: string;
}