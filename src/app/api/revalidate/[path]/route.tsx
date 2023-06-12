import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: Request,context: {[key:string]: {[key:string]: string}}) {
  const pathIn = context.params.path;
  const path  = pathIn? `/${pathIn}/`: '/';
  console.log('path:', path);
  //   const path = request.nextUrl.searchParams.get('path') || '/'
  //   revalidatePath(path);
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
