import React, { useState } from "react";

export default function SearchScore() {
  const [sbd, setSbd] = useState("");
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!sbd.trim()) {
      setError("Vui lòng nhập số báo danh.");
      setScores([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:3000/scores/get_student/${sbd}`
      );

      if (!res.ok) throw new Error("Student not found");
      const data = await res.json();

      setScores(data);
      setError("");
    } catch (err) {
      setScores([]);
      setError("Không tìm thấy thí sinh hoặc chưa có điểm.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tra Cứu Điểm Thi THPT</h2>

        {/* INPUT + BUTTON */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nhập SBD..."
            value={sbd}
            onChange={(e) => setSbd(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />

          <button onClick={handleSearch} style={styles.button} disabled={loading}>
            {loading ? "Đang tra cứu..." : "Tra cứu"}
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {/* TABLE RESULT */}
        {scores.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Môn</th>
                  <th style={styles.th}>Điểm</th>
                </tr>
              </thead>

              <tbody>
                {scores.map((s) => (
                  <tr key={s.id}>
                    <td style={styles.td}>{s.subject.name}</td>
                    <td style={styles.td}>{s.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================= 🎨 THEME CSS OBJECT ========================= */
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
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
    color: "var(--text-color)",
  },

  /* INPUT + BUTTON */
  inputGroup: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "12px",
    border: "2px solid var(--border)",
    fontSize: "16px",
    background: "var(--card-bg)",
    color: "var(--text-color)",
    outline: "none",
    transition: "0.25s ease",
  },

  button: {
    padding: "12px 20px",
    borderRadius: "12px",
    background: "var(--primary)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "0.2s ease",
  },

  error: {
    color: "var(--error-color, #ef4444)",
    marginTop: "12px",
    fontSize: "15px",
    textAlign: "center",
  },

  /* TABLE */
  tableWrapper: {
    marginTop: "22px",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "320px",
  },

  th: {
    background: "var(--primary)",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontSize: "15px",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid var(--border)",
    color: "var(--text-color)",
  },
};
