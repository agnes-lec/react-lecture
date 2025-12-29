import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 데이터베이스 시딩 시작...');

  // 현재 날짜 기준으로 최근 날짜 생성
  const today = new Date();
  const daysAgo = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() - days);
    return date;
  };

  // 기존 데이터 삭제 (외래키 순서 고려)
  await prisma.task.deleteMany();
  await prisma.expenseItem.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.user.deleteMany();

  // 사용자 생성
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: '데모 사용자',
      role: '일반사용자',
      status: '활성',
    },
  });
  console.log(`✅ 사용자 생성: ${user1.email}`);

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: '관리자',
      role: '관리자',
      status: '활성',
    },
  });
  console.log(`✅ 사용자 생성: ${user2.email}`);

  // 지출 내역 생성 (최근 5일간의 데이터, userId로 User 연결)
  const expense1 = await prisma.expense.create({
    data: {
      merchant: '스타벅스',
      date: daysAgo(4),
      totalAmount: 15000,
      category: '식음료',
      description: '카페 음료 구매',
      userId: user1.id,
      items: {
        create: [
          { name: '아메리카노', amount: 5000 },
          { name: '라떼', amount: 6000 },
          { name: '케이크', amount: 4000 },
        ],
      },
    },
  });
  console.log(`✅ 지출 내역 생성: ${expense1.merchant} - ${expense1.totalAmount}원 (${user1.name})`);

  const expense2 = await prisma.expense.create({
    data: {
      merchant: '이마트',
      date: daysAgo(3),
      totalAmount: 45000,
      category: '쇼핑',
      description: '장보기',
      userId: user1.id,
      items: {
        create: [
          { name: '우유', amount: 3000 },
          { name: '빵', amount: 5000 },
          { name: '과일', amount: 15000 },
          { name: '채소', amount: 12000 },
          { name: '고기', amount: 10000 },
        ],
      },
    },
  });
  console.log(`✅ 지출 내역 생성: ${expense2.merchant} - ${expense2.totalAmount}원 (${user1.name})`);

  const expense3 = await prisma.expense.create({
    data: {
      merchant: '카카오택시',
      date: daysAgo(2),
      totalAmount: 12500,
      category: '교통',
      description: '택시 이용',
      userId: user1.id,
      items: {
        create: [
          { name: '기본요금', amount: 4800 },
          { name: '거리요금', amount: 7700 },
        ],
      },
    },
  });
  console.log(`✅ 지출 내역 생성: ${expense3.merchant} - ${expense3.totalAmount}원 (${user1.name})`);

  const expense4 = await prisma.expense.create({
    data: {
      merchant: '올리브영',
      date: daysAgo(1),
      totalAmount: 28000,
      category: '쇼핑',
      description: '화장품 구매',
      userId: user2.id,
      items: {
        create: [
          { name: '선크림', amount: 18000 },
          { name: '립밤', amount: 10000 },
        ],
      },
    },
  });
  console.log(`✅ 지출 내역 생성: ${expense4.merchant} - ${expense4.totalAmount}원 (${user2.name})`);

  const expense5 = await prisma.expense.create({
    data: {
      merchant: '맥도날드',
      date: today,
      totalAmount: 9500,
      category: '식음료',
      description: '점심 식사',
      userId: user2.id,
      items: {
        create: [
          { name: '빅맥세트', amount: 8000 },
          { name: '콜라', amount: 1500 },
        ],
      },
    },
  });
  console.log(`✅ 지출 내역 생성: ${expense5.merchant} - ${expense5.totalAmount}원 (${user2.name})`);

  // Task 생성 (userId로 User 연결)
  const task1 = await prisma.task.create({
    data: {
      text: '프로젝트 계획 수립',
      done: true,
      userId: user1.id,
    },
  });
  console.log(`✅ Task 생성: ${task1.text} (${user1.name})`);

  const task2 = await prisma.task.create({
    data: {
      text: 'API 개발',
      done: false,
      userId: user1.id,
    },
  });
  console.log(`✅ Task 생성: ${task2.text} (${user1.name})`);

  const task3 = await prisma.task.create({
    data: {
      text: '테스트 작성',
      done: false,
      userId: user2.id,
    },
  });
  console.log(`✅ Task 생성: ${task3.text} (${user2.name})`);

  console.log('');
  console.log('🎉 시딩 완료!');
  console.log(`   - 사용자: 2명`);
  console.log(`   - 지출 내역: 5건 (user1: 3건, user2: 2건)`);
  console.log(`   - Task: 3건 (user1: 2건, user2: 1건)`);
  console.log('');
  console.log('📝 로그인 정보:');
  console.log('   - 이메일: demo@example.com / 비밀번호: password123');
  console.log('   - 이메일: admin@example.com / 비밀번호: password123');
}

main()
  .catch((e) => {
    console.error('❌ 시딩 오류:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
