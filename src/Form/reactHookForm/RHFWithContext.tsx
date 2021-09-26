import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

function validateEmail(email: string) {
  if (email.length < 10) return "Email must be min of 10 characters";
}

export default function RHFWithContext() {
  const methods = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log("--------------");
    console.log(data);
  };
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div>
          <input
            defaultValue="test"
            {...register("email", {
              validate: validateEmail,
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <input {...register("password", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}
        </div>

        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

function NestedInput() {
  console.log("Nested input re-rendered");
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormData>(); // retrieve all hook methods
  return (
    <div>
      <input
        {...register("confirmPassword", {
          validate: function (retypedPassword) {
            if (watch("password") !== retypedPassword)
              return "Passwords don't match !!!";
          },
        })}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
    </div>
  );
}
