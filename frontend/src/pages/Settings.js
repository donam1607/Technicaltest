import React, { useEffect, useState } from "react";

export default function Settings() {
  const [theme, setThemeState] = useState(
    localStorage.getItem("theme") || "theme-light"
  );

  const setTheme = (newTheme) => {
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Cài Đặt Giao Diện</h2>

        {/* THEME OPTIONS */}
        <p style={styles.label}>Chọn chế độ hiển thị:</p>

        <div style={styles.btnGroup}>
          <button
            style={{
              ...styles.button,
              ...(theme === "theme-light" ? styles.activeBtn : {})
            }}
            onClick={() => setTheme("theme-light")}
          >
            Light Mode
          </button>

          <button
            style={{
              ...styles.button,
              ...(theme === "theme-dark" ? styles.activeBtn : {})
            }}
            onClick={() => setTheme("theme-dark")}
          >
            Dark Mode
          </button>
        </div>

        <p style={styles.note}>
          Bạn có thể chỉnh màu chi tiết trong file <b>theme.css</b>.
        </p>
      </div>
    </div>
  );
}

/* ========================= 🎨 STYLES ========================= */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "var(--bg-color)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    transition: "0.3s",
  },

  card: {
    background: "var(--card-bg)",
    width: "100%",
    maxWidth: "520px",
    padding: "28px",
    borderRadius: "18px",
    boxShadow: "var(--shadow)",
    transition: "0.3s",
  },

  title: {
    marginBottom: "16px",
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
    color: "var(--text-color)",
  },

  label: {
    marginBottom: "10px",
    color: "var(--text-color)",
    fontSize: "17px",
    fontWeight: "500",
  },

  btnGroup: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "10px",
  },

  button: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "12px",
    background: "var(--button-bg)",
    color: "var(--text-color)",
    border: "2px solid var(--border)",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  activeBtn: {
    background: "var(--primary)",
    color: "#fff",
    borderColor: "var(--primary)",
  },

  note: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
    color: "var(--text-color)",
    opacity: 0.7,
  },
};
