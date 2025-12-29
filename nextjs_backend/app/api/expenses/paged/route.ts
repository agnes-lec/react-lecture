import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/expenses/paged?page=0&size=10 - 페이지네이션 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let page = parseInt(searchParams.get('page') || '0');
    let size = parseInt(searchParams.get('size') || '10');

    // 유효성 검증
    if (page < 0) page = 0;
    if (size < 1) size = 10;
    if (size > 100) size = 100;

    // 병렬로 데이터와 카운트 조회
    const [expenses, totalElements] = await Promise.all([
      prisma.expense.findMany({
        include: {
          items: true,
        },
        orderBy: {
          createdAt: 'desc', // 등록 순서 내림차순
        },
        skip: page * size,
        take: size,
      }),
      prisma.expense.count(),
    ]);

    const totalPages = Math.ceil(totalElements / size);

    // 응답 형식 변환
    const content = expenses.map((expense) => ({
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

    return NextResponse.json({
      content,
      page,
      size,
      totalElements,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1,
      numberOfElements: content.length,
      empty: content.length === 0,
    });
  } catch (error) {
    console.error('페이지네이션 조회 오류:', error);
    return NextResponse.json(
      { error: '지출 내역 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

