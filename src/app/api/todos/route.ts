import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = +(searchParams.get("take") ?? "10"); //! Se utiliza '+' para parsear a numero el valor de take
  const skip = +(searchParams.get("skip") ?? "0"); //! +() === Number()
  if (isNaN(take)) {
    return NextResponse.json(
      { message: "Take tiene que ser un número" },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "Skip tiene que ser un número" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });
  return NextResponse.json(todos);
}
