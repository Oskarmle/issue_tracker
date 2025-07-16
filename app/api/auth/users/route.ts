import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { registerSchema } from "@/app/validationSchemas";
import { hash } from "bcrypt";
import { getToken } from "next-auth/jwt";

// Create a new user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = registerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { firstName, lastName, email, password } = body;
  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword, // ✅ store hashed password
      },
    });

    return NextResponse.json(newUser, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Email may already be in use" },
      { status: 400 }
    );
  }
}

// Get the current users info based on the token
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: Number(token.id) },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return NextResponse.json(user);
}
