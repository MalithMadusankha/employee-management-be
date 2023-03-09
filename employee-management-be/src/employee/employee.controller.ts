import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UseInterceptors } from '@nestjs/common/decorators';
import { CorsInterceptor } from 'src/cors.interceptor';

@Controller('employee')
@UseInterceptors(CorsInterceptor)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto,
  ) {
    try {
      console.log('<======== Create Employee ========>');
      return this.employeeService.create(createEmployeeDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      console.log('<======== Get All Employees ========>');
      const res_obj = await this.employeeService.findAll();
      res.status(200).json(res_obj);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      console.log('<======== Find Employee By ID ========>');
      return this.employeeService.findOne(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('type/:employee_type')
  filterEmployeeType(@Param('employee_type') employee_type: string) {
    try {
      console.log('<======== Filter Employee By Type ========>', employee_type);
      return this.employeeService.filterEmployeeType(employee_type);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      console.log('<======== Update Employee ========>');
      return this.employeeService.update(id, updateEmployeeDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let res = {
      res: 'Success fully deteted',
      staus: 1,
      error: '',
    };
    try {
      console.log('<======== Delete Employee ========>');
      const resilt_obj = await this.employeeService.remove(id);
      if (!resilt_obj) {
        res.res = 'Not detete';
        res.staus = 0;
      }
      return res;
    } catch (error) {
      res = {
        res: 'Not detete',
        staus: 0,
        error: 'Error occuer',
      };
      console.error(error);
      throw res;
    }
  }
}
