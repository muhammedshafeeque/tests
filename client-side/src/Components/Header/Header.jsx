import React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

const Header = ({ onLogout }) => {
  return (
    <Box bg="blue.500" p="4" boxShadow="md">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Heading as="h1" size="lg" color="white">
          Assignment
        </Heading>
        <Button colorScheme="red" onClick={onLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
