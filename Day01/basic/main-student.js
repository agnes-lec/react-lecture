// ============================================================
// JavaScript 기본 문법 실습
// 설명: 각 섹션의 TODO를 완성하며 JavaScript 핵심 문법을 학습합니다.
// 실행: node main-student.js 또는 Chrome DevTools Console에서 실행
// ============================================================

console.log("====== [Start] JavaScript 기본 문법 실습 ======\n");

// ==========================================
// 1. Hello, World!
// ==========================================
console.log("=== 1. Hello, World! ===");

// 기본 예제
console.log("Hello, World!");

// TODO:
// 1-1) "Hello, JavaScript!" 메시지를 한 줄 더 출력해 보세요.
// 1-2) 자신의 이름을 포함한 인사말(예: "Hello, Alice!")을 출력해 보세요.


// ==========================================
// 2. Variables and Types (변수와 타입)
// ==========================================
console.log("\n=== 2. Variables and Types ===");

// let, const, typeof 연습
let userName = "Alice";
let userAge = 20;
let isStudent = true;
const PI = 3.14;

console.log("userName:", userName, "type:", typeof userName);
console.log("userAge:", userAge, "type:", typeof userAge);
console.log("isStudent:", isStudent, "type:", typeof isStudent);
console.log("PI:", PI, "type:", typeof PI);

// TODO:
// 2-1) 자신의 이름, 나이, 좋아하는 언어(favoriteLanguage)를 나타내는 변수를 선언하고 콘솔에 출력해 보세요.
// 2-2) 각 변수의 타입을 typeof 연산자로 함께 출력해 보세요.
// 2-3) const로 선언한 변수는 값을 바꾸면 에러가 나는지 실험해 보세요. (PI를 다른 값으로 재할당 해보기)


// ==========================================
// 3. Arrays (배열)
// ==========================================
console.log("\n=== 3. Arrays ===");

let numbers = [10, 20, 30];
let fruits = ["apple", "banana", "orange"];

console.log("numbers:", numbers);
console.log("first number:", numbers[0]);
console.log("fruits:", fruits);
console.log("second fruit:", fruits[1]);

// 배열 길이
console.log("numbers length:", numbers.length);
console.log("fruits length:", fruits.length);

// TODO:
// 3-1) 좋아하는 색깔 3개로 이루어진 배열 favoriteColors를 만들어 보세요.
// 3-2) favoriteColors의 첫 번째와 마지막 원소를 콘솔에 출력해 보세요.
// 3-3) 인덱스를 벗어난 위치를 출력하면 어떤 값이 나오는지 실험해 보세요. (예: favoriteColors[10])



// ==========================================
// 4. Manipulating Arrays (배열 조작)
// ==========================================
console.log("\n=== 4. Manipulating Arrays ===");

let todoList = ["study JS", "drink coffee"];
console.log("초기 todoList:", todoList);

// push, pop
todoList.push("walk");
console.log("push 후 todoList:", todoList);

let lastTodo = todoList.pop();
console.log("pop한 항목:", lastTodo);
console.log("pop 후 todoList:", todoList);

// unshift, shift
todoList.unshift("wake up");
console.log("unshift 후 todoList:", todoList);

let firstTodo = todoList.shift();
console.log("shift한 항목:", firstTodo);
console.log("shift 후 todoList:", todoList);

// indexOf
todoList.push("study JS");
let index = todoList.indexOf("study JS");
console.log('"study JS" index:', index);

// TODO:
// 4-1) 빈 배열 shoppingList를 만든 뒤, push로 3개 이상 항목을 추가해 보세요.
// 4-2) pop을 이용해 마지막 항목을 제거하고, 제거된 항목을 콘솔에 출력해 보세요.
// 4-3) indexOf로 특정 항목의 위치를 찾고, -1이 나오는 경우도 실험해 보세요.


// ==========================================
// 5. Operators (연산자)
// ==========================================
console.log("\n=== 5. Operators ===");

let a = 10;
let b = 3;

console.log("a + b =", a + b);
console.log("a - b =", a - b);
console.log("a * b =", a * b);
console.log("a / b =", a / b);
console.log("a % b =", a % b);
console.log("a ** b =", a ** b); // 거듭제곱

