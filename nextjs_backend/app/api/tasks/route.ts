import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/tasks?userId=xxx - 사용자의 모든 Task 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId 파라미터가 필요합니다' },
        { status: 400 }
      );
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      tasks.map((task: { id: number; text: string; done: boolean; userId: string; createdAt: Date }) => ({
        id: task.id,
        text: task.text,
        done: task.done,
        userId: task.userId,
        createdAt: task.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error('Task 목록 조회 오류:', error);
    return NextResponse.json(
      { error: 'Task 목록 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Task 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, done, userId } = body;

    // 유효성 검증
    if (!userId) {
      return NextResponse.json(
        { error: 'userId는 필수입니다' },
        { status: 400 }
      );
    }

    if (!text || text.trim() === '') {
      return NextResponse.json(
        { error: 'text는 필수입니다' },
        { status: 400 }
      );
    }

    // Task 생성
    const task = await prisma.task.create({
      data: {
        text: text.trim(),
        done: done || false,
        userId,
      },
    });

    return NextResponse.json(
      {
        id: task.id,
        text: task.text,
        done: task.done,
        userId: task.userId,
        createdAt: task.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Task 생성 오류:', error);
    return NextResponse.json(
      { error: 'Task 생성 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

