// src/components/Header.js
import React from 'react';

export default function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Ứng dụng Tra cứu Điểm THPT</h1>
    </header>
  );
}

const headerStyle = {
  height: '60px',
  backgroundColor: '#8B0000', // đỏ rượu vang đồng bộ sidebar
  color: "var(--text)",
  display: 'flex',
  justifyContent: 'center',   // căn giữa ngang
  alignItems: 'center',       // căn giữa dọc
  padding: '0 20px',
  boxSizing: 'border-box',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  position: 'relative',
  zIndex: 10,
};

const titleStyle = {
  margin: 0,
  fontSize: '22px',
  fontWeight: '600',
  letterSpacing: '0.5px',
};
