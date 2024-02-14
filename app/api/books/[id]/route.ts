import { PrismaClient } from '@prisma/client'
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, 
    { params }: { params: {id: string }}) {

        const prisma = new PrismaClient();
        const id = params.id;

        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return NextResponse.json(book);
}

export async function PUT(request: NextRequest, 
    { params }: { params: {id: string }}) {

        const prisma = new PrismaClient();
        const id = params.id;
        const { title, author, publisher } = await request.json();

        await prisma.book.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                author,
                publisher
            }
        });

        return NextResponse.json({ message: "Book updated" });
}

export async function DELETE(request: NextRequest, 
    { params }: { params: {id: string }}) {

        const prisma = new PrismaClient();
        const id = params.id;

        await prisma.book.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json({ message: "Book deleted" });
}