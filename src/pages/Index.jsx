import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, useToast, VStack, Heading, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaDumbbell } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-nrxm.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
      toast({
        title: "Login successful",
        description: "You are now logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-nrxm.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      toast({
        title: "Signup successful",
        description: "You can now login.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSpendGold = async () => {
    try {
      const response = await fetch("https://backengine-nrxm.fly.dev/spendGoldOnTraining", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to spend gold");
      }

      toast({
        title: "Training successful",
        description: "You have successfully spent gold on training.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Training failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <VStack spacing={4}>
        <Heading>Welcome to Gold Training</Heading>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
        <Button leftIcon={<FaUserPlus />} colorScheme="blue" onClick={handleSignup}>
          Signup
        </Button>
        {accessToken && (
          <Box>
            <Text>You are logged in!</Text>
            <Button leftIcon={<FaDumbbell />} colorScheme="green" onClick={handleSpendGold}>
              Spend Gold on Training
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
