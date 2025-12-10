// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SearchScore from './pages/SearchScore';
import Report from './pages/Report';
import Settings from './pages/Settings';
import "./styles/theme.css";

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SearchScore />;
      case 'report':
        return <Report />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Style chung cho sidebar button
  const menuBtnStyle = (page) => ({
    padding: "12px",
    width: "100%",
    // borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
    border: "none",
    transition: "0.2s",

    // màu sắc khi active
    backgroundColor: currentPage === page ? "var(--active-btn-color)" : "transparent",
    color: currentPage === page ? "var(--active-text-color)" : "var(--non-active-text-color)",
    fontWeight: currentPage === page ? "bold" : "normal",
  });

  const menuBtnHover = {
    backgroundColor: "var(--hover-btn-color)",
    color: "var(--active-text-color)",
  };

  return (
    <div className="app-container" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <div
        className="main"
        style={{
          display: 'flex',
          height: 'calc(100vh - 60px)',
          backgroundColor: "#fafafa",
        }}
      >
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{
            width: "220px",
            backgroundColor: "#2b0000",
            // padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            boxShadow: "3px 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <button
            onClick={() => setCurrentPage('dashboard')}
            style={menuBtnStyle("dashboard")}
            onMouseOver={(e) => Object.assign(e.target.style, menuBtnHover)}
            onMouseOut={(e) => Object.assign(e.target.style, menuBtnStyle("dashboard"))}
          >
            Tổng quan
          </button>

          <button
            onClick={() => setCurrentPage('search')}
            style={menuBtnStyle("search")}
            onMouseOver={(e) => Object.assign(e.target.style, menuBtnHover)}
            onMouseOut={(e) => Object.assign(e.target.style, menuBtnStyle("search"))}
          >
            Tra điểm
          </button>

          <button
            onClick={() => setCurrentPage('report')}
            style={menuBtnStyle("report")}
            onMouseOver={(e) => Object.assign(e.target.style, menuBtnHover)}
            onMouseOut={(e) => Object.assign(e.target.style, menuBtnStyle("report"))}
          >
            Thống kê
          </button>

          <button
            onClick={() => setCurrentPage('settings')}
            style={menuBtnStyle("settings")}
            onMouseOver={(e) => Object.assign(e.target.style, menuBtnHover)}
            onMouseOut={(e) => Object.assign(e.target.style, menuBtnStyle("settings"))}
          >
            Cài đặt
          </button>
        </div>

        {/* Content Area */}
        <div
          className="content"
          style={{
            flex: 1,
            padding: "1.5rem",
            overflowY: "auto",
            backgroundColor: "var(--bg-color)",
            // borderRadius: "12px",
            // margin: "1rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
