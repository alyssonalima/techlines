import { Alert, Box, Button, Center, Container, Field, Heading, Stack, Text, VStack, useBreakpointValue } from "@chakra-ui/react"
import { Toaster, toaster } from '../components/ui/toaster';
import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useParams } from "react-router-dom";
import * as Yup from 'yup';
import PasswordField from "../components/PasswordField";
import { resetPassword, resetState } from "../redux/actions/userActions";
import { useTheme } from 'next-themes';

const PasswordResetScreen = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const { theme } = useTheme();
    
    const { loading, error, serverStatus, serverMsg } = useSelector((state) => state.user);

    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

    useEffect (() => {
        if (serverStatus && serverMsg) {
            toaster.create({
                title: `${serverMsg}`,
                type: 'success',
                action: {
                    label: "Close",
                    onClick: () => console.log("Toaster closed"),
                },
            });
            dispatch(resetState());
        }
    }, [error, serverMsg, serverStatus, dispatch])

    return (
        serverStatus ? (
            <Center minH='90vh'>
                <VStack>
                    <Text my='10' fontSize='xl'>
                        Your password has been updated successfully!
                    </Text>
                    <Button as={ReactLink} to='/login' variant='outline' colorScheme='cyan' w='300px'>
                        Log In
                    </Button>
                    <Button as={ReactLink} to='/products' variant='outline' colorScheme='cyan' w='300px'>
                        Products
                    </Button>
                </VStack>
            </Center>
        ) : (
            <>
            <Toaster />
            <Formik
                initialValues={{ password: '' }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .min(1, 'Password is too short - must contain at least 1 character.')
                        .required('Password is required.'),
                    confirmPassword: Yup.string()
                        .min(1, 'Password is too short - must contain at least 1 character.')
                        .required('Password is required.').oneOf([Yup.ref('password'), null], 'Password must match'), 
                })}
                onSubmit={(values) => {
                    dispatch(resetPassword(values.password, token));
                }}>
                {(formik) => (
                    <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
                        <Stack spacing='8'>
                            <Stack spacing='6'>
                                <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                                    <Heading size={headingBR}>
                                        Reset your password.
                                    </Heading>
                                </Stack>
                            </Stack>
                            <Box py={{ base: '0', md: '8' }} px={{ base: '4', md: '10' }} bg={ boxBR } boxShadow={{ base: 'none', md: 'xl' }}>
                                <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                                    {error && (
                                        <Alert.Root status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
                                            <Alert.Indicator />
                                            <Alert.Title>
                                                We are sorry!
                                            </Alert.Title>
                                            <Alert.Description fontSize='xl'>
                                                {error}
                                            </Alert.Description>
                                        </Alert.Root>
                                    )}
                                    <Stack spacing='5'>
                                        <Form>
                                            <Text py='2'>New Password</Text>
                                            <PasswordField type='password' name='password' placeholder='Your password' label='New Password' />
                                            <Text py='2'>Confirm your password</Text>
                                            <PasswordField type='password' name='confirmPassword' placeholder='Confirm your new password' label='Confirm your password' />
                                        </Form>
                                    </Stack>
                                    <Stack spacing='6' py='4'>
                                        <Button py='6' colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} size='lg' fontSize='md' loading={loading} type='submit'>
                                            Set new Password
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Container>
                )}
            </Formik>
            </>
        )
    )
}

export default PasswordResetScreen