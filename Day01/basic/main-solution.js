// ============================================================
// JavaScript 기본 문법 실습 - 솔루션 버전
// 설명: 모든 TODO 항목에 대한 예시 답안이 포함된 버전입니다.
// 실행: node main-solution.js 또는 Chrome DevTools Console에서 실행
// ============================================================

console.log("====== [Start] JavaScript 기본 문법 실습 (솔루션) ======\n");

// ==========================================
// 1. Hello, World!
// ==========================================
console.log("=== 1. Hello, World! ===");

// 기본 예제
console.log("Hello, World!");

// [솔루션] 1-1, 1-2
console.log("Hello, JavaScript!");
console.log("Hello, Agnes!");


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

// [솔루션] 2-1, 2-2
let myName = "Kim";
let myAge = 25;
let favoriteLanguage = "JavaScript";

console.log("myName:", myName, "type:", typeof myName);
console.log("myAge:", myAge, "type:", typeof myAge);
console.log("favoriteLanguage:", favoriteLanguage, "type:", typeof favoriteLanguage);

// [솔루션] 2-3 - const 재할당 시 에러
// PI = 3.14159; // → Uncaught TypeError: Assignment to constant variable.
console.log("const 변수는 재할당할 수 없습니다. (에러 발생)");


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

// [솔루션] 3-1, 3-2, 3-3
let favoriteColors = ["red", "blue", "green"];
console.log("favoriteColors:", favoriteColors);
console.log("첫 번째 색:", favoriteColors[0]);
console.log("마지막 색:", favoriteColors[favoriteColors.length - 1]);
console.log("범위 벗어난 인덱스[10]:", favoriteColors[10]); // undefined


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

// [솔루션] 4-1, 4-2, 4-3
let shoppingList = [];
shoppingList.push("apple");
shoppingList.push("milk");
shoppingList.push("bread");
shoppingList.push("eggs");
console.log("shoppingList after push:", shoppingList);

let removedItem = shoppingList.pop();
console.log("pop으로 제거된 항목:", removedItem);
console.log("pop 후 shoppingList:", shoppingList);

let foundIndex = shoppingList.indexOf("milk");
console.log('"milk" 인덱스:', foundIndex);

let notFoundIndex = shoppingList.indexOf("butter");
console.log('"butter" 인덱스:', notFoundIndex); // -1 (없음)


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

// [솔루션] 5-1
let x = 15;
let y = 4;
console.log("\n[5-1 솔루션] x = " + x + ", y = " + y);
console.log("x + y =", x + y);
console.log("x - y =", x - y);
console.log("x * y =", x * y);
console.log("x / y =", x / y);

// [솔루션] 5-2 - ==와 === 차이
console.log("\n[5-2 솔루션] == vs ===");
console.log("5 == '5' :", 5 == "5");    // true (값만 비교)
console.log("5 === '5':", 5 === "5");   // false (타입도 비교)
console.log("0 == false :", 0 == false);    // true
console.log("0 === false:", 0 === false);   // false

// [솔루션] 5-3 - 논리 연산자 조합
console.log("\n[5-3 솔루션] 논리 연산자 조합");
let isMorning = true;
let isSunday = false;
console.log("isMorning && !isSunday:", isMorning && !isSunday);       // true
console.log("isMorning || isSunday:", isMorning || isSunday);         // true
console.log("!isMorning && isSunday:", !isMorning && isSunday);       // false


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

// [솔루션] 6-1
console.log("\n[6-1 솔루션] 나이별 분류");
let age = 25;
if (age >= 0 && age <= 12) {
    console.log("child");
} else if (age >= 13 && age <= 19) {
    console.log("teen");
} else if (age >= 20) {
    console.log("adult");
}

// [솔루션] 6-2
console.log("[6-2 솔루션] 요일별 일정");
let dayOfWeek = "Mon";
if (dayOfWeek === "Mon" || dayOfWeek === "Wed" || dayOfWeek === "Fri") {
    console.log("study day");
} else {
    console.log("rest day");
}


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

// [솔루션] 7-1
console.log("\n[7-1 솔루션] 1부터 10까지의 합");
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log("합계:", sum); // 55

// [솔루션] 7-2
console.log("[7-2 솔루션] 5에서 1까지 거꾸로:");
let num = 5;
while (num >= 1) {
    console.log(num);
    num--;
}

// [솔루션] 7-3
console.log("[7-3 솔루션] favoriteColors 순회:");
for (let color of favoriteColors) {
    console.log("색깔:", color);
}


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

