import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Partner from "../../../models/Partner";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, mobile, location, message } = body;

    if (!name || !email || !mobile || !location || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const partner = await Partner.create({
      name,
      email,
      mobile,
      location,
      message,
    });

    return NextResponse.json({ success: true, data: partner }, { status: 201 });
  } catch (error: any) {
    console.error("Partner request submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit partner request" }, { status: 500 });
  }
}
