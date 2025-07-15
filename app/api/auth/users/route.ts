import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { registerSchema } from "@/app/validationSchemas";
import { hash } from "bcrypt";

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

// export async function GET() {
//   const issues = await prisma.issue.findMany({
//     orderBy: { createdAt: "desc" },
//     include: { User: { select: { firstName: true, lastName: true } } },
//   });
//   return NextResponse.json(issues, { status: 200 });
// }
