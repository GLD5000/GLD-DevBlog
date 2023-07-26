/* Core */
import { NextResponse } from "next/server";

/* eslint-disable import/prefer-default-export */

export async function POST(req: Request) {
  const body = await req.json();
  const { amount = 1 } = body;

  // simulate IO latency

  // return NextResponse.json({ data: amount });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json({ data: amount }));
    }, 500); // delay for 500 ms
  });
}
