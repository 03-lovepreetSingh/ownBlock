import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { kycRecords } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { successResponse, errorResponse } from "@/lib/api-response";

const kycSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  documentType: z.enum(["passport", "drivers_license", "national_id"]),
  documentNumber: z.string().min(1, "Document number is required"),
  documentFrontImage: z
    .string()
    .url("Document front image must be a valid URL"),
  documentBackImage: z
    .string()
    .url("Document back image must be a valid URL")
    .optional(),
  selfieImage: z.string().url("Selfie image must be a valid URL"),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validatedData = kycSchema.parse(body);

    // Check if user already has a KYC record
    const existingKyc = await db
      .select()
      .from(kycRecords)
      .where(eq(kycRecords.userId, user.id))
      .limit(1);

    if (existingKyc.length > 0) {
      return NextResponse.json(
        errorResponse("KYC record already exists for this user"),
        { status: 400 }
      );
    }

    // Create new KYC record
    const [kycRecord] = await db
      .insert(kycRecords)
      .values({
        userId: user.id,
        firstName: validatedData.fullName.split(' ')[0],
        lastName: validatedData.fullName.split(' ').slice(1).join(' ') || '',
        dateOfBirth: new Date(validatedData.dateOfBirth),
        nationality: validatedData.nationality,
        documentType: validatedData.documentType,
        documentId: validatedData.documentNumber,
        documentUrl: validatedData.documentFrontImage,
        selfieUrl: validatedData.selfieImage,
        submittedAt: new Date(),
      })
      .returning();

    return NextResponse.json(
      successResponse(kycRecord, "KYC application submitted successfully"),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse("Validation error", error.issues),
        { status: 400 }
      );
    }

    console.error("Error submitting KYC:", error);
    return NextResponse.json(
      errorResponse("Failed to submit KYC application"),
      { status: 500 }
    );
  }
}