// 비교 연산자
console.log("a == '10' :", a == "10");   // 값만 비교
console.log("a === '10':", a === "10");  // 값 + 타입 비교
console.log("a > b:", a > b);
console.log("a <= b:", a <= b);

// 논리 연산자
let isAdult = true;
let hasTicket = false;
console.log("isAdult && hasTicket:", isAdult && hasTicket);
console.log("isAdult || hasTicket:", isAdult || hasTicket);
console.log("!isAdult:", !isAdult);

// TODO:
// 5-1) 임의의 숫자 두 개 x, y를 만들어 사칙연산 결과를 모두 출력해 보세요.
// 5-2) ==와 === 차이가 드러나는 예제를 직접 만들어 보세요.
// 5-3) &&, ||, !을 조합해 조건식을 2개 이상 만들어 보고 값을 출력해 보세요.


// ==========================================
// 6. Conditions (조건문)
// ==========================================
console.log("\n=== 6. Conditions ===");

let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// TODO:
// 6-1) 나이를 나타내는 변수 age를 만든 후,
//      0~12: "child", 13~19: "teen", 20 이상: "adult" 를 출력하는 if-else if-else 문을 작성해 보세요.
// 6-2) 요일(dayOfWeek) 변수를 하나 만들고(예: "Mon", "Tue" ...),
//      특정 요일에는 "study day", 다른 요일에는 "rest day"를 출력하는 조건문을 작성해 보세요.


// ==========================================
// 7. Loops (반복문)
// ==========================================
console.log("\n=== 7. Loops ===");

// for 문
console.log("for loop 예제:");
for (let i = 1; i <= 5; i++) {
    console.log("i =", i);
}

// while 문
console.log("while loop 예제:");
let count = 0;
while (count < 3) {
    console.log("count =", count);
    count++;
}

// for...of 문
console.log("for...of loop 예제:");
let languages = ["JavaScript", "Python", "Go"];
for (let lang of languages) {
    console.log("lang:", lang);
}

// TODO:
// 7-1) 1부터 10까지의 합을 구하는 for 문을 작성하고, 최종 합을 콘솔에 출력해 보세요.
// 7-2) while 문으로 5에서 1까지 거꾸로 출력하는 코드를 작성해 보세요. (5,4,3,2,1)
// 7-3) for...of를 사용해 favoriteColors 배열(3번에서 만든 것)을 순회하며 각 색을 출력해 보세요.


// ==========================================
// 8. Objects (객체)
// ==========================================
console.log("\n=== 8. Objects ===");

let user = {
    name: "Alice",
    age: 25,
    isAdmin: false,
    hobbies: ["reading", "coding"]
};

console.log("user object:", user);
console.log("user.name:", user.name);
console.log("user['age']:", user["age"]);
console.log("첫 번째 hobby:", user.hobbies[0]);

// 속성 추가/수정
user.email = "alice@example.com";
user.age = 26;
console.log("수정 후 user:", user);

// TODO:
// 8-1) book이라는 객체를 만들어 보세요.
//      title, author, pages, isRead(읽었는지 여부) 속성을 포함하도록 합니다.
// 8-2) book 객체를 콘솔에 출력하고, 각 속성을 개별적으로도 출력해 보세요.
// 8-3) isRead 값을 true로 바꾸고, 변경된 객체를 다시 출력해 보세요.


// ==========================================
// 9. Functions (함수)
// ==========================================
console.log("\n=== 9. Functions ===");

// 기본 함수 선언
function add(x, y) {
    return x + y;
}

let sumResult = add(3, 5);
console.log("add(3, 5) =", sumResult);

// 매개변수가 하나인 함수
function greet(name) {
    console.log("Hello,", name + "!");
}

greet("Alice");
greet("Bob");

// TODO:
// 9-1) 두 숫자를 입력받아(매개변수로) 더 큰 수를 반환하는 함수 max(a, b)를 만들어 보세요.
// 9-2) 이름과 나이를 받아 "OOO is XX years old."를 출력하는 함수 describePerson(name, age)를 만들어 보세요.
// 9-3) favoriteColors 배열을 받아, 각각의 색을 "I like OOO" 형식으로 출력하는 함수 printColors(colors)를 만들어 보세요.


