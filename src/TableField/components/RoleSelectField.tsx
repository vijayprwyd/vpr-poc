import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { useField } from "formik";

type RoleSelectFieldProps = {
    name: string;
} & CheckboxProps;

export default function RoleSelectField(props: RoleSelectFieldProps) {

  const { name } = props;
  const [field] = useField({ name, type: "checkbox" });


  function onChange(evt: any) {
      debugger;
      field.onChange(evt);
  }
  return (
    <FormGroup row>
      <FormControlLabel control={<Checkbox  {...field} onChange={onChange} />} label="Designer" />
      <FormControlLabel control={<Checkbox {...field} />} label="Developer" />
    </FormGroup>
  );
}
