import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

export default function MessageInputPage({ addMessage }) {
  const [messageText, setMessageText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (messageText.trim() !== '') {
      addMessage(messageText); // 메시지를 추가하는 함수 호출
      setMessageText(''); // 입력 필드 초기화
      navigate('/piggy-bank'); // 저금통 화면으로 이동
    }
  };

  return (
    <MessageInputContainer>
      <h2>메시지 입력</h2>
      <TextInput
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
    </MessageInputContainer>
  );
}

// 스타일 컴포넌트
const MessageInputContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #f08;
  color: white;
  border: none;
  cursor: pointer;
`;
