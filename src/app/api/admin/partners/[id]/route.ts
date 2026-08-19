import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Partner from "../../../../../models/Partner";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const partner = await Partner.findByIdAndDelete(id);

    if (!partner) {
      return NextResponse.json({ error: "Partner request not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Partner request deleted successfully" });
  } catch (error: any) {
    console.error("Delete partner request error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete partner request" }, { status: 500 });
  }
}
