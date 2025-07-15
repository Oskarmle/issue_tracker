"use client";
import { loginSchema } from "@/app/validationSchemas";
import { Card, Heading, TextField, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = handleSubmit(async (data) => {
    // Handle login logic here
    console.log("Login data:", data);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/issues/new",
    });
  });

  return (
    <Card className="min-w-[300px]">
      <Heading as="h2" size="4" className="pb-4">
        Login here
      </Heading>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="email"
          type="email"
          {...register("email")}
        />
        <TextField.Root
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <Button variant="solid" color="violet" className="mt-4">
          Login
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-500 flex justify-between">
        Don&#39;t have an account?{" "}
        <Link href="/auth/register" className="text-blue-500">
          Register here
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage;
