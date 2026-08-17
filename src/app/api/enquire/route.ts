import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Enquiry from "../../../models/Enquiry";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, mobile, message } = body;

    // Validate mandatory fields
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!mobile || !mobile.trim()) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    // Connect to database
    await connectDB();

    // Create enquiry
    const newEnquiry = new Enquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      message: message ? message.trim() : "",
    });

    await newEnquiry.save();

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully", data: newEnquiry }, { status: 201 });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit enquiry" }, { status: 500 });
  }
}
