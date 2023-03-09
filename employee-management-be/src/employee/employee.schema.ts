import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop()
  full_name: string;

  @Prop()
  name_with_initials: string;

  @Prop()
  display_name: string;

  @Prop()
  employee_id: string;

  @Prop()
  gender: string;

  @Prop()
  date_of_birth: string;

  @Prop()
  email: string;

  @Prop()
  mobile_number: string;

  @Prop()
  designation: string;

  @Prop()
  employee_type: string;

  @Prop()
  join_date: string;

  @Prop()
  experience: number;

  @Prop()
  salary: number;

  @Prop()
  personal_notes: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
