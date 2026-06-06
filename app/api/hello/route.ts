import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const currentOS = {
    name: os.type(),
    architecture: os.arch(),
    platform: os.platform(),
    release: os.release(),
    version: os.version(),
  };

  return NextResponse.json(currentOS);
}
