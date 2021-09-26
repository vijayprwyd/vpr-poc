import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NameField from "./components/NameField";
import RoleSelectField from "./components/RoleSelectField";
import TableActionsField from "./components/TableActionsField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Form, Formik } from "formik";
import { Employee, Role } from "./types";
import { createData } from "./helpers/tableFieldHelpers";

const rows = [
  createData("Vijay P R", "vijaywyd94@gmail.com", Role.Developer, [],  0),
  createData("Jayalakshmi P M", "preethi2220@gmai.com", Role.Designer, [], 1),
];

const tableContainerStyle = {
  margin: "10px",
  width: "inherit",
};

type TableFormField = {
  employees: Array<Employee>;
}

const sleep = () => new Promise(resolve => setTimeout(resolve, 2000));

async function validateTableFormField(values: TableFormField) {
  // await sleep();
  return Promise.resolve({
    //employees: [{name: 'Error'}], // Promise.resolve([{name: 'Error'}]),
  });
}

export default function TableField() {
  return (
    <Formik
      initialValues={{ employees: rows }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      validate= {validateTableFormField}
      validateOnBlur={false}
    >
      {({ setFieldValue, getFieldProps }) => {

        const employees: Array<Employee> = getFieldProps("employees").value;
        const handleAddEmployee = () => {
          const { value } = getFieldProps("employees");
          setFieldValue("employees", [...value, { id: new Date().getTime()}]);
        };

        const handleDeleteEmployee = (id: number) => {
          const employeesValue : Array<Employee> = getFieldProps("employees").value;
          const filteredEmployees = employeesValue.filter((employee) => id !== employee.id);
          setFieldValue("employees", filteredEmployees);
        }
        return (
          <Form>
            <TableContainer component={Paper} sx={tableContainerStyle}>
              <Stack spacing={2} direction="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddEmployee}
                >
                  Text
                </Button>
              </Stack>

              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {employees.map((employee, index) => (
                    <TableRow
                      key={employee.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell size="small">
                        <NameField name={`employees[${index}].name`} />
                      </TableCell>

                      <TableCell size="small">
                        <NameField name={`employees[${index}].email`} />
                      </TableCell>

                      <TableCell size="small">
                        <RoleSelectField name={`employees[${index}].role`} />
                      </TableCell>

                      <TableCell size="small">
                        <TableActionsField onDelete={() => handleDeleteEmployee(employee.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}
