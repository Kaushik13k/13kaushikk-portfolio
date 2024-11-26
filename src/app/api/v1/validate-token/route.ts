import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "../../../../../helpers/middleware";

export async function GET(request: NextRequest) {
  const isValid = verifySessionToken(request);

  if (!isValid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Token is valid" }, { status: 200 });
}
