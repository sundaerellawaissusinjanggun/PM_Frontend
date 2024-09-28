import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Coin from '/coin.svg';

export default function PiggyBankMessages({ messages }) {
  return (
    <MessageContainer>
      {messages.map((message) => (
        <Message key={message.id} message={message.text} />
      ))}
    </MessageContainer>
  );
}

function Message({ message }) {
  const randomX = Math.random() * 80;
  const randomY = Math.random() * 80;

  return (
    <MessageWrapper style={{ top: `${randomY}%`, left: `${randomX}%` }}>
      <CoinImageStyled src={Coin} alt="Coin" />
      <MessageText>{message}</MessageText>
    </MessageWrapper>
  );
}

const MessageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px;
  border: 2px solid #ccc;
`;
const MessageWrapper = styled.div`
  /* border: 3px solid red; */
  position: absolute; // 자유롭게 배치하기 위해 position: absolute 사용
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100px;
  height: 100px;
`;
const CoinImageStyled = styled.img`
  width: 50px;
  height: 50px;
`;
const MessageText = styled.p`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  text-align: center;
`;
