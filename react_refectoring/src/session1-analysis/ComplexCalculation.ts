// [실습 1] AI에게 이 코드를 주고 "문제점 분석 및 리팩토링"을 요청하세요.
// Prompt: "이 함수의 시간 복잡도 문제와 가독성 문제를 분석하고, 개선된 코드를 제안해줘."

export const processUserData = (users: any[], orders: any[]) => {
  let results = [];
  // ❌ Bad Practice: 이중 루프, Any 타입, 모호한 변수명
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < orders.length; j++) {
      if (users[i].id == orders[j].userId) {
        if (orders[j].status === 'completed' || orders[j].status === 'shipped') {
          let total = 0;
          for (let k = 0; k < orders[j].items.length; k++) {
            total += orders[j].items[k].price;
          }
          if (total > 10000) {
            results.push({
              u: users[i].name,
              o: orders[j].id,
              t: total
            });
          }
        }
      }
    }
  }
  return results;
};