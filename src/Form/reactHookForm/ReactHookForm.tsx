import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};


function validateEmail(email: string) {
    if(email.length < 10) return 'Email must be min of 10 characters';
}

function validatePassword(password: string, ...rest: any[]) {
    console.log('Validating');
    return true;
}


export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);
  console.log('React hook form re-rerendered');

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div>
        <input defaultValue="test" {...register("email", {
            validate: validateEmail
        })} />
        {errors.email && <span>{errors.email.message}</span>}

      </div>

      {/* include validation with required or other standard HTML validation rules */}
      <div>
        <input {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}
      </div>

      <div>
        <input {...register("confirmPassword", { required: true, validate: validatePassword })} />
        {/* errors will return when field validation fails  */}
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>

      <input type="submit" />
    </form>
  );
}
