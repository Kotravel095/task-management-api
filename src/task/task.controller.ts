import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Request } from '@nestjs/common';
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
  async findAll(
    @Request() req: any,
    @Query('page') page = 1, 
    @Query('limit') limit = 10, 
    @Query('status') status?: string,
  ) {
    const userId = req.user.id;
    return this.taskService.findAll(page, limit, status, userId);
  }
  
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto, 
    @Request() req: any
  ) {
    const userId = req.user.id;
    return this.taskService.create(createTaskDto, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto, 
    @Request() req: any
  ) {
    const userId = req.user.id;
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req: any
  ) {
    const userId = req.user.id;
    return this.taskService.remove(id, userId);
  }
}