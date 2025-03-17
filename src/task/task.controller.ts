import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(
    private readonly taskService: TaskService, 
    private jwtService: JwtService,
  ) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('status') status?: string) {
    return this.taskService.findAll(page, limit, status);
  }
  
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Query('userId') userId: string) {
    return this.taskService.create(createTaskDto, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Query('userId') userId: string) {
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
