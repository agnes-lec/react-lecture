/**
 * Upload 페이지 컴포넌트 (UI 전용)
 * 
 * 영수증 이미지를 업로드하고 AI로 분석하는 페이지입니다.
 * UI 전용 프로젝트이므로 실제 업로드 기능은 없습니다.
 * 
 * 실습: 실제 업로드 API를 연결하여 기능을 구현하세요.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('이미지 파일만 업로드 가능합니다.');
        setFile(null);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    // UI 전용: 실제 업로드 기능 없음
    // 실습: API를 호출하여 실제 업로드 기능을 구현하세요
    setTimeout(() => {
      setLoading(false);
      console.log('업로드 시도:', file.name);
      alert('실습: 업로드 API를 연결하여 실제 업로드 기능을 구현하세요!');
      // setSuccess(true);
      // setTimeout(() => navigate('/'), 2000);
    }, 1500);
  }

  return (
    <div className="upload">
      <h1>영수증 업로드</h1>
      
      <div className="upload-container">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-input-wrapper">
            <label htmlFor="file-upload" className="file-label">
              {file ? file.name : '이미지 파일 선택'}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              disabled={loading}
            />
          </div>

          {file && (
            <div className="preview-container">
              <img
                src={URL.createObjectURL(file)}
                alt="미리보기"
                className="preview-image"
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          
          {success && (
            <div className="success-message">
              업로드 성공! 대시보드로 이동합니다...
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={!file || loading}
          >
            {loading ? '분석 중...' : 'AI 분석 및 등록'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;

