import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Enquiry from "../../../../models/Enquiry";

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    console.error("Fetch enquiries error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch enquiries" }, { status: 500 });
  }
}
