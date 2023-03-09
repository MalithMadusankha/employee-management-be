import { Employee, EmployeeDocument } from './employee.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Model } from 'mongoose';
import EmployeeIDGenerator from './helper/employee.helper';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const last_emp = await this.findLast();
    if (last_emp) {
      createEmployeeDto.employee_id = await EmployeeIDGenerator(
        last_emp.employee_id,
      );
    } else {
      createEmployeeDto.employee_id = '0001';
    }

    return new this.employeeModel(createEmployeeDto).save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeModel.findById(id);
  }

  async findLast(): Promise<Employee> {
    return await this.employeeModel.findOne({}, {}, { sort: { _id: -1 } });
  }

  async filterEmployeeType(employee_type: string): Promise<Employee[]> {
    return this.employeeModel.find({ employee_type: employee_type });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.findByIdAndUpdate(id, {
      $set: { ...updateEmployeeDto },
    });
  }

  remove(id: string): Promise<Employee> {
    return this.employeeModel.findByIdAndDelete(id).exec();
  }
}
