import { getUserSessionId } from "@/lib/auth";
import Session from "@/models/sessionModel";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const sessionId = await getUserSessionId();
  try {
    await Session.findByIdAndDelete(sessionId);
    cookieStore.delete("sid");
  } catch (error) {
    console.log(error);
  }

  return new Response(null, {
    status: 204,
  });
}
