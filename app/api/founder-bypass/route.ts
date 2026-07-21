import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { key } = await request.json();

    if (!key) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    // Check if the provided key matches the environment variable
    if (key === process.env.FOUNDERS_API_KEY) {
      // Issue a bypass cookie valid for 30 days
      const cookieStore = await cookies();
      cookieStore.set("founder_bypass", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      return NextResponse.json({ success: true, message: "Founder access granted. All payments bypassed." });
    }

    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
