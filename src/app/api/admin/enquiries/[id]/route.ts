import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Enquiry from "../../../../../models/Enquiry";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });
    }

    await connectDB();
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error: any) {
    console.error("Delete enquiry error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete enquiry" }, { status: 500 });
  }
}
