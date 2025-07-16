"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { registerSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Card, Heading, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/auth/users", data);
      setError("");
      router.push("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error || "Registration failed");
      } else {
        console.error("Registration failed:", error);
        setError("Failed to create user. Please try again.");
      }
    }
  });

  return (
    <Card className="min-w-[300px]">
      <Heading as="h2" size="4" className="pb-4 text-shadow-zinc-900">
        Register here
      </Heading>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="First name"
          type="text"
          {...register("firstName")}
        />
        <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Last name"
          type="text"
          {...register("lastName")}
        />
        <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
        <TextField.Root
          placeholder="E-mail"
          type="email"
          {...register("email")}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button variant="solid" color="violet" className="mt-4">
          Register
        </Button>
      </form>
    </Card>
  );
};

export default RegisterPage;
