import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
/* eslint-disable import/prefer-default-export */
export async function GET(request: NextRequest) {
  const requestBody = await request.json();

  if (requestBody.secret !== process.env.PATH_TOKEN) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  requestBody.path ||= "/";

  revalidatePath(requestBody.path);

  return NextResponse.json({ revalidated: true });
}
