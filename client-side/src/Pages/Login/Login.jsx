import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../Api/Axios';
import { routers } from '../../constants/Routers';

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('auth/login', data);
      toast({
        title: 'Login successful!',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:'top-right'
      });
      navigate(routers.HOME);
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.message || 'Invalid email or password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:'top-right'
      });
    }
  };

  return (
    <Box w="100%" maxW="500px" mx="auto" mt="50px" p="4" borderWidth="1px" borderRadius="lg">
      <Heading as="h1" mb="6" textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <Text color="red.500">{errors.email.message}</Text>}
          </FormControl>

          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <Text color="red.500">{errors.password.message}</Text>}
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>

          <Text textAlign="center">
            Don't have an account?{' '}
            <Button variant="link" colorScheme="blue" onClick={() => navigate(routers.SIGNUP)}>
              Sign Up
            </Button>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
