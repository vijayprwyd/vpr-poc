import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

type NameFieldProps = {
  name: string;
} & TextFieldProps;

export default function NameField(props: NameFieldProps) {
  const { name, type } = props;
  const [field, meta] = useField({ name, type });

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      size="small"
      name={name}
    />
  );
}
