import {Text, Tack, Box, Button, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendResetEmail } from "../redux/actions/userActions";
import { useTheme } from "next-themes";

const PasswordForgottenForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const handleChange = (event) => {
        setEmail(event.target.value);
    };
    const { theme } = useTheme();

    return (
        <>
            <Box my='4'>
                <Text as='b'>Enter your e-mail address below.</Text>
                <Text>We'll send you and e-mail with a link to reset your password.</Text>
            </Box>
            <Stack>
                <Input mb='4' type='text' name='email' placeholder='Your E-mail Address' label='Email' value={email} onChange={(e) => handleChange(e)} />
                <Button colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} fontSize='md' onClick={() => dispatch(sendResetEmail(email))}>
                    Send reset password e-mail
                </Button>
                
            </Stack>
        </>
    )
}

export default PasswordForgottenForm;