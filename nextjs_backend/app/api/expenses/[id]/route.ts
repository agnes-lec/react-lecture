import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/expenses/:id - 지출 내역 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다' },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!expense) {
      return NextResponse.json(
        { error: '지출 내역을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: expense.id,
      merchant: expense.merchant,
      date: expense.date.toISOString(),
      totalAmount: expense.totalAmount,
      category: expense.category,
      description: expense.description,
      items: expense.items.map((item) => ({
        id: item.id,
        name: item.name,
        amount: item.amount,
      })),
      createdAt: expense.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('지출 내역 조회 오류:', error);
    return NextResponse.json(
      { error: '지출 내역 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// DELETE /api/expenses/:id - 지출 내역 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다' },
        { status: 400 }
      );
    }

    // 존재 여부 확인
    const expense = await prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      return NextResponse.json(
        { error: '지출 내역을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 삭제 (cascade로 items도 함께 삭제됨)
    await prisma.expense.delete({
      where: { id },
    });

    return NextResponse.json({
      message: '지출 내역이 삭제되었습니다',
    });
  } catch (error) {
    console.error('지출 내역 삭제 오류:', error);
    return NextResponse.json(
      { error: '지출 내역 삭제 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
