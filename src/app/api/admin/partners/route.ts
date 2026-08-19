import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Partner from "../../../../models/Partner";

export async function GET() {
  try {
    await connectDB();
    const partners = await Partner.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: partners.length, data: partners });
  } catch (error: any) {
    console.error("Fetch admin partner requests error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch partner requests" }, { status: 500 });
  }
}
