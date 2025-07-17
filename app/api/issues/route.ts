import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


// Create a new issue
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id || isNaN(Number(session.user.id))) {
    return NextResponse.json(
      { error: "User ID is missing or invalid." },
      { status: 401 }
    );
  }
  
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      User: { connect: { id: Number(session.user.id) } },
    },
  });
  
  return NextResponse.json(newIssue, { status: 201 });
}

// Get issues
export async function GET(request: NextRequest) {
  // const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const issues = await prisma.issue.findMany({
    where: userId ? { userId: Number(userId) } : {},
    orderBy: { createdAt: "desc" },
    include: { User: { select: { firstName: true, lastName: true } } },
  });
  return NextResponse.json(issues, { status: 200 });
}
