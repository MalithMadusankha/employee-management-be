export default async function EmployeeIDGenerator(emp_id: string) {
  let id_0 = '';

  const num_length = parseInt(emp_id).toString().length;

  for (let index = 0; index < 4 - num_length; index++) {
    id_0 += '0';
  }
  const num = parseInt(emp_id) + 1;
  return id_0 + num;
}
