import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Create workspace
  await prisma.workspace.create({
    data: {
      name: "Demo Workspace",
      userId: user.id
    }
  });

  // Activate trial
  await prisma.user.update({
    where: { id: user.id },
    data: {
      isTrial: true,
      trialEnds: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  });

  return new Response("Trial started", { status: 200 });
}
