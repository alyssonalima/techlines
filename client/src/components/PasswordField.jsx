import { Field as FormControl, Input, Button, HStack, InputElement } from "@chakra-ui/react";
import { Field, useField, Form } from "formik";
import { useState } from "react";
//import { InputGroup } from "@/components/ui/input-group";
import { LuEye, LuEyeOff } from "react-icons/lu";

const PasswordField = ({ label, type, name, placeholder}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [field, meta] = useField({ type, name, placeholder });
    return (
        <Form invalid={meta.error && meta.touched} mb='6' lineClamp={1} label={label}>
            {/*<InputGroup>*/}
            
                <Field as={Input} {...field} type={showPassword ? 'text': type} name={name} placeholder={placeholder} invalid errorText={meta.error}>
                    
                </Field>
                <InputElement h='full'>
                    <Button variant='ghost' onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <LuEye /> : <LuEyeOff />}
                    </Button>
                </InputElement>
            {/*</InputGroup>*/}

        </Form>
    )
}

export default PasswordField;