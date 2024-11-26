import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );
  response.cookies.set("session_token", "", { maxAge: 0, path: "/" });
  return response;
}
