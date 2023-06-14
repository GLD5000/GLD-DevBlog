import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(
  req: Request,
  context: { [key: string]: { [key: string]: string } }
) {
  const pathIn = context.params.path;
  const path = pathIn ? `/${pathIn}/` : "/";
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
