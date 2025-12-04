# HTML/CSS 실습 파일

이 폴더는 React 컴포넌트를 배우기 전에 순수 HTML과 CSS로 틱택토 게임 UI를 구현한 실습 파일입니다.

## 파일 구조

```
practice/
├── index.html      # HTML 구조
├── styles.css      # CSS 스타일
└── README.md       # 이 파일
```

## 사용 방법

1. `index.html` 파일을 브라우저에서 직접 열기
2. 또는 로컬 서버로 실행:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   ```

## React 컴포넌트와의 비교

### HTML 구조
```html
<!-- HTML 버전 -->
<div class="app">
  <div class="container">
    <h1 class="title">...</h1>
    <div class="game">
      <div class="board">
        <button class="square"></button>
        <!-- 9개 반복 -->
      </div>
    </div>
  </div>
</div>
```

### React 컴포넌트 구조
```jsx
// React 버전
<App>
  <Game>
    <Board>
      <Square /> × 9
    </Board>
  </Game>
</App>
```

