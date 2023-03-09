import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsEmail,
} from 'class-validator';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'female',
}

export enum EmployeeType {
  OTHER = 'Other',
  FULL_TIME = 'Full Time',
  PART_TIME = 'Part Time',
  CONTRACT_BASIS = 'Contract Basis',
}

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;
  name_with_initials: string;

  @IsString()
  employee_id: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(EmployeeType)
  employee_type: EmployeeType;

  @IsNumber()
  salary: number;

  @IsNumber()
  experience: number;

  @IsEmail()
  email: string;
}
