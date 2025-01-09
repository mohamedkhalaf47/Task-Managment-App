import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    const { id } = params;
    if (!userId) {
      return NextResponse.json({msg:"Unauthorized", status: 401})
    };
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    console.log("Task Deleted: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR DELETING TASK",error)
    return NextResponse.json({error:"Error Deleting Task", status:500})
  }
}