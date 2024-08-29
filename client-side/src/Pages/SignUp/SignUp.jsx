import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/Axios";
import { routers } from "../../constants/Routers";

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("auth/signup", data);
      toast({
        title: "Signup successful!",
        description: "You have successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      navigate(routers.HOME);
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box
      w="100%"
      maxW="500px"
      mx="auto"
      mt="50px"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Heading as="h1" mb="6" textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl id="firstName" isInvalid={errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <Text color="red.500">{errors.firstName.message}</Text>
            )}
          </FormControl>

          <FormControl id="lastName" isInvalid={errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <Text color="red.500">{errors.lastName.message}</Text>
            )}
          </FormControl>

          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email ID</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </FormControl>

          <FormControl id="mobile" isInvalid={errors.mobile}>
            <FormLabel>Mobile No</FormLabel>
            <Input
              type="number"
              placeholder="Enter your mobile number"
              {...register("mobile", { required: "Mobile number is required" })}
            />
            {errors.mobile && (
              <Text color="red.500">{errors.mobile.message}</Text>
            )}
          </FormControl>

          <FormControl id="role" isInvalid={errors.role}>
            <FormLabel>Role</FormLabel>
            <Select
              placeholder="Select your role"
              {...register("role", { required: "Role is required" })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </Select>
            {errors.role && <Text color="red.500">{errors.role.message}</Text>}
          </FormControl>

          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Sign Up
          </Button>

          <Text textAlign="center">
            Already have an account?{" "}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={() => navigate(routers.LOGIN)}
            >
              Login
            </Button>
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUp;
