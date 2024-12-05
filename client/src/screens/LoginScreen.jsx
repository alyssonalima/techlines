import { Alert, Box, Button, Container, Field as FormControl, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { Toaster, toaster } from '../components/ui/toaster';
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import PasswordField from "../components/PasswordField";
import PasswordForgottenForm from "../components/PasswordForgottenForm";
import TextField from "../components/TextField";
import { login, /*googleLogin*/ } from '../redux/actions/userActions';
//import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useTheme } from 'next-themes';

const LoginScreen = () => {
	const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = '/products';
    const { theme } = useTheme();

    const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
    const [showPasswordReset, setShowPasswordReset] = useState(false);

    useEffect(() => {
        if (userInfo) {
            if(location.state?.from){
                navigate(location.state.from);
            } else {
                navigate(redirect)
            }
            toaster.create({
                title: 'Cart has been updated.',
                type: 'success',
                action: {
                  label: "Close",
                  onClick: () => console.log("Toaster closed"),
                },
            });
        }

        if (serverMsg) {
            toaster.create({
                title: `${serverMsg}`,
                type: 'success',
                action: {
                  label: "Close",
                  onClick: () => console.log("Toaster closed"),
                },
            });
        }
    }, [userInfo, redirect, error, navigate, location.state, showPasswordReset, serverMsg]);

    /*const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${response.access_token}` },
				})
				.then((res) => res.data);
			const { sub, email, name, picture } = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		},
	});*/

    return (
        <>
        <Toaster />
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={Yup.object({
				email: Yup.string().email('Invalid email.').required('An email address is required.'),
				password: Yup.string()
					.min(1, 'Password is too short - must contain at least 1 character.')
					.required('Password is required.'),
			})}
			onSubmit={(values) => {
				dispatch(login(values.email, values.password));
			}}>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading fontSize={{ base: 'md', lg: 'xl' }}>Log in to your account</Heading>
								<HStack spacing='1' justify='center'>
									<Text>Don't have an account?</Text>
									<Button as={ReactLink} to='/registration' variant='link' colorPalette={theme === 'dark' ? 'yellow' : 'cyan'}>
										Sign up
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{ base: '0', md: '8' }}
							px={{ base: '4', md: '10' }}
							bg={{ base: 'transparent', md: 'bg-surface' }}
							boxShadow={{ base: 'none', md: 'xl' }}>
							<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
								{error && (
									<Alert
										status='error'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'
										title='We are sorry!'>
										{error}
									</Alert>
								)}
								<Stack spacing='5'>
									<Form>
                                        <Text py='2'>E-mail</Text>
										<TextField type='text' name='email' placeholder='you@example.com' label='E-mail' />
                                        <Text py='2'>Password</Text>
                                        <PasswordField py='6' type='password' name='password' placeholder='Your password' label='Password' />

										<Button
											my='2'
											onClick={() => setShowPasswordReset(!showPasswordReset)}
											size='sm'
											colorPalette={theme === 'dark' ? 'yellow' : 'cyan'}
											variant='outline'>
											Forgot Password?
										</Button>
										{showPasswordReset && <PasswordForgottenForm />}
									</Form>
								</Stack>
								<Stack spacing='6' py='4'>
									<Button colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} size='lg' fontSize='md' loading={loading} type='submit'>
										Sign in
									</Button>
									<Button
										leftIcon={<FcGoogle />}
										colorPalette={theme === 'dark' ? 'yellow' : 'cyan'}
										size='lg'
										fontSize='md'
										loading={loading}
										/*onClick={() => handleGoogleLogin()}*/>
										Google sign in
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
        </>
	);
}

export default LoginScreen