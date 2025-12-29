import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/tasks/:id?userId=xxx - 특정 Task 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const searchParams = request.nextUrl.searchParams;
    const userIdParam = searchParams.get('userId');

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다' },
        { status: 400 }
      );
    }

    if (!userIdParam) {
      return NextResponse.json(
        { error: 'userId 파라미터가 필요합니다' },
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

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: task.id,
      text: task.text,
      done: task.done,
      userId: task.userId,
      createdAt: task.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Task 조회 오류:', error);
    return NextResponse.json(
      { error: 'Task 조회 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/:id - Task 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const { text, done, userId: userIdParam } = body;

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다' },
        { status: 400 }
      );
    }

    if (userIdParam === undefined || userIdParam === null) {
      return NextResponse.json(
        { error: 'userId는 필수입니다' },
        { status: 400 }
      );
    }

    const userId = typeof userIdParam === 'string' ? parseInt(userIdParam) : userIdParam;
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: '유효하지 않은 userId입니다' },
        { status: 400 }
      );
    }

    // Task 존재 및 소유권 확인
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Task를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 업데이트 데이터 준비
    const updateData: { text?: string; done?: boolean } = {};
    if (text !== undefined) updateData.text = text;
    if (done !== undefined) updateData.done = done;

    // Task 수정
    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      id: updatedTask.id,
      text: updatedTask.text,
      done: updatedTask.done,
      userId: updatedTask.userId,
      createdAt: updatedTask.createdAt.toISOString(),
    });
  } catch (error) {
    console.error('Task 수정 오류:', error);
    return NextResponse.json(
      { error: 'Task 수정 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/:id?userId=xxx - Task 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const searchParams = request.nextUrl.searchParams;
    const userIdParam = searchParams.get('userId');

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 ID입니다' },
        { status: 400 }
      );
    }

    if (!userIdParam) {
      return NextResponse.json(
        { error: 'userId 파라미터가 필요합니다' },
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

    // Task 존재 및 소유권 확인
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // Task 삭제
    await prisma.task.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Task 삭제 오류:', error);
    return NextResponse.json(
      { error: 'Task 삭제 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
