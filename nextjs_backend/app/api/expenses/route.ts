import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/expenses - 모든 지출 내역 조회
export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc', // 등록 순서 내림차순
      },
    });

    // 응답 형식 변환
    const response = expenses.map((expense) => ({
      id: expense.id,
      merchant: expense.merchant,
      date: expense.date.toISOString(),
      totalAmount: expense.totalAmount,
      category: expense.category,
      description: expense.description,
      userId: expense.userId,
      items: expense.items.map((item) => ({
        id: item.id,
        name: item.name,
        amount: item.amount,
      })),
      createdAt: expense.createdAt.toISOString(),
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error('지출 내역 조회 오류:', error);
    return NextResponse.json(
      { error: '지출 내역 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

