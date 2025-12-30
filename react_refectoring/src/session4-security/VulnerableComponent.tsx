import DOMPurify from 'dompurify';

// ============================================================
// 보안 취약점 분석 결과
// ============================================================
// 취약점: XSS (Cross-Site Scripting)
// 위험도: Critical
// 원인: dangerouslySetInnerHTML로 사용자 입력을 직접 렌더링
// 해결: DOMPurify로 HTML sanitization 적용
// ============================================================

// 허용할 HTML 태그와 속성 화이트리스트 설정
const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'title', 'target'],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
};

interface SecureContentProps {
  userContent: string;
  allowHtml?: boolean; // HTML 렌더링 허용 여부
}

// ✅ 옵션 A: HTML 렌더링이 필요 없는 경우 (가장 안전)
const SafeTextComponent = ({ userContent }: { userContent: string }) => {
  return (
    <div className="comment-section">
      <h4>User Comment:</h4>
      {/* ✅ React가 자동으로 이스케이프 처리 */}
      <div className="comment-content">{userContent}</div>
    </div>
  );
};

// ✅ 옵션 B: HTML 렌더링이 필요한 경우 (DOMPurify로 sanitize)
const SafeHtmlComponent = ({ userContent }: { userContent: string }) => {
  // DOMPurify로 악성 스크립트 제거
  const sanitizedContent = DOMPurify.sanitize(userContent, SANITIZE_CONFIG);

  return (
    <div className="comment-section">
      <h4>User Comment:</h4>
      {/* ✅ Sanitize된 HTML만 렌더링 */}
      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};

// ✅ 옵션 C: 통합 컴포넌트 (권장)
const SecureComponent = ({ userContent, allowHtml = false }: SecureContentProps) => {
  // HTML 허용 여부에 따라 다른 렌더링 방식 적용
  const renderContent = () => {
    if (!allowHtml) {
      // 일반 텍스트로 렌더링 (가장 안전)
      return <div className="comment-content">{userContent}</div>;
    }

    // HTML 렌더링 필요시 반드시 sanitize
    const sanitizedContent = DOMPurify.sanitize(userContent, SANITIZE_CONFIG);
    return (
      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  };

  return (
    <div className="comment-section">
      <h4>User Comment:</h4>
      {renderContent()}
    </div>
  );
};

// 기본 export는 가장 안전한 버전
export default SecureComponent;

// 개별 컴포넌트도 export
export { SafeTextComponent, SafeHtmlComponent, SecureComponent };