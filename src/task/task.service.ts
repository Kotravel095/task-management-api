import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findAll(page: number | null = 1, limit: number | null = 10, status?: string): Promise<object> {
    page = page ?? 1;
    limit = limit ?? 10;

    const query: any = {};
    if (status) query.status = status;

    const data = await this.taskModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

    const total = await this.taskModel.countDocuments(query);

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
        data: data,
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
  
    try {
      const task = new this.taskModel({
        ...createTaskDto,
        createdBy: userId,
        updatedBy: userId,
      });
  
      const savedTask = await task.save();

      if(savedTask === null) {
        return {
          code: 400,
          status: "fail",
          message: "fail for save",
        };
      }
  
      return {
        code: 200,
        status: "success",
        message: "insert successfully",
      };
    } catch (error) {
      return {
        code: 500,
        status: "fail",
        message: "fail for save",
      };
    }
  }
  

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<object> {
    const validStatuses = ['pending', 'in-progress', 'completed'];
  
    try {
      const task = await this.taskModel.findById(id);
      if (!task) {
        return {
          code: 500,
          status: "fail",
          message: "not found id for update",
        };
      }
  
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

      if(updatedTask === null) {
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
    } catch (error) {
      return {
        code: 400,
        status: "fail",
        message: "fail for update",
      };
    }
  }
  
  

  async remove(id: string): Promise<object> {
    try {
      const task = await this.taskModel.findById(id);
      if (!task) {
        return {
          code: 500,
          status: "fail",
          message: "Not found id for delete",
        };
      }
  
      await this.taskModel.deleteOne({ _id: id });
      return {
        code: 200,
        status: "success",
        message: "Task deleted successfully",
      };
    } catch (error) {
      return {
        code: 500,
        status: "fail",
        message: "Failed to delete task",
      };
    }
  }
  
}
