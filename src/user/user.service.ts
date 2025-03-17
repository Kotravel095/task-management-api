import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RegisterDTO } from './dto/register.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(registerDTO: RegisterDTO): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: registerDTO.email }).exec();
    
    if (existingUser) {
      throw new ConflictException('Email is already in use.');
    }

    const newUser = new this.userModel(registerDTO);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }
}