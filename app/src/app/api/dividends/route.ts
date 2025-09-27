import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '../../../lib/auth';
import { db } from '../../../lib/db';
import { dividends, properties, propertyTokens } from '../../../db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { successResponse, errorResponse } from '../../../lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    const status = searchParams.get('status'); // 'pending', 'paid', 'cancelled'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query = db
      .select({
        id: dividends.id,
        propertyTokenId: dividends.propertyTokenId,
        amount: dividends.amount,
        distributionDate: dividends.distributionDate,
        status: dividends.status,
        description: dividends.description,
        property: {
          id: properties.id,
          name: properties.title,
        },
      })
      .from(dividends)
      .leftJoin(propertyTokens, eq(dividends.propertyTokenId, propertyTokens.id))
      .leftJoin(properties, eq(propertyTokens.propertyId, properties.id));
    
    // Apply filters
    if (propertyId) {
      query = query.where(eq(propertyTokens.propertyId, propertyId)) as any;
    }
    
    if (status) {
      query = query.where(eq(dividends.status, status)) as any;
    }
    
    const dividendRecords = await query
      .orderBy(desc(dividends.id))
      .limit(limit)
      .offset(offset);
    
    return NextResponse.json(successResponse(dividendRecords));
  } catch (error) {
    console.error('Error fetching dividends:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch dividends'),
      { status: 500 }
    );
  }
}

const createDividendSchema = z.object({
  propertyTokenId: z.string().uuid('Property token ID must be a valid UUID'),
  amount: z.number().positive('Amount must be positive'),
  distributionDate: z.string().datetime('Distribution date must be a valid datetime'),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    
    const body = await request.json();
    const validatedData = createDividendSchema.parse(body);
    
    // Verify property token exists
    const [propertyToken] = await db
      .select()
      .from(propertyTokens)
      .where(eq(propertyTokens.id, validatedData.propertyTokenId))
      .limit(1);
    
    if (!propertyToken) {
      return NextResponse.json(
        errorResponse('Property token not found'),
        { status: 404 }
      );
    }
    
    // Create dividend record
    const [dividend] = await db
      .insert(dividends)
      .values({
        propertyTokenId: validatedData.propertyTokenId,
        amount: validatedData.amount.toString(),
        distributionDate: new Date(validatedData.distributionDate),
        status: 'scheduled',
        description: validatedData.description || null,
      })
      .returning();
    
    return NextResponse.json(
      successResponse(dividend, 'Dividend created successfully'),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        errorResponse('Validation error'),
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json(
        errorResponse('Forbidden - Admin access required'),
        { status: 403 }
      );
    }
    
    console.error('Error creating dividend:', error);
    return NextResponse.json(
      errorResponse('Failed to create dividend'),
      { status: 500 }
    );
  }
}