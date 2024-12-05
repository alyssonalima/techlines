import { Field as FormControl, Input } from "@chakra-ui/react";
import { Field, useField, Form } from "formik";

const TextField = ({ label, type, name, placeholder}) => {
    const [field, meta] = useField({ type, name, placeholder })
    return (
        <Form invalid={meta.error && meta.touched} mb='6'>
            <Field as={Input} lineClamp={1} label={label} {...field} type={type} name={name} placeholder={placeholder} invalid errorText={meta.error}>

            </Field>
        </Form>
    )
}

export default TextField;