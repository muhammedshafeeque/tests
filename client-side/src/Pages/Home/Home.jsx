import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  TableContainer,
  Input,
  Select,
  Flex,
} from "@chakra-ui/react";
import axios from "../../Api/Axios";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { routers } from "../../constants/Routers";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("user/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error fetching users",
          description: error.response?.data?.message || "Something went wrong!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  const handleLogout = () => {
    navigate(routers.LOGIN);
  };

  const filteredUsers = users
    .filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.mobile}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((user) =>
      selectedRole ? user.role === selectedRole : true
    );

  if (loading) {
    return (
      <Box w="100%" maxW="500px" mx="auto" mt="50px" p="4" textAlign="center">
        <Spinner size="xl" />
        <Box mt="4">Loading users...</Box>
      </Box>
    );
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <Box w="100%" mx="auto" mt="50px" p="4">
        <Heading as="h2" mb="6" textAlign="center">
          Users List
        </Heading>

        

        <TableContainer mr={"10%"} ml={"10%"}>
        <Flex mb="2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr="4"
            maxW="300px"
          />
          <Select
            placeholder="Filter by role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            maxW="200px"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </Select>
        </Flex>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email ID</Th>
                <Th>Mobile No</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.mobile}</Td>
                  <Td>{user.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Home;