// ==========================================
// 10. Pop-up Boxes (alert, confirm, prompt)
// ==========================================
console.log("\n=== 10. Pop-up Boxes ===");
console.log("※ 이 섹션은 실제로 팝업을 띄우므로 필요할 때만 주석을 해제해서 사용하세요.");

// 브라우저 팝업은 실행 시 사용자 경험에 영향을 주므로 예시는 기본적으로 주석 처리합니다.

// 예제 1: alert
// alert("Hello from alert!");

// 예제 2: confirm
// let isSure = confirm("Do you want to continue?");
// console.log("User clicked OK?", isSure);

// 예제 3: prompt
// let yourName = prompt("What is your name?");
// console.log("Your name is", yourName);

// TODO:
// 10-1) alert를 사용하여 페이지에 들어온 사용자에게 간단한 인사 메시지를 띄워 보세요.
// 10-2) confirm으로 "Are you a student?"를 물어보고, true / false에 따라
//       각각 다른 메시지를 콘솔에 출력해 보세요.
// 10-3) prompt로 사용자의 나이를 입력받아, 18세 이상이면 "adult", 아니면 "minor"를 콘솔에 출력해 보세요.


// ==========================================
// 11. Callbacks (콜백 함수)
// ==========================================
console.log("\n=== 11. Callbacks ===");

// 콜백을 받는 함수
function doMathOperation(x, y, callback) {
    let result = callback(x, y);
    console.log("Result:", result);
}

// 콜백 함수로 사용할 것들
function addCallback(a, b) {
    return a + b;
}

function multiplyCallback(a, b) {
    return a * b;
}

// 사용 예
doMathOperation(2, 3, addCallback);       // 2 + 3
doMathOperation(4, 5, multiplyCallback);  // 4 * 5

// TODO:
// 11-1) 두 숫자의 차이를 구하는 subtractCallback(a, b)를 만들고, doMathOperation으로 호출해 보세요.
// 11-2) 콜백을 익명 함수(anonymous function)로 직접 넘겨서 x와 y의 평균을 계산해 보세요.
//       예: doMathOperation(10, 20, function(a, b) { ... });


// ==========================================
// 12. Arrow Functions (화살표 함수)
// ==========================================
console.log("\n=== 12. Arrow Functions ===");

// 기본 형태
const multiply = (x, y) => {
    return x * y;
};

console.log("multiply(3, 4) =", multiply(3, 4));

// 한 줄로 쓸 때 (return 생략 가능)
const square = n => n * n;
console.log("square(5) =", square(5));

// 배열과 함께 사용 (map)
let nums = [1, 2, 3, 4, 5];
let squaredNums = nums.map(n => n * n);
console.log("nums:", nums);
console.log("squaredNums:", squaredNums);

// TODO:
// 12-1) 문자열 배열 names에서 각 이름에 "Hello, "를 붙여 새 배열을 만드는 arrow function을 작성해 보세요.
//       예: ["Alice", "Bob"] -> ["Hello, Alice", "Hello, Bob"]
// 12-2) numbers 배열에서 짝수만 필터링하는 arrow function을 filter와 함께 사용해 보세요.
//       예: [1,2,3,4,5,6] -> [2,4,6]
// 12-3) 화살표 함수와 일반 함수(function 키워드)의 문법 차이를 코드로 비교해 보세요.


// ==========================================
// 13. 종합 연습 (선택)
// ==========================================
console.log("\n=== 13. 종합 연습 (선택) ===");

// 종합 예제 아이디어 (직접 구현해 보세요):
// - 1) prompt로 이름과 나이를 입력받는다.
// - 2) 객체 person { name, age }를 만든다.
// - 3) 함수 describePerson(person)를 만들어,
//      나이에 따라 child/teen/adult를 판정하고 메시지를 콘솔에 출력한다.
// - 4) favoriteColors 배열을 추가로 만들어, for...of 또는 map을 사용해
//      "OOO likes color XXX" 형식으로 출력해 본다.

// TODO:
// 위 설명을 바탕으로 자신만의 작은 "자기 소개 프로그램"을 만들어 보세요.
// (함수, 조건문, 배열, 객체, 화살표 함수 등을 자유롭게 활용)

console.log("\n====== [End] 실습 종료 ======");