// [솔루션] 8-1, 8-2, 8-3
console.log("\n[8-1,2,3 솔루션] book 객체");
let book = {
    title: "Learning JavaScript",
    author: "Marijn Haverbeke",
    pages: 472,
    isRead: false
};

console.log("book 객체:", book);
console.log("제목:", book.title);
console.log("저자:", book.author);
console.log("페이지수:", book.pages);
console.log("읽음 여부:", book.isRead);

book.isRead = true;
console.log("읽음 여부 변경 후:", book);


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

// [솔루션] 9-1
console.log("\n[9-1 솔루션] max(a, b)");
function max(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}
console.log("max(10, 25) =", max(10, 25));
console.log("max(50, 30) =", max(50, 30));

// [솔루션] 9-2
console.log("[9-2 솔루션] describePerson");
function describePerson(name, age) {
    console.log(name + " is " + age + " years old.");
}
describePerson("Kim", 28);
describePerson("Lee", 22);

// [솔루션] 9-3
console.log("[9-3 솔루션] printColors");
function printColors(colors) {
    for (let color of colors) {
        console.log("I like " + color);
    }
}
printColors(favoriteColors);


// ==========================================
// 10. Pop-up Boxes (alert, confirm, prompt)
// ==========================================
console.log("\n=== 10. Pop-up Boxes ===");
console.log("※ 이 섹션은 실제로 팝업을 띄우므로 필요할 때만 주석을 해제해서 사용하세요.");

// [솔루션] 10-1
// alert("Welcome to JavaScript learning!");

// [솔루션] 10-2
// let isStudentConfirm = confirm("Are you a student?");
// if (isStudentConfirm) {
//     console.log("You are a student!");
// } else {
//     console.log("You are not a student.");
// }

// [솔루션] 10-3
// let userAge = prompt("What is your age?");
// if (userAge >= 18) {
//     console.log("adult");
// } else {
//     console.log("minor");
// }


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

// [솔루션] 11-1
console.log("[11-1 솔루션] 뺄셈 콜백");
function subtractCallback(a, b) {
    return a - b;
}
doMathOperation(10, 3, subtractCallback);

// [솔루션] 11-2
console.log("[11-2 솔루션] 익명 함수로 평균 계산");
doMathOperation(10, 20, function(a, b) {
    return (a + b) / 2;
});


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

// [솔루션] 12-1
console.log("\n[12-1 솔루션] 이름에 'Hello, ' 붙이기");
let names = ["Alice", "Bob", "Charlie"];
let greetings = names.map(name => "Hello, " + name);
console.log("names:", names);
console.log("greetings:", greetings);

// [솔루션] 12-2
console.log("[12-2 솔루션] 짝수 필터링");
let numbers2 = [1, 2, 3, 4, 5, 6];
let evenNumbers = numbers2.filter(n => n % 2 === 0);
console.log("numbers:", numbers2);
console.log("evenNumbers:", evenNumbers);

// [솔루션] 12-3
console.log("[12-3 솔루션] 화살표 함수 vs 일반 함수");
// 일반 함수
function addNormal(x, y) {
    return x + y;
}

// 화살표 함수
const addArrow = (x, y) => x + y;

console.log("일반 함수 결과:", addNormal(5, 3));
console.log("화살표 함수 결과:", addArrow(5, 3));
console.log("둘의 결과는 같습니다!");


// ==========================================
// 13. 종합 연습 (선택) - 자기소개 프로그램
// ==========================================
console.log("\n=== 13. 종합 연습 (선택) - 자기소개 프로그램 ===\n");

// [솔루션] 종합 예제
const person = {
    name: "Kim",
    age: 26,
    favoriteColors: ["blue", "green", "purple"]
};

function describePersonFull(personObj) {
    let ageCategory;
    
    if (personObj.age <= 12) {
        ageCategory = "child";
    } else if (personObj.age <= 19) {
        ageCategory = "teen";
    } else {
        ageCategory = "adult";
    }
    
    console.log(`${personObj.name}는(은) ${ageCategory}입니다. (나이: ${personObj.age})`);
}

describePersonFull(person);

console.log("\n선호하는 색깔들:");
person.favoriteColors.forEach((color) => {
    console.log(`- ${person.name} likes color ${color}`);
});

// 화살표 함수와 배열 메서드 활용
const colors = person.favoriteColors;
const colorStatements = colors.map(color => `${person.name} loves ${color}`);
console.log("\n색깔 선호도 (map 활용):");
colorStatements.forEach(statement => console.log(statement));

console.log("\n====== [End] 실습 종료 ======");
