import React from 'react';

// [실습 4] AI에게 "이 컴포넌트의 보안 취약점을 찾고 고쳐줘"라고 요청하세요.
// Hint: dangerouslySetInnerHTML

const VulnerableComponent = ({ userContent }: { userContent: string }) => {
  return (
    <div className="comment-section">
      <h4>User Comment:</h4>
      {/* ❌ XSS 취약점 존재 구간 */}
      <div dangerouslySetInnerHTML={{ __html: userContent }} />
    </div>
  );
};

export default VulnerableComponent;
