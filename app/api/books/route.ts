import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();

  const books = await prisma.book.findMany();

  return NextResponse.json(books);
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();

  const { title, author, publisher } = await request.json();
  await prisma.book.create({
    data: {
      title,
      author,
      publisher
    }
  })
  
  return NextResponse.json({ message: "Book created" });
}
