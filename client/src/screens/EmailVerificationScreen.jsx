import React, { useEffect } from 'react';
import { useParams, Link as ReactLink } from 'react-router-dom';
import { verifyEmail } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { AbsoluteCenter, Box, Alert, Text, Spinner, Button, HStack } from '@chakra-ui/react';
import { useTheme } from 'next-themes';

const EmailVerificationScreen = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.user);
    const { theme } = useTheme();

    useEffect(() => {
        dispatch(verifyEmail(token));
    }, [token, dispatch]);
        
    return (
        <HStack wrap='wrap' spacing='30px' justify='center' minHeight='50vh'>
                { loading ? (
                    <Box textAlign='center'>
                        <Text fontSize='3xl'>
                            We are working on verifying your e-mail.
                        </Text>
                        <Spinner size='xl' />
                    </Box>
                ) : error === null ? (
                    <Alert.Root bg='parent' status='success' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
                        <Alert.Indicator boxSize='16' size='xl'/>
                        <Alert.Title>
                            Thanks for verifying your e-mail.
                        </Alert.Title>
                        <Alert.Description fontSize='xl'>
                            You can close this window now!
                        </Alert.Description>
                    </Alert.Root>
                ) : (
                    <Alert.Root bg='parent' status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
                        <Alert.Indicator boxSize='16' size='xl'/>
                        <Alert.Title>
                            We are sorry!
                        </Alert.Title>
                        <Alert.Description fontSize='xl'>
                            {error}
                        </Alert.Description>
                    </Alert.Root>
                )}
                { !loading && (
                    <Button colorPalette={theme === 'dark' ? 'yellow' : 'cyan'} as={ReactLink} to='/products' p='1' size='lg' minW='300px'>
                        Continue shopping
                    </Button>
                )}
        </HStack>
    )
}

export default EmailVerificationScreen;