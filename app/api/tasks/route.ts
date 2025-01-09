import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date: new Date(date).toISOString(),
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json({data: task});
  } catch (error:any) {
    console.error("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

export async function PUT(req:Request){  
  try {
    const { userId } = await auth();
    const { isCompleted, id } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const task = await prisma.task.update({
      where: {
        id,
      },
      data:{
        isCompleted,
      },
    });
    return NextResponse.json(task);
  } catch (error:any) {
    console.error("ERROR UPDATING YOUR TASK: ",error.message)
    return NextResponse.json({error: "Error Updating Task", status: 500})
  }
}