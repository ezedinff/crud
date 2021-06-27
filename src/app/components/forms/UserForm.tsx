import React, { useCallback } from "react";
import TextInput from "./TextInput";
import FormElement from "./FormElement";
import { useForm } from "react-hook-form"; 
import { Button, Container, Paper } from "@material-ui/core";
import { User } from "app/pages/UserPage/slice/types";
import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
      .required('First Name is required'),
  lastName: Yup.string()
      .required('Last Name is required'),
  email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  location: Yup.string().required("Location is required"),
  hobby: Yup.string(),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
});
const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          // @ts-ignore
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );
const elements = [
    {name: "firstName", label: "First Name"},
    {name: "lastName", label: "Last Name"},
    {name: "email", label: "Email"},
    {name: "phoneNumber", label: "Phone Number"},
    {name: "location", label: "Location"},
    {name: "hobby", label: "Hobby"}
]


interface Props {
  user: User | undefined;
  submit: (user: User) => void;
}
const UserForm: React.FC<Props> = (props: Props) => {
  const resolver = useYupValidationResolver(validationSchema);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    reValidateMode: 'onSubmit',
    resolver,
  });

    const submit  = (user: User) => {
      //console.log(user, errors)
      props.submit(user);
    }
    return (
        <Container style={{width: "48%"}}>
                    <Paper  style={{padding: "24px"}}>
                    <form onSubmit={handleSubmit(submit)}>
            {
                elements.map(element => {
                      // @ts-ignore
                    return (
                        <div style={{ width: '100%', margin: '12px 0' }}>
                        <FormElement label={element.label}>
                          <TextInput
                          defaultValue={props.user ? props.user[element.name] : undefined}
                            // @ts-ignore
                            {...register(element.name)}
                            label={element.label}
                            error={!!errors[element.name]}
                            helperText={errors[element.name]?.message}
                          />
                        </FormElement>
                      </div>
                    )
                })
            }
          <div style={{ width: '100%', paddingTop: '32px' }}>
            <Button
                size="large"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Register
            </Button>
          </div>
        </form>
        </Paper>
        </Container>
    );
}
export default UserForm;