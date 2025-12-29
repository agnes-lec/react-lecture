import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { analyzeReceiptImage } from '@/lib/openai';

// POST /api/expenses/analyze - 영수증 이미지 분석
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const userIdParam = formData.get('userId') as string | null;

    // userId 검증
    if (!userIdParam) {
      return NextResponse.json(
        { error: 'userId가 필요합니다' },
        { status: 400 }
      );
    }

    const userId = parseInt(userIdParam);
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: '유효하지 않은 userId입니다' },
        { status: 400 }
      );
    }

    // 이미지 파일 검증
    if (!image) {
      return NextResponse.json(
        { error: '이미지 파일이 없습니다' },
        { status: 400 }
      );
    }

    // MIME 타입 검증
    const mimeType = image.type;
    if (!mimeType.startsWith('image/')) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드 가능합니다' },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (10MB 제한)
    const maxSize = 10 * 1024 * 1024;
    if (image.size > maxSize) {
      return NextResponse.json(
        { error: '파일 크기는 10MB 이하여야 합니다' },
        { status: 400 }
      );
    }

    console.log(`영수증 분석 시작: 파일명=${image.name}, 크기=${image.size} bytes, MIME=${mimeType}, userId=${userId}`);

    // 이미지를 Base64로 변환
    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString('base64');

    // OpenAI Vision API로 분석
    const analysisResult = await analyzeReceiptImage(base64Image, mimeType);

    console.log(`분석 결과: 상호명=${analysisResult.merchant}, 금액=${analysisResult.totalAmount}`);

    // DB에 저장 (userId 포함)
    const expense = await prisma.expense.create({
      data: {
        merchant: analysisResult.merchant,
        date: new Date(analysisResult.date),
        totalAmount: analysisResult.totalAmount,
        category: analysisResult.category,
        description: analysisResult.description,
        userId,
        items: {
          create: analysisResult.items.map((item) => ({
            name: item.name,
            amount: item.amount,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('영수증 분석 오류:', error);
    return NextResponse.json(
      { error: '영수증 분석 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
