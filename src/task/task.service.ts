import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';
import { log } from 'node:console';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, status?: string, userId?: string): Promise<object> {
    const query = { userId };
    if (status) {
      query['status'] = status;
    }

    const tasks = await this.taskModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.taskModel.countDocuments(query).exec();

    if (total === 0) {
      return {
        code: 400,
        status: "fail",
        message: "fail for query",
        total: 0,
        data: null,
      };
    }

    return {
      code: 200,
      status: "success",
      message: "success",
      total: total,
      data: tasks,
    };
  }

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<object> {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    
    if (!validStatuses.includes(createTaskDto.status)) {
      return {
        code: 400,
        status: "fail",
        message: "Invalid status. Valid statuses are: pending, in-progress, completed.",
      };
    }

    const newTask = new this.taskModel({ ...createTaskDto, userId });
    const task = await newTask.save();

    return {
      code: 201,
      status: "success",
      message: "Task created successfully",
      data: task,
    };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<object> {
    const task = await this.taskModel.findById(id);

    console.log('task: ', task);
    
    if (!task) {
      return {
        code: 400,
        status: "fail",
        message: "Task not found",
      };
    }

    if (task.userId !== userId) {
      return {
        code: 403,
        status: "fail",
        message: "You are not authorized to delete this task",
      };
    }

    const validStatuses = ['pending', 'in-progress', 'completed'];
  
    if (updateTaskDto.status && !validStatuses.includes(updateTaskDto.status)) {
      return {
        code: 400,
        status: "fail",
        message: "Invalid status. Valid statuses are: pending, in-progress, completed.",
      };
    }

    task.title = updateTaskDto.title || task.title;
    task.description = updateTaskDto.description || task.description;
    task.status = updateTaskDto.status || task.status;
    task.updatedBy = userId;

    const updatedTask = await task.save();

    if (updatedTask === null) {
      return {
        code: 400,
        status: "fail",
        message: "fail for update",
      };
    }

    return {
      code: 200,
      status: "success",
      message: "update successfully",
    };
  }

  async remove(id: string, userId: string): Promise<object> {
    const task = await this.taskModel.findById(id);
    
    if (!task) {
      return {
        code: 404, 
        status: "fail",
        message: "Task not found for the given id",
      };
    }
  
    if (task.userId !== userId) {
      return {
        code: 403,
        status: "fail",
        message: "You are not authorized to delete this task",
      };
    }
  
    await this.taskModel.deleteOne({ _id: id });
  
    return {
      code: 200,
      status: "success",
      message: "Task deleted successfully",
    };
  }
  
}