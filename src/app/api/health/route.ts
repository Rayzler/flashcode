import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Intenta hacer una query simple
    await prisma.$queryRaw`SELECT 1`;

    // Si funciona, retorna status OK
    return NextResponse.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
      message: "Database connection successful ✅"
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        timestamp: new Date().toISOString(),
        message: "Database connection failed ❌",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
